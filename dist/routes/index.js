"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _user = require("./user.route");

var _user2 = _interopRequireDefault(_user);

var _service = require("./service.route");

var _service2 = _interopRequireDefault(_service);

var _appointment = require("./appointment.route");

var _appointment2 = _interopRequireDefault(_appointment);

var _client = require("./client.route");

var _client2 = _interopRequireDefault(_client);

var _employee = require("./employee.routes");

var _employee2 = _interopRequireDefault(_employee);

var _bakat = require("./bakat.route");

var _bakat2 = _interopRequireDefault(_bakat);

var _payment = require("./payment.route");

var _payment2 = _interopRequireDefault(_payment);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requireAuth = _passport2.default.authenticate('jwt', { session: false });
var router = _express2.default.Router();

router.use("/", _user2.default);
router.use("/services", requireAuth, _service2.default);
router.use('/appointments', requireAuth, _appointment2.default);
router.use('/clients', requireAuth, _client2.default);
router.use('/employees', requireAuth, _employee2.default);
router.use('/bakats', _bakat2.default);
router.use('/payments', _payment2.default);

exports.default = router;
//# sourceMappingURL=index.js.map