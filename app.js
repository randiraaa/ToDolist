const express = require("express");
const app = express();
const allRoutes = require("./routes");
const dotenv = require("dotenv");

// get config vars
dotenv.config();

const PORT = 3500;

app.use(express.json());
app.use(allRoutes);

app.listen(PORT, () => {
  console.log("Server running on port 3000...");
});
