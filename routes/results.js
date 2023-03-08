const router = require("express").Router();
const Results = require("../models/Results");
const User = require("../models/User");
const Students = require("../models/User");

// CREATE A NEW RESULT **************************************************************************
router.post("/", async (req, res) => {
  try {
    const {
      termname,
      firstname,
      lastname,
      classname,
      examname,
      subject,
      marks,
      grade,
    } = req.body;

    // Check if the student already exists
    const student = await Results.findOne({
      classname,
      termname,
      firstname,
      lastname,
    });

    if (student) {
      // Check if the available student has the examname in his exam results
      const studentHasThisExam = await Results.findOne({
        classname,
        termname,
        firstname,
        lastname,
        "examresults.examname": examname,
      });
      if (studentHasThisExam) {
        console.log("Exam available");
        // If this exam exists, check if the subject also exists in this exam
        const exam = studentHasThisExam.examresults.find(
          (result) => result.examname === examname
        );
        if (exam.marks.some((mark) => mark.subject === subject)) {
          console.log("Exam and subject already exist for this student");
          return res.status(400).json({
            message: "Exam and subject already exist for this student",
          });
        } else {
          // Add new subject to this examname that has been found
          const updatedStudent = await Results.updateOne(
            {
              classname,
              termname,
              firstname,
              lastname,
              "examresults.examname": examname,
            },
            {
              $push: {
                "examresults.$.marks": {
                  subject,
                  marks,
                  grade,
                },
              },
            }
          );
        }
        console.log("New subject marks added to the existing exam results.");
        return res
          .status(200)
          .json("Subject not available. New subject added.");
      } else {
        // Push a new object to the examresults array
        try {
          const updatedStudent = await Results.updateOne(
            {
              classname,
              termname,
              firstname,
              lastname,
            },
            {
              $push: {
                examresults: {
                  examname,
                  marks: [
                    {
                      subject,
                      marks,
                      grade,
                    },
                  ],
                },
              },
            }
          );
          console.log("Exam not available. New exam results added.");
          return res
            .status(200)
            .json("Exam not available. New exam results added.");
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      }
    } else {
      // Get profile image from student's model
      const student = await User.findOne({
        firstname,
        lastname,
      });
      if (student) {
        console.log(student);
      } else {
        console.log("No there");
      }
      const newResult = new Results({
        termname,
        firstname,
        lastname,
        classname,
        profileimage: student?.profileimage,
        examresults: [
          {
            examname,
            marks: [
              {
                subject,
                marks,
                grade,
              },
            ],
          },
        ],
      });
      const savedResults = await newResult.save();
      return res.status(200).json(savedResults);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET ALL RESULTS *****************************************************************************
router.get("/", async (req, res) => {
  try {
    const results = await Results.find();
    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET ALL RESULTS OF A PARTICLUAR CLASS AND TERM **********************************************
router.get("/:termname/:classname", async (req, res) => {
  try {
    const results = await Results.find({
      classname: req.params.classname,
      termname: req.params.termname,
    });
    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
