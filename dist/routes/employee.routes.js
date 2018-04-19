"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _employee = require("../controllers/employee.controller");

var _employee2 = _interopRequireDefault(_employee);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require("../services/passport");

var _passport4 = _interopRequireDefault(_passport3);

var _multer = require("../services/multer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requireAuth = _passport2.default.authenticate('jwt', { session: false });

var requireSignIn = _passport2.default.authenticate('local', { session: false });
var router = _express2.default.Router();

router.route('').post((0, _multer.multerSaveTo)('emp').single('img'), _employee2.default.validateBody(), _employee2.default.createEmp).get(_employee2.default.allEmployees);
router.route('/:empId').get(_employee2.default.employeeDetails);

router.route('/:empId/porfit').get(_employee2.default.allPaymentUnderOneEmplyee);
exports.default = router;
//# sourceMappingURL=employee.routes.js.map