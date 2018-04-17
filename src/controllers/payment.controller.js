import Client from '../models/client.model'
import ApiError from "../helpers/ApiError";
import { body, validationResult } from 'express-validator/check';
import mongoose, { Schema } from "mongoose";
import Payment from '../models/payment.model';
import Service from '../models/services.model'

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
        let servicesIds = req.body.services;
        let prices = []
        for (let x = 0; x < servicesIds.length; x++) {
            let service = await Service.findById(servicesIds[x]);
            prices.push(service.price);
        }
        console.log(prices);
        const summution = (accumulator, currentValue) => accumulator + currentValue;
        let total = prices.reduce(summution);
        if (req.body.actualTotalPrice != total)
            return next(new ApiError(422, "incorrect total price"));
        let newPayment = await Payment.create(req.body);
        //increament count of client 
        let client = await Client.findById(req.body.client);
        client.counterOfService++;
        await client.save();
        let responceObject = await Payment.findById(newPayment.id)
            .populate('appointment')
            .populate('client')
            .populate('employee')
            .populate('services')
        return res.status(200).json(responceObject);
    },
    //retrive all services 
    async allPayment(req, res, next) {

    }
}
