import { AsyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { verifyWebhook } from '@clerk/express/webhooks';
import { User } from '../models/user.models.js';
import { clerkClient } from '@clerk/express';

export const clerkWebhook = AsyncHandler(async (req, res) => {
  try {

    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    debugger
    console.log("webhook: ", evt.type);


    if (eventType === 'user.created') {
      const existingUser = await User.findOne({ username: evt.data.username });

      if (existingUser) {
        try {
          await clerkClient.users.deleteUser(evt.data.id);
        } catch (error) {
          console.log('Failed to delete Clerk user (may not exist):', error.message);
        }

        return res
          .status(200)
          .json(new ApiResponse(200, 'Duplicate user — Clerk user deletion attempted', {}));
      }

      try {
        const createdUser = await User.create({
          username: evt.data.username,
          email: evt.data.email_addresses[0].email_address,
          clerkid: evt.data.id,
          imageurl: evt.data.image_url
        });

        if (!createdUser) {
          await clerkClient.users.deleteUser(evt.data.id);
          return res.status(200).json(new ApiResponse(200, 'User creation failed, Clerk user deleted', {}));
        }
      } catch (err) {
        await clerkClient.users.deleteUser(evt.data.id);
        console.error('DB error while creating user:', err.message);
        return res.status(200).json(new ApiResponse(200, 'DB error, Clerk user deleted', {}));
      }
    }

    if (eventType === 'user.updated') {
      const existingUser = await User.findOne({ clerkid: evt.data.id });

      if (!existingUser) {
        console.warn('User not found in DB on update:', evt.data.id);
        return res.status(200).json(new ApiResponse(200, 'User not found during update', {}));
      }

      let isUpdated = false;

      if (existingUser.username !== evt.data.username) {
        const duplicate = await User.findOne({ username: evt.data.username });
        if (duplicate && duplicate.clerkid !== evt.data.id) {
          // Optional: revert the change in Clerk
          await clerkClient.users.updateUser(evt.data.id, { username: existingUser.username });
          return res.status(200).json(new ApiResponse(200, 'Username already taken — reverted Clerk change', {}));
        }

        existingUser.username = evt.data.username;
        isUpdated = true;
      }

      if (existingUser.imageurl !== evt.data.image_url) {
        existingUser.imageurl = evt.data.image_url;
        isUpdated = true;
      }

      if (existingUser.email !== evt.data.email_addresses[0].email_address) {
        existingUser.email = evt.data.email_addresses[0].email_address;
        isUpdated = true;
      }

      if (isUpdated) await existingUser.save();
    }

    if (eventType === 'user.deleted') {
      const user = await User.findOne({ clerkid: evt.data.id });

      if (!user) {
        console.warn('User already deleted in DB:', evt.data.id);
        return res.status(200).json(new ApiResponse(200, 'User already deleted', {}));
      }

      await User.deleteOne({ clerkid: evt.data.id });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, `Webhook handled: ${eventType}`, {}));
  } catch (err) {
    console.error('Error handling webhook:', err);
    return res
      .status(400)
      .json(new ApiResponse(400, err.message || 'Error while handling webhook'));
  }
});
