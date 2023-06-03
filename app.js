const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

const routes = require("./routes/route");
routes(app);

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
