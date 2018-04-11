import Client from "../models/client.model";
import Appointment from '../models/appointment.model'
import ApiError from "../helpers/ApiError";
import { body, validationResult } from 'express-validator/check';
import mongoose, { Schema } from "mongoose";

export default {
    validateBody(isUpdate = false) {
        return [
            body("name").exists().withMessage("name is required")
        ];
    },
    //create new client then new appointment
    async createClient(req, res, next) {
        try {
            let newClient = await Client.create(req.body);
            return res.status(201).json(newClient);
        } catch (err) {
            next(err)
        }
    },
    async allClient(req, res, next) {
        try {
            let allDocs = await Client.find()
            return res.status(200).json(allDocs)
        } catch (err) {
            next(err)
        }
    },
    async clientDetails(req, res, next) {
        try {
            const clientId = req.params.clientId;
            let docDetails = await Client.findById(clientId);
            return res.status(200).json(docDetails)
        } catch (err) {
            next(err)
        }
    },

}
