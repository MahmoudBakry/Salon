"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _appointment = require("../controllers/appointment.controller");

var _appointment2 = _interopRequireDefault(_appointment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('').post(_appointment2.default.validateBody(), _appointment2.default.createAppointment).get(_appointment2.default.allAppointment);

exports.default = router;
//# sourceMappingURL=appointment.route.js.map