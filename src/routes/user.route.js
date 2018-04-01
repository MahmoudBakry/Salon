import express from "express";
import UserController from "../controllers/user.controller";
import passport from "passport";
import passportService from '../services/passport';
import { multerSaveTo } from "../services/multer";
const requireAuth = passport.authenticate('jwt', { session: false });

const requireSignIn = passport.authenticate('local', { session: false });
const router = express.Router();

router.post("/signin", requireSignIn, UserController.signin);


router.route('/signup')
    .post(
        multerSaveTo('users').single('img'),
        UserController.validateBody(),
        UserController.signup
    )
export default router;
