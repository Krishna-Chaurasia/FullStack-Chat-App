import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import cookieParser from 'cookie-parser'; // for parsing cookies

// Middleware to protect routes, if protectRoute is valid then only user can updateProfile
export const protectRoute = async (req, res, next) => {

    try {
        const token = req.cookies.jwt; // get the token from cookies provided to user

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided " }); // if token is not present then user is not logged in
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token using JWT secret key

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" }); // if token is invalid then user is not logged in
        }

        const user = await User.findById(decoded.id).select("-password"); // find user by id and exclude password from the response

        if (!user) {
            return res.status(404).json({ message: "User Not Found" }); // if user is not found then user is not logged in
        }

        req.user = user; // set the user in request object for use in next middleware or controller
        next(); // call the next middleware or controller

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message); // log the error message
        res.status(500).json({ message: "Internal server error" }); // send error response  
    }

}