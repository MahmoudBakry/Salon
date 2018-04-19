"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _client = require("../models/client.model");

var _client2 = _interopRequireDefault(_client);

var _appointment = require("../models/appointment.model");

var _appointment2 = _interopRequireDefault(_appointment);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _check = require("express-validator/check");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    validateBody: function validateBody() {
        var isUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        return [(0, _check.body)("name").exists().withMessage("name is required")];
    },

    //create new client then new appointment
    createClient: function createClient(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var newClient;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return _client2.default.create(req.body);

                        case 3:
                            newClient = _context.sent;
                            return _context.abrupt("return", res.status(201).json(newClient));

                        case 7:
                            _context.prev = 7;
                            _context.t0 = _context["catch"](0);

                            next(_context.t0);

                        case 10:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 7]]);
        }))();
    },
    allClient: function allClient(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var allDocs;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return _client2.default.find();

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
    clientDetails: function clientDetails(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var clientId, docDetails;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            clientId = req.params.clientId;
                            _context3.next = 4;
                            return _client2.default.findById(clientId);

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
    }
};
//# sourceMappingURL=client.controller.js.map