// Import mongoose ORM
const mongoose = require("mongoose");

// Create user model
const StaffModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    profileimage: {
      type: String,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("Staff", StaffModel);
