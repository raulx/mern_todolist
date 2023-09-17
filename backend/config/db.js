import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database connected succesfully !!!");
    })
    .catch((error) => {
      console.log("Error connecting to database because" + error.message);
    });
};

export default connectDB;
