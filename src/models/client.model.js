import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import autoIncrement from 'mongoose-auto-increment';

const ClientSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
    },
    counterOfService: {
        type: Number,
        default : 0 
    }
});

ClientSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    }
});

autoIncrement.initialize(mongoose.connection);
ClientSchema.plugin(autoIncrement.plugin, {
    model: 'client',
    startAt: 1,
});

export default mongoose.model("client", ClientSchema);