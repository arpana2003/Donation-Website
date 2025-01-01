import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    trim: true // Remove any leading or trailing spaces
  },
  name: {
    type: String,
    trim: true // Remove any leading or trailing spaces
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username is unique
    trim: true // Remove any leading or trailing spaces
  },
  profilepic: {
    type: String,
    trim: true // Remove any leading or trailing spaces
  },
  coverpic: {
    type: String,
    trim: true // Remove any leading or trailing spaces
  },
  razorpayid:{type:String},
    razorpaysecret:{type:String},
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically handles createdAt and updatedAt
});

export default mongoose.models.User || model('User', UserSchema);
