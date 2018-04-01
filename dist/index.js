"use strict";

require("babel-polyfill");

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 8888;
_app2.default.listen(port, function () {
    console.log("Server is running now on port " + port + '.......');
});
//# sourceMappingURL=index.js.map