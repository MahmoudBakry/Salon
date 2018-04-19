"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _utils = require("../utils");

var _check = require("express-validator/check");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jwtSecret = _config2.default.jwtSecret;

var generateToken = function generateToken(id) {

    return _jsonwebtoken2.default.sign({
        sub: id,
        iss: 'App',
        iat: new Date().getTime()
    }, jwtSecret, { expiresIn: '10000s' });
};

exports.default = {
    //validation on request parameter during sinup route
    validateBody: function validateBody() {
        var isUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        return [(0, _check.body)("name").exists().withMessage("name is required"), (0, _check.body)("password").exists().withMessage("password is required"), (0, _check.body)("phone").exists().withMessage("phone is requires")];
    },

    //signup 
    signup: function signup(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var validationErrors, createdUser;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            validationErrors = (0, _check.validationResult)(req).array();

                            if (!(validationErrors.length > 0)) {
                                _context.next = 3;
                                break;
                            }

                            return _context.abrupt("return", next(new _ApiError2.default(422, validationErrors)));

                        case 3:
                            _context.prev = 3;

                            if (!req.file) {
                                _context.next = 8;
                                break;
                            }

                            _context.next = 7;
                            return (0, _utils.toImgUrl)(req.file);

                        case 7:
                            req.body.img = _context.sent;

                        case 8:
                            _context.next = 10;
                            return _user2.default.create(req.body);

                        case 10:
                            createdUser = _context.sent;

                            res.status(201).send({ user: createdUser, token: generateToken(createdUser.id) });
                            _context.next = 17;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context["catch"](3);

                            next(_context.t0);

                        case 17:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[3, 14]]);
        }))();
    },


    //signin
    signin: function signin(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var user;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            user = req.user; // Passport

                            res.send({ user: user, token: generateToken(user.id) });

                        case 2:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    }
};
//# sourceMappingURL=user.controller.js.map