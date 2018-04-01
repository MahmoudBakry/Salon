import Client from "../models/client.model";
import Employee from '../models/employee.model'
import ApiError from "../helpers/ApiError";
import { body, validationResult } from 'express-validator/check';
import mongoose, { Schema } from "mongoose";
import { toImgUrl } from '../utils/index'

export default {
    validateBody(isUpdate = false) {
        return [
            body("clint").exists().withMessage("name is required"),
            body("phone").exists().withMessage("phone is required"),
            body("nationaId").exists().withMessage("nationaId is required")
        ];
    },
    //create new client then new appointment
    async createEmp(req, res, next) {
        try {
            if (req.file)
                req.body.img = await toImgUrl(req.file)
            let newDoc = await Employee.create(req.body);
            return res.status(201).json(newDoc);
        } catch (err) {
            next(err)
        }
    },
    //retrive all employees 
    async allEmployees(req, res, next) {
        try {
            let allDocs = await Employee.find();
            return res.status(200).json(allDocs)
        } catch (err) {
            next(err)
        }
    }

}
