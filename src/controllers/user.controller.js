import User from "../models/user.model";
import ApiError from "../helpers/ApiError";
import jwt from "jsonwebtoken";
import config from "../config";
import { toImgUrl } from '../utils';
import { body, validationResult } from 'express-validator/check';
import mongoose, { Schema } from "mongoose";




const { jwtSecret } = config;
const generateToken = id => {

    return jwt.sign({
        sub: id,
        iss: 'App',
        iat: new Date().getTime(),
    }, jwtSecret, { expiresIn: '10000s' })
}


export default {
    //validation on request parameter during sinup route
    validateBody(isUpdate = false) {
        return [
            body("name").exists().withMessage("name is required"),
            body("password").exists().withMessage("password is required"),
            body("phone").exists().withMessage("phone is requires")
        ];
    },
    //signup 
    async signup(req, res, next) {
        const validationErrors = validationResult(req).array();
        if (validationErrors.length > 0)
            return next(new ApiError(422, validationErrors));
        try {
            if (req.file)
                req.body.img = await toImgUrl(req.file);

            let createdUser = await User.create(req.body);
            res.status(201).send({ user: createdUser, token: generateToken(createdUser.id) });
        } catch (err) {
            next(err);
        }
    },

    //signin
    async signin(req, res, next) {
        let user = req.user; // Passport
        res.send({ user, token: generateToken(user.id) });
    },

}