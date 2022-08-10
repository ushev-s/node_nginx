const mongoose = require('mongoose');

const connectDB = async () => {
  const dbURI =
    process.env.NODE_ENV === 'production'
      ? process.env.DO_MONGO_URI_LOCAL
      : process.env.DO_MONGO_URI;
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
