import Service from "../models/services.model";
import ApiError from "../helpers/ApiError";
import { body, validationResult } from 'express-validator/check';
import mongoose, { Schema } from "mongoose";
import Payment from '../models/payment.model';

export default {
    //validation on request parameter during sinup route
    validateBody(isUpdate = false) {
        return [
            body("appointment").exists().withMessage("appointment is required"),
            body("client").exists().withMessage("client is required"),
            body("employee").exists().withMessage("employee is required"),
            body("services").exists().withMessage("services is required"),
            body("finalTotalPrice").exists().withMessage("finalTotalPrice is required"),
        ];
    },
    //create new payment
    async createPayment(req, res, next) {
        const validationErrors = validationResult(req).array();
        if (validationErrors.length > 0)
            return next(new ApiError(422, validationErrors));

    },
    //retrive all services 
    async allPayment(req, res, next) {

    }
}
