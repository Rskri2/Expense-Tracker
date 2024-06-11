const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    lastname: {
      type: String,
      required: [true, "Please provide your last name"],
    },
    email: {
      required: [true, "Please provide your email "],
      type: String,
      unique: true,
      validate:[validator.isEmail, 'Please provide a valid email']

    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select:false
    },
    role: {
      type: String,
      enum:['user','admin'],
      default: 'user'
    }
  },
  {
    timestamps:true
  }
);

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){

  return await bcrypt.compare(candidatePassword, userPassword);
}
userSchema.pre('save',async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
})

const User = mongoose.model('User', userSchema);

module.exports = User;
