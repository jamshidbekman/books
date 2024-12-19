import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("mongodb connected");
    return mongoose.connect("mongodb://127.0.0.1:27017", {
      dbName: "library",
    });
  } catch (error) {
    console.error(error.message);
  }
};
export default connectDB;
