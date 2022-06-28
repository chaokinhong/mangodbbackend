"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _post = require("../controllers/post.js");

var _auth = _interopRequireDefault(require("../middleware/auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // request and respond


router.get("/", _post.getPosts);
router.post("/", _auth["default"], _post.createPost); // patch is used to update on existing document, :id means dynamic
// all patch is for updating

router.patch("/:id", _auth["default"], _post.updatdePosts);
router["delete"]("/:id", _auth["default"], _post.deletePost);
router.patch("/:id/likePost", _auth["default"], _post.likePost);
var _default = router;
exports["default"] = _default;