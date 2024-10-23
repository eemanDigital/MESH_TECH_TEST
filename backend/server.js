const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./db");
const userRoute = require("./routers/userRouter");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config({ path: "./config.env" });

// Create express app
const app = express();

// Allow cross-origin requests
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;

    app.use("/users", userRoute);

    // Start the server on the specified port
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });
