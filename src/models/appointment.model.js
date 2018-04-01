import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import autoIncrement from 'mongoose-auto-increment';

const AppointmentSchema = new Schema({
    client: {
        type: Number,
        required: true,
        ref : "client"
    },
    Date: {
        type: Date,
    },
    status : {
        type : String,
        enum : ["pendding", "complete"],
        default : "pendding"

    }
});

AppointmentSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    }
});

autoIncrement.initialize(mongoose.connection);
AppointmentSchema.plugin(autoIncrement.plugin, {
    model: 'appointment',
    startAt: 1,
});

export default mongoose.model("appointment", AppointmentSchema);