import express from "express";
import ServiceController from "../controllers/service.controller";

const router = express.Router();

router.route('')
    .post(
        ServiceController.validateBody(),
        ServiceController.createService)
    .get(ServiceController.allServices)

export default router;
