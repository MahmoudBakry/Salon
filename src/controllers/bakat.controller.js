import Client from "../models/client.model";
import Bakat from '../models/Bakat.model'
import ApiError from "../helpers/ApiError";
import { body, validationResult } from 'express-validator/check';
import mongoose, { Schema } from "mongoose";

export default {
    validateBody(isUpdate = false) {
        return [
            body("name").exists().withMessage("name is required"),
            body("price").exists().withMessage("name is required")
        ];
    },
    //create new baka
    async createBaka(req, res, next) {
        try {
            console.log(req.body)
            let newDoc = await Bakat.create(req.body);
            return res.status(201).json(newDoc);
        } catch (err) {
            next(err)
        }
    },
    async allBakat(req, res, next) {
        try {
            let allDocs = await Bakat.find()
            return res.status(200).json(allDocs)
        } catch (err) {
            next(err)
        }
    },

}
