const express = require("express");
const bodyParser = require("body-parser");
// const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json({limit: "1000mb"}));
app.use(bodyParser.urlencoded({limit: "1000mb", extended: true, parameterLimit:50000}));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

require("./app/routes/tables.routes.js")(app);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
