"use strict";

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("./app"));

require("./db");

require("./models/Video");

require("./models/Comment");

require("./models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// hide important info
_dotenv["default"].config();

var PORT = process.env.PORT || 4000; // find PORT or use default as set

var handleListening = function handleListening() {
  return console.log("listening on: http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, handleListening);