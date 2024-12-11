const dotenv = require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

// Connect to Mongoose
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => console.log("Connected to Database"))
  .catch((err) => console.log(err));

// Activate the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is runinig on port ${PORT} ...`));
