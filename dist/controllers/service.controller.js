"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _services = require("../models/services.model");

var _services2 = _interopRequireDefault(_services);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _check = require("express-validator/check");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {

    //validation on request parameter during sinup route
    validateBody: function validateBody() {
        var isUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        return [(0, _check.body)("name").exists().withMessage("name is required"), (0, _check.body)("price").exists().withMessage("password is required")];
    },

    //create new service
    createService: function createService(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var validationErrors, newDoc;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            validationErrors = (0, _check.validationResult)(req).array();

                            if (!(validationErrors.length > 0)) {
                                _context.next = 4;
                                break;
                            }

                            return _context.abrupt("return", next(new _ApiError2.default(422, validationErrors)));

                        case 4:
                            _context.next = 6;
                            return _services2.default.create(req.body);

                        case 6:
                            newDoc = _context.sent;
                            return _context.abrupt("return", res.status(201).json(newDoc));

                        case 10:
                            _context.prev = 10;
                            _context.t0 = _context["catch"](0);

                            next(_context.t0);

                        case 13:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 10]]);
        }))();
    },

    //retrive all services 
    allServices: function allServices(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var allDocs;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return _services2.default.find();

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
    }
};
//# sourceMappingURL=service.controller.js.map