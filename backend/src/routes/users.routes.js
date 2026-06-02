import { Router } from "express";
import { addToHistory, getUserHistory, login, register } from "../controllers/user.controller.js";

const router = Router();

// Middleware to verify token from Authorization header for protected routes
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        // Fall through — token in body is checked in controller
        return next();
    }
    req.authToken = token;
    next();
};

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/add_to_activity").post(verifyToken, addToHistory)
router.route("/get_all_activity").get(verifyToken, getUserHistory)

export default router;