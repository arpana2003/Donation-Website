import mongoose from "mongoose";

const connectDb = async () => {
    try {
      console.log("Started");
      
      const conn = await mongoose.connect('mongodb://localhost:27017/chai' ,{
        useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      console.log("Done");
      
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }

  export default connectDb;