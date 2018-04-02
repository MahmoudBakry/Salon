import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import autoIncrement from 'mongoose-auto-increment';

const BakatSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    description : {
        type : String,
    }
});

BakatSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    }
});

autoIncrement.initialize(mongoose.connection);
BakatSchema.plugin(autoIncrement.plugin, {
    model: 'bakat',
    startAt: 1,
});

export default mongoose.model("bakat", BakatSchema);