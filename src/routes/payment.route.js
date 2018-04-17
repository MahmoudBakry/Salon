import express from "express";
import paymentController from "../controllers/payment.controller";
import passport from "passport";
import passportService from '../services/passport';
import { multerSaveTo } from "../services/multer";
const requireAuth = passport.authenticate('jwt', { session: false });

const requireSignIn = passport.authenticate('local', { session: false });
const router = express.Router();

router.route('')
    .post(
        paymentController.validateBody(),
        paymentController.createPayment)
    .get(paymentController.allPayment)
export default router;
