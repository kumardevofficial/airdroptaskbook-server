import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Database connected: ${connection.connection.host}`);
  } catch (err) {
    console.error(`There is some error: ${err.message}`);
    process.exit(1); // Exit the process with a failure code
  }
};

export default dbConnection;
