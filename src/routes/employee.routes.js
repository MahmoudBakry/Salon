import express from "express";
import employeeControllers from "../controllers/employee.controller";
import passport from "passport";
import passportService from '../services/passport';
import { multerSaveTo } from "../services/multer";
const requireAuth = passport.authenticate('jwt', { session: false });

const requireSignIn = passport.authenticate('local', { session: false });
const router = express.Router();

router.route('')
    .post(
        multerSaveTo('emp').single('img'),
        employeeControllers.validateBody(),
        employeeControllers.createEmp)

    .get(employeeControllers.allEmployees)
router.route('/:empId')
    .get(employeeControllers.employeeDetails)

export default router;
