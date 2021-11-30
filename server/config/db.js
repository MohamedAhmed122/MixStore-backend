import mongoose from "mongoose";


const MONGO_URI = 'mongodb+srv://Kareem:Pass123@cluster0.nnw0b.mongodb.net/MixStore?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(
      `mongodb connected on ${connection.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(
      `Error is comming from mongo connection ${error.message}`.red.bold
    );
    process.exit(1);
  }
};
export default connectDB;
