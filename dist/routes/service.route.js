"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _service = require("../controllers/service.controller");

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('').post(_service2.default.validateBody(), _service2.default.createService).get(_service2.default.allServices);

exports.default = router;
//# sourceMappingURL=service.route.js.map