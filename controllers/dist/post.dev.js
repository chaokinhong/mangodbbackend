"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.likePost = exports.deletePost = exports.updatdePosts = exports.createPost = exports.getPosts = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _postMessage = _interopRequireDefault(require("../models/postMessage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getPosts = function getPosts(req, res) {
  var postMessage;
  return regeneratorRuntime.async(function getPosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_postMessage["default"].find());

        case 3:
          postMessage = _context.sent;
          console.log(postMessage);
          res.status(200).json(postMessage);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(404).json({
            message: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getPosts = getPosts;

var createPost = function createPost(req, res) {
  var post, newPost;
  return regeneratorRuntime.async(function createPost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          post = req.body;
          newPost = new _postMessage["default"](_objectSpread({}, post, {
            creator: req.userId,
            createdAt: new Date().toISOString()
          }));
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(newPost.save());

        case 5:
          res.status(201).json(newPost); //201 = success creation

          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](2);
          res.status(409).json({
            message: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 8]]);
};

exports.createPost = createPost;

var updatdePosts = function updatdePosts(req, res) {
  var _id, post, updatedPost;

  return regeneratorRuntime.async(function updatdePosts$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // use destruct need to rename
          _id = req.params.id;
          post = req.body;

          if (_mongoose["default"].Types.ObjectId.isValid(_id)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(404).send("No post with that id"));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(_postMessage["default"].findByIdAndUpdate(_id, _objectSpread({}, post, {
            _id: _id
          }), {
            "new": true
          }));

        case 6:
          updatedPost = _context3.sent;
          res.json(updatedPost);

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.updatdePosts = updatdePosts;

var deletePost = function deletePost(req, res) {
  var id;
  return regeneratorRuntime.async(function deletePost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;

          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(404).send("No post with that id"));

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(_postMessage["default"].findByIdAndRemove(id));

        case 5:
          res.json({
            message: "Post deleted successfully"
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deletePost = deletePost;

var likePost = function likePost(req, res) {
  var id, post, index, updatedPost;
  return regeneratorRuntime.async(function likePost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;

          if (req.userId) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.json({
            message: "Unauthenticated"
          }));

        case 3:
          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(404).send("No post with that id"));

        case 5:
          _context5.next = 7;
          return regeneratorRuntime.awrap(_postMessage["default"].findById(id));

        case 7:
          post = _context5.sent;
          // when the update request we need to specific the third parameter {new : true}
          index = post.likes.findIndex(function (id) {
            return id === String(req.userId);
          });

          if (index === -1) {
            // like the post
            post.likes.push(req.userId);
          } else {
            //dislike a post
            post.likes = post.likes.filter(function (id) {
              return id !== String(req.userId);
            });
          }

          _context5.next = 12;
          return regeneratorRuntime.awrap(_postMessage["default"].findByIdAndUpdate(id, post, {
            "new": true
          }));

        case 12:
          updatedPost = _context5.sent;
          res.json(updatedPost);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.likePost = likePost;