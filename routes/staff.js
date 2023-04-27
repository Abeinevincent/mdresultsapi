const router = require("express").Router();
const Staff = require("../models/Staff");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// REGISTER STAFF **********************************************************************

router.post("/registerstaff", async (req, res) => {
  const { firstname, lastname } = req.body;
  // Capture staff details
  const newStaff = {
    username: req.body.username,
    email: req.body.email,
    firstname,
    lastname,
    profileimage: req.body.profileimage,
  };
  
  const user = await Staff.findOne({ email: req.body.email });
  if (user) {
    return res.status(500).json({
      error: `Staff with email: (${req.body.email}) already exists, try again`,
    });
  } else {
    try {
      //  Save user in the database and send response*************************
      const newStaffr = new Staff(newStaff);
      const user = await newStaffr.save();

      return res
        .status(201)
        .json({ message: "Staff has been created successfully", user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
});

// LOGIN STAFF MEMBER ***************************************************************************
router.post("/loginstaff", async (req, res) => {
  try {
    const staff = await Staff.findOne({ username: req.body.username });
    if (!staff) {
      console.log("User nt found");
      return res.status(400).json("User not found");
    } else {
      console.log("User has been found");
      return res.status(200).json({
        message: "User login successful",
        staff,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET STAFF MEMBER BY ID *********************************************
router.get("/:id", async (req, res) => {
  try {
    const user = await Staff.findOne({
      _id: req.params.id,
    });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
