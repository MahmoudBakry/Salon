"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _mongooseAutoIncrement = require("mongoose-auto-increment");

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EmployeeSchema = new _mongoose.Schema(_defineProperty({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    nationaId: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    status: {
        type: String
    },
    salary: {
        type: Number
    },
    img: {
        type: String,
        default: "https://www.a-writer.com/images/split/man.png"
    }
}, "salary", {
    type: Number
}));

EmployeeSchema.set('toJSON', {
    transform: function transform(doc, ret, options) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    }
});

_mongooseAutoIncrement2.default.initialize(_mongoose2.default.connection);
EmployeeSchema.plugin(_mongooseAutoIncrement2.default.plugin, {
    model: 'employee',
    startAt: 1
});

exports.default = _mongoose2.default.model("employee", EmployeeSchema);
//# sourceMappingURL=employee.model.js.map