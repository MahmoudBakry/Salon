import Service from "../models/services.model";
import ApiError from "../helpers/ApiError";
import { body, validationResult } from 'express-validator/check';
import mongoose, { Schema } from "mongoose";



export default {

    //validation on request parameter during sinup route
    validateBody(isUpdate = false) {
        return [
            body("name").exists().withMessage("name is required"),
            body("price").exists().withMessage("password is required"),
        ];
    },
    //create new service
    async createService(req, res, next) {
        try {
            const validationErrors = validationResult(req).array();
            if (validationErrors.length > 0)
                return next(new ApiError(422, validationErrors));
            let newDoc = await Service.create(req.body);
            return res.status(201).json(newDoc)
        } catch (err) {
            next(err)
        }
    },
    //retrive all services 
    async allServices(req, res, next) {
        try {
            let allDocs = await Service.find();
            return res.status(200).json(allDocs)
        } catch (err) {
            next(err)
        }
    }
}
