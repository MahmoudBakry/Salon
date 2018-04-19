"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _client = require("../models/client.model");

var _client2 = _interopRequireDefault(_client);

var _employee = require("../models/employee.model");

var _employee2 = _interopRequireDefault(_employee);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _check = require("express-validator/check");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _index = require("../utils/index");

var _payment = require("../models/payment.model");

var _payment2 = _interopRequireDefault(_payment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    validateBody: function validateBody() {
        var isUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        return [(0, _check.body)("clint").exists().withMessage("name is required"), (0, _check.body)("phone").exists().withMessage("phone is required"), (0, _check.body)("nationaId").exists().withMessage("nationaId is required")];
    },

    //create new client then new appointment
    createEmp: function createEmp(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var newDoc;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;

                            if (!req.file) {
                                _context.next = 5;
                                break;
                            }

                            _context.next = 4;
                            return (0, _index.toImgUrl)(req.file);

                        case 4:
                            req.body.img = _context.sent;

                        case 5:
                            _context.next = 7;
                            return _employee2.default.create(req.body);

                        case 7:
                            newDoc = _context.sent;
                            return _context.abrupt("return", res.status(201).json(newDoc));

                        case 11:
                            _context.prev = 11;
                            _context.t0 = _context["catch"](0);

                            next(_context.t0);

                        case 14:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 11]]);
        }))();
    },

    //retrive all employees 
    allEmployees: function allEmployees(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var allDocs;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return _employee2.default.find();

                        case 3:
                            allDocs = _context2.sent;
                            return _context2.abrupt("return", res.status(200).json(allDocs));

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2["catch"](0);

                            next(_context2.t0);

                        case 10:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[0, 7]]);
        }))();
    },
    employeeDetails: function employeeDetails(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var empId, docDetails;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            empId = req.params.empId;
                            _context3.next = 4;
                            return _employee2.default.findById(empId);

                        case 4:
                            docDetails = _context3.sent;
                            return _context3.abrupt("return", res.status(200).json(docDetails));

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3["catch"](0);

                            next(_context3.t0);

                        case 11:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[0, 8]]);
        }))();
    },
    allPaymentUnderOneEmplyee: function allPaymentUnderOneEmplyee(req, res, next) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var empId, query, _req$query, startDate, endDate, payments, sum;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;
                            empId = req.params.empId;
                            query = {};

                            query.employee = empId;
                            _req$query = req.query, startDate = _req$query.startDate, endDate = _req$query.endDate;

                            if (startDate) {
                                startDate = parseInt(startDate);
                                query.creationDate = { $gte: +startDate };
                            }
                            if (endDate) {
                                endDate = parseInt(endDate);
                                query.creationDate = _extends({}, query.creationDate, { $lte: +endDate });
                            }
                            _context4.next = 9;
                            return _payment2.default.find(query);

                        case 9:
                            payments = _context4.sent;

                            //calculate summution of porfit for this emp
                            sum = payments.reduce(function (all, item, index) {
                                return all += item.finalTotalPrice;
                                console.log(all + "in" + item);
                            }, 0);
                            //responce 

                            return _context4.abrupt("return", res.status(200).json({
                                "payments": payments,
                                "sumOfMony": sum
                            }));

                        case 14:
                            _context4.prev = 14;
                            _context4.t0 = _context4["catch"](0);

                            next(_context4.t0);

                        case 17:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[0, 14]]);
        }))();
    }
};
//# sourceMappingURL=employee.controller.js.map