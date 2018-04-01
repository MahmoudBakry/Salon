import express from "express";
import clientController from "../controllers/client.controller";
import passport from "passport";
import passportService from '../services/passport';
import { multerSaveTo } from "../services/multer";
const requireAuth = passport.authenticate('jwt', { session: false });

const requireSignIn = passport.authenticate('local', { session: false });
const router = express.Router();

router.route('')
    .post(
        clientController.validateBody(),
        clientController.createClient)
    .get(clientController.allClient)
export default router;
