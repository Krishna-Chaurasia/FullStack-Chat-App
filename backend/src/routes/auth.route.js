import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// post method : is used to send data like user data email name pass etc 
router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.put("/update-profile",protectRoute, updateProfile) // update profile only for logged in users
//protectRoute is a middleware function that checks if the user is logged in or not

router.get("/check",protectRoute,checkAuth) // check if user is logged in or not

export default router;
