import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import autoIncrement from 'mongoose-auto-increment';

const ServiceSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    nameEn: {
        type: String,
        trim: true,
    }, 
    description : {
        type : String, 
    }

});

ServiceSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    }
});

autoIncrement.initialize(mongoose.connection);
ServiceSchema.plugin(autoIncrement.plugin, {
    model: 'service',
    startAt: 1,
});

export default mongoose.model("service", ServiceSchema);