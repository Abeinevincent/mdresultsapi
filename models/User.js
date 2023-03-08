// Import mongoose ORM
const mongoose = require("mongoose");

// Create user model
const UserModel = new mongoose.Schema(
  {
    username: {
      type: String,
    },

    email: {
      type: String,
    },

    firstname: {
      type: String,
    },

    lastname: {
      type: String,
    },

    contact: {
      type: String,
    },

    address: {
      type: String,
    },

    gender: {
      type: String,
    },

    clas: {
      type: String,
    },

    stream: {
      type: String,
    },

    dateofbirth: {
      type: String,
    },

    parentname: {
      type: String,
    },

    parentcontact: {
      type: String,
    },

    hostel: {
      type: String,
    },

    transport: {
      type: String,
    },

    profileimage: {
      type: String,
    },

    role: {
      type: String,
    },

    password: {
      type: String,
    },

    isStudent: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("User", UserModel);
