"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// schema = specific each post request is going to have this things
var postSchema = _mongoose["default"].Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  // an array of string,
  selectedFile: String,
  likes: {
    type: [String],
    "default": []
  },
  createdAt: {
    type: Date,
    "default": new Date()
  }
});

var PostMessage = _mongoose["default"].model("PostMessage", postSchema);

var _default = PostMessage;
exports["default"] = _default;