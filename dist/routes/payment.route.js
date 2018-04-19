"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _payment = require("../controllers/payment.controller");

var _payment2 = _interopRequireDefault(_payment);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require("../services/passport");

var _passport4 = _interopRequireDefault(_passport3);

var _multer = require("../services/multer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requireAuth = _passport2.default.authenticate('jwt', { session: false });

var requireSignIn = _passport2.default.authenticate('local', { session: false });
var router = _express2.default.Router();

router.route('').post(_payment2.default.validateBody(), _payment2.default.createPayment).get(_payment2.default.allPayment);
exports.default = router;
//# sourceMappingURL=payment.route.js.map