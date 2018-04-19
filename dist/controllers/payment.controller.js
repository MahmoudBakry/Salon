'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _client = require('../models/client.model');

var _client2 = _interopRequireDefault(_client);

var _ApiError = require('../helpers/ApiError');

var _ApiError2 = _interopRequireDefault(_ApiError);

var _check = require('express-validator/check');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _payment = require('../models/payment.model');

var _payment2 = _interopRequireDefault(_payment);

var _services = require('../models/services.model');

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    //validation on request parameter during sinup route
    validateBody: function validateBody() {
        var isUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        return [(0, _check.body)("appointment").exists().withMessage("appointment is required"), (0, _check.body)("client").exists().withMessage("client is required"), (0, _check.body)("employee").exists().withMessage("employee is required"), (0, _check.body)("services").exists().withMessage("services is required"), (0, _check.body)("finalTotalPrice").exists().withMessage("finalTotalPrice is required")];
    },

    //create new payment
    createPayment: function createPayment(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var validationErrors, servicesIds, prices, x, service, summution, total, newPayment, client, responceObject;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            validationErrors = (0, _check.validationResult)(req).array();

                            if (!(validationErrors.length > 0)) {
                                _context.next = 3;
                                break;
                            }

                            return _context.abrupt('return', next(new _ApiError2.default(422, validationErrors)));

                        case 3:
                            servicesIds = req.body.services;
                            prices = [];
                            x = 0;

                        case 6:
                            if (!(x < servicesIds.length)) {
                                _context.next = 14;
                                break;
                            }

                            _context.next = 9;
                            return _services2.default.findById(servicesIds[x]);

                        case 9:
                            service = _context.sent;

                            prices.push(service.price);

                        case 11:
                            x++;
                            _context.next = 6;
                            break;

                        case 14:
                            console.log(prices);

                            summution = function summution(accumulator, currentValue) {
                                return accumulator + currentValue;
                            };

                            total = prices.reduce(summution);

                            if (!(req.body.actualTotalPrice != total)) {
                                _context.next = 19;
                                break;
                            }

                            return _context.abrupt('return', next(new _ApiError2.default(422, "incorrect total price")));

                        case 19:
                            _context.next = 21;
                            return _payment2.default.create(req.body);

                        case 21:
                            newPayment = _context.sent;
                            _context.next = 24;
                            return _client2.default.findById(req.body.client);

                        case 24:
                            client = _context.sent;

                            client.counterOfService++;
                            _context.next = 28;
                            return client.save();

                        case 28:
                            _context.next = 30;
                            return _payment2.default.findById(newPayment.id).populate('appointment').populate('client').populate('employee').populate('services');

                        case 30:
                            responceObject = _context.sent;
                            return _context.abrupt('return', res.status(200).json(responceObject));

                        case 32:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },

    //retrive all services 
    allPayment: function allPayment(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var allDocs;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return _payment2.default.find().populate('appointment').populate('client').populate('employee').populate('services');

                        case 3:
                            allDocs = _context2.sent;
                            return _context2.abrupt('return', res.status(200).json(allDocs));

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2['catch'](0);

                            next(_context2.t0);

                        case 10:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[0, 7]]);
        }))();
    }
};
//# sourceMappingURL=payment.controller.js.map