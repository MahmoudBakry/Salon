import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import autoIncrement from 'mongoose-auto-increment';

const PaymentSchema = new Schema({
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
        type: Number,
    },
});

PaymentSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    }
});

autoIncrement.initialize(mongoose.connection);
PaymentSchema.plugin(autoIncrement.plugin, {
    model: 'payment',
    startAt: 1,
});

export default mongoose.model("payment", PaymentSchema);