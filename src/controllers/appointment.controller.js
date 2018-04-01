import Client from "../models/client.model";
import Appointment from '../models/appointment.model'
import ApiError from "../helpers/ApiError";
import { body, validationResult } from 'express-validator/check';
import mongoose, { Schema } from "mongoose";

export default {
    validateBody(isUpdate = false) {
        return [
            body("clint").exists().withMessage("name is required"),
            body("Date").exists().withMessage("name is required")
        ];
    },
    //create new client then new appointment
    async createAppointment(req, res, next) {
        try {
            let newDoc = await Appointment.create(req.body);
            return res.status(201).json(newDoc);
        } catch (err) {
            next(err)
        }
    },

    async allAppointment(req, res, next) {
        try {
            let allDocs = await Appointment.find().populate('client')
            return res.status(200).json(allDocs)
        } catch (err) {
            next(err)
        }
    }

}
