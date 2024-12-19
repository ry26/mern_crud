import  jwt  from "jsonwebtoken";
import db from "../models/index.js";
const user = db.user;

var checkUserAuth = async(req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
            try {
                // Verify Token
                console.log('tokennn',req.cookies.token);
                const { UserId } = jwt.verify(token, process.env.JWT_SECRET);
              // Add this to verify
                console.log('userIddddd',UserId);
                // Get User From Token
                req.user = await user.findOne({ where: { id: UserId }, attributes: { exclude: ['password'] } });
                // console.log("Authenticated User: ", req.user); // Add this to verify

                if (!req.user) {
                    return res.status(401).send({ status: "failed", message: "Unauthorized User, user not found" });
                }
    
                next();
            } catch (error) {
                console.log(error);
                res.status(401).send({ status: "failed", message: "Unauthorized User" });
            }
        } else {
            res.status(401).send({ status: "failed", message: "Unauthorized User, No Token" });
        }
    }
}

export default checkUserAuth