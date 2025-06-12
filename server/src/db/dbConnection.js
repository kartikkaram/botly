import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection_instance = await mongoose.connect(
      `${process.env.MONGODB_URL}`,
    );
    console.log(
      `MongoDB connected !  DB host : ${connection_instance} and ${connection_instance.connection.host}`,
    );
  } catch (error) {
    console.log("mongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB