import express from "express";
import AppointmentController from "../controllers/appointment.controller";

const router = express.Router();

router.route('')
    .post(
        AppointmentController.validateBody(),
        AppointmentController.createAppointment)

    .get(AppointmentController.allAppointment)
    

export default router;
