import express from "express";
import bakatController from "../controllers/bakat.controller";
import passport from "passport";
import passportService from '../services/passport';
import { multerSaveTo } from "../services/multer";
const requireAuth = passport.authenticate('jwt', { session: false });

const requireSignIn = passport.authenticate('local', { session: false });
const router = express.Router();

router.route('')
    .post(
        bakatController.validateBody(),
        bakatController.createBaka
    )
    .get(bakatController.allBakat)
export default router;
