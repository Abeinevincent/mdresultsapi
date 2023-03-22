const Conversations = require("../models/Conversations");

const router = require("express").Router();

// CREATE CONVERSTION ***********************
router.post("/", async (req, res) => {
  try {
    const newConversation = new Conversations({
      members: [req.body.senderId, req.body.receiverId],
    });
    const savedConversation = await newConversation.save();
    return res.status(201).json(savedConversation);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET CONVERSATION WITH A USER***********************
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversations.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json(conversation);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET A CONVERSTION THAT INCLUDES 2 USER IDS *********************
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversations.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    return res.status(200).json(conversation);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
