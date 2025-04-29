import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) =>{
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET,{
        expiresIn: "20d" // sending to cookies
    }) 

res.cookie("jwt", token,{
    maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days in milliseconds
    httpOnly: true, // only accessible by the web server and prevents XSS attacks cross-site scripting attacks
    sameSite:"strict", // prevents CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development", // only send the cookie over HTTPS in production


})

return token; // return the token for use in the frontend if needed
}