import express from "express";
import userRoute from "./user.route";
import serviceRoutes from './service.route'
import appointmentRoutes from './appointment.route'
import clientRoutes from './client.route'
import employeeRoutes from './employee.routes'
import passport from "passport";

const requireAuth = passport.authenticate('jwt', { session: false });
const router = express.Router();

router.use("/", userRoute);
router.use("/services", requireAuth, serviceRoutes)
router.use('/appointments', requireAuth, appointmentRoutes)
router.use('/clients', requireAuth, clientRoutes)
router.use('/employees', requireAuth, employeeRoutes)

export default router;
