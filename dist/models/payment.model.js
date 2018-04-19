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

var PaymentSchema = new _mongoose.Schema({
    appointment: {
        type: Number,
        ref: "appointment",
        required: true
    },
    client: {
        type: Number,
        ref: 'client'
    },
    employee: {
        type: Number,
        ref: 'employee'
    },
    services: [{
        type: Number,
        ref: 'service'
    }],
    discount: {
        type: Number
    },
    actualTotalPrice: {
        type: Number
    },
    finalTotalPrice: {
        type: Number
    },
    creationDate: {
        type: Date,
        default: new Date()
    }
});

PaymentSchema.set('toJSON', {
    transform: function transform(doc, ret, options) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    }
});

_mongooseAutoIncrement2.default.initialize(_mongoose2.default.connection);
PaymentSchema.plugin(_mongooseAutoIncrement2.default.plugin, {
    model: 'payment',
    startAt: 1
});

exports.default = _mongoose2.default.model("payment", PaymentSchema);
//# sourceMappingURL=payment.model.js.map