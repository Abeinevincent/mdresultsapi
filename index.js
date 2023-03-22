// Initialise the app as an express app
const express = require("express");
const app = express();

// Import all dependencies and dev-dependencies
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const path = require("path");

// Import all routes
const AuthRoute = require("./routes/auth");
const ResultsRoute = require("./routes/results");
const ConversationsRoute = require("./routes/conversations");
const MessagesRoute = require("./routes/messages");
const StaffRoute = require("./routes/staff");

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected to the backend successfully");
  })
  .catch((err) => console.log(err));

// Middlewares
app.use(cors());

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", AuthRoute);
app.use("/api/results", ResultsRoute);
app.use("/api/conversations", ConversationsRoute);
app.use("/api/messages", MessagesRoute);
app.use("/api/staff", StaffRoute);

// Start the backend server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Backend server is listening at port ${PORT}`);
});
