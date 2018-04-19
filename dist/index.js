'use strict';

require('babel-polyfill');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app.server.listen(3333, function () {
    console.log("Server is running now on port.. 3333 ");
});

_app.serverHtps.listen(443, function () {
    console.log("server running on port 443......");
});
//# sourceMappingURL=index.js.map