import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import autoIncrement from 'mongoose-auto-increment';

const EmployeeSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        required : true
    },
    nationaId: {
        type: String,
        required : true 
    },
    role : {
        type : String,
    },
    status : {
        type : String
    }, 
    salary : {
        type : Number
    }, 
    img : {
        type : String, 
        default : "https://www.a-writer.com/images/split/man.png"
    },
    salary : {
        type : Number
    }
});

EmployeeSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
    }
});

autoIncrement.initialize(mongoose.connection);
EmployeeSchema.plugin(autoIncrement.plugin, {
    model: 'employee',
    startAt: 1,
});

export default mongoose.model("employee", EmployeeSchema);