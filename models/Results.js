// Import mongoose ORM
const mongoose = require("mongoose");

const ResultsModel = new mongoose.Schema(
  {
    termname: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    classname: {
      type: String,
    },
    profileimage: {
      type: String,
    },
    examresults: [
      {
        examname: {
          type: String,
        },
        marks: [
          {
            subject: {
              type: String,
            },
            marks: {
              type: Number,
            },
            grade: {
              type: String,
            },
            remark: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("Results", ResultsModel);
