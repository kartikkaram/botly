import {AsyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/apiResponse.js'
import { verifyWebhook } from '@clerk/express/webhooks'
import { User } from '../models/user.models.js'

export const clerkWebhook= AsyncHandler(async (req,res) => {
  
      try {
    const evt = await verifyWebhook(req)

    const eventType = evt.type
   if(eventType==='user.created'){
    const existingUser=await User.findOne({clerkid:evt.data.id})
    if(existingUser){
        throw new ApiError(401,"user already exists")
    }
    const createdUser=await User.create({
    username:evt.data.username,
    email:evt.data.email_addresses[0].email_address,
    clerkid:evt.data.id,
    imageurl:evt.data.image_url
    })
    if(!createdUser){
         throw new ApiError(401,"error while creating user")
    }
   }
   if(eventType==='user.updated'){
    const existingUser=await User.findOne({clerkid:evt.data.id})
    if(!existingUser){
        throw new ApiError(401,"user doesnt exist")
    }
 let isUpdated = false;
if (existingUser.username !== evt.data.username) {
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
   if(eventType==='user.deleted'){
    const user=await User.findOne({clerkid:evt.data.id})
    if(!user){
             throw new ApiError(401,"user doesnt exist")
    }
    await User.deleteOne({clerkid:evt.data.id})
   }

    return res
    .status(201)
    .json(new ApiResponse(201,`Webhook received ${eventType}`,{}))
  } catch (err) {
    console.error('Error verifying webhook:', err)
    throw new ApiError(400, err.message || "error while handling webhook")
  }

})