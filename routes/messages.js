const Messages = require("../models/Messages");

const router = require("express").Router();

// CREATE MESSAGE ***********************
router.post("/", async (req, res) => {
  try {
    const newMessage = new Messages(req.body);
    const savedMessage = await newMessage.save();
    return res.status(201).json(savedMessage);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET CONVERSATION WITH A USER***********************
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Messages.find({
      conversationId: req.params.conversationId,
    });
    return res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
