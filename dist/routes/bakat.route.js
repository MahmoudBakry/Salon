"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bakat = require("../controllers/bakat.controller");

var _bakat2 = _interopRequireDefault(_bakat);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require("../services/passport");

var _passport4 = _interopRequireDefault(_passport3);

var _multer = require("../services/multer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requireAuth = _passport2.default.authenticate('jwt', { session: false });

var requireSignIn = _passport2.default.authenticate('local', { session: false });
var router = _express2.default.Router();

router.route('').post(_bakat2.default.validateBody(), _bakat2.default.createBaka).get(_bakat2.default.allBakat);
exports.default = router;
//# sourceMappingURL=bakat.route.js.map