const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER USER ********************

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Capture user details
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    address: req.body.address,
    clas: req.body.clas,
    stream: req.body.stream,
    parentname: req.body.parentname,
    parentcontact: req.body.parentcontact,
    maritalstatus: req.body.maritalstatus,
    role: req.body.role,
    profileimage: req.body.profileimage,
    contact: req.body.contact,
    dateofbirth: req.body.dateofbirth,
    password: hashedPassword,
  };

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(500).json({
      error: `User with email: (${req.body.email}) already exists, try again`,
    });
  } else {
    try {
      //  Save user in the database and send response
      const newUserr = await new User(newUser);
      const user = await newUserr.save();

      return res
        .status(201)
        .json({ message: "User has been created successfully", user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
});

module.exports = router;
