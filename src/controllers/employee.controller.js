import Client from "../models/client.model";
import Employee from '../models/employee.model'
import ApiError from "../helpers/ApiError";
import { body, validationResult } from 'express-validator/check';
import mongoose, { Schema } from "mongoose";
import { toImgUrl } from '../utils/index'
import Payment from '../models/payment.model'

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
    },
    async employeeDetails(req, res, next) {
        try {
            const empId = req.params.empId;
            let docDetails = await Employee.findById(empId);
            return res.status(200).json(docDetails);
        } catch (err) {
            next(err)
        }
    },

    async allPaymentUnderOneEmplyee(req, res, next) {
        try {
            let empId = req.params.empId;
            let query = {}
            query.employee = empId;
            let { startDate, endDate } = req.query;
            if (startDate) {
                startDate = parseInt(startDate)
                query.creationDate = { $gte: +startDate }
            }
            if (endDate) {
                endDate = parseInt(endDate)
                query.creationDate = { ...query.creationDate, $lte: +endDate }
            }
            let payments = await Payment.find(query);
            //calculate summution of porfit for this emp
            var sum = payments.reduce(function (all, item, index) {
                return all += item.finalTotalPrice;
                console.log(all + "in" + item)
            }, 0);
            //responce 
            return res.status(200).json({
                "payments": payments,
                "sumOfMony": sum
            })

        } catch (err) {
            next(err)
        }
    },

}
