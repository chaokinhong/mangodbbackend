"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _post = _interopRequireDefault(require("./routes/post.js"));

var _user = _interopRequireDefault(require("./routes/user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config();

app.use(_bodyParser["default"].json({
  limit: "30mb",
  extended: true
}));
app.use(_bodyParser["default"].urlencoded({
  limit: "30mb",
  extended: true
}));
app.use((0, _cors["default"])()); // every route inside the post routes is going to start with posts

app.use("/posts", _post["default"]);
app.use('/user', _user["default"]);
app.get("/", function (req, res) {
  res.send("Hello to MangoDB Backend");
}); //mongodb

var CONNECTION_URL = process.env.CONNECTION_URL;
var PORT = process.env.PORT || 5000; //connect to databse

_mongoose["default"].connect(CONNECTION_URL).then(function () {
  return app.listen(5000, function () {
    return console.log("Server running on port: ".concat(PORT));
  });
})["catch"](function (error) {
  return console.log(error.message);
});