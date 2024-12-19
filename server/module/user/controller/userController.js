import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from "../../../models/index.js";
const user = db.user;

class UserController {
    static userRegistration = async (req, res) => {
        const { Name, Email, password, cPassword } = req.body;
        console.log(req.body, 'reqreqreq')
    
        const userFind = await user.findOne({ where: { userEmail: req.body.Email, isDeleted: false } });
        if (userFind) {
            res.send({ "status": "failed", "message": "Email already exists" });
        } else {
            // Checking whether all fields have values
            if (Name && Email && password && cPassword) {
                if (password === cPassword) {
                    try {
                        // Hashing password
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
    
                        // Create user
                        const userCreate = await user.create({
                            userName: Name,
                            userEmail: Email,
                            userPassword: hashPassword,
                        });
    
                        // Check the result of the user creation
                        console.log(userCreate, 'newly created user');
    
                        if (!userCreate || !userCreate.id) {
                            return res.status(500).send({ "status": "failed", "message": "Failed to create user" });
                        }
    
                        // Corrected the findOne query using where clause with proper column names
                        const savedUser = await user.findOne({ where: { userEmail: userCreate.userEmail } });
    
                        // Generate JWT Token
                        const token = jwt.sign({ UserId: userCreate.id }, process.env.JWT_SECRET, { expiresIn: '5d' });
                        res.cookie('token', token, {
                            httpOnly: true,      // HTTP-only, cannot be accessed via JavaScript
                            secure: true,        // Ensure cookie is sent over HTTPS
                            sameSite: 'strict',  // Helps mitigate CSRF attacks
                            maxAge: 24 * 60 * 60 * 1000 // Cookie expiry in 1 day
                        });
    
                        res.send({ "status": "success", "message": "Registration successful!", "token": token, "userDetails": userCreate });
                    } catch (error) {
                        console.log(error);
                        res.send({ "status": "failed", "message": "Unable to Register" });
                    }
                } else {
                    res.send({ "status": "failed", "message": "Password and Confirm Password don't match" });
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields Are Required" });
            }
        }
    }
    
    

    static userLogin = async (req, res) => {
        try {
            const { Email, Password } = req.body
            console.log("bodyyyy", req.body)
            if (Email && Password) {
                const getUser = await user.findOne({ where: { userEmail: Email } })
                console.log("getUser", getUser)
                if (getUser) {
                    const isMatch = await bcrypt.compare(Password, getUser.userPassword)
                    if ((getUser.userEmail === Email) && isMatch) {
                        //Generating JWT Token
                        const token = jwt.sign({ UserId: getUser.id }, process.env.JWT_SECRET, { expiresIn: '5d' })
                        console.log("token",token);
                        res.cookie('token', token, {
                            httpOnly: true,      // HTTP-only, cannot be accessed via JavaScript
                            secure: true,        // Ensure cookie is sent over HTTPS
                            sameSite: 'strict',  // Helps mitigate CSRF attacks
                            maxAge: 24 * 60 * 60 * 1000 // Cookie expiry in 1 day
                        });
                        console.log("res",res);
                        res.send({ "status": "success", "message": "Login Success", "token": token, "userDetail": getUser })
                    } else {
                        res.send({ "status": "failed", "message": "Password or Email Does not Match" })
                    }
                } else {
                    res.send({ "status": "failed", "message": "You are not Registered Register" })
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields Are Required" })
            }
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Unable To Login" })
        }
    }

    static changeUserPassword = async (req, res) => {
        const { Password, Password_Confirmation } = req.body
        if (Password && Password_Confirmation) {
            if (Password !== Password_Confirmation) {
                res.send({ "status": "failed", "message": "Password and Confirm password doesn't match" })
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(Password, salt);
                const getUserDetail = await user.findOne({ where: { id: req.user.id, isDeleted: false } });

                if (getUserDetail) {
                    const updateWorkFlow = await user.update({
                        userPassword: hashPassword
                    },
                        {
                            where: { id: getUserDetail.id }
                        });
                }

                res.send({ "status": "success", "message": "Password Change Successfully" })
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields Are Required" })
        }
    }

    static logoutUser = async (req,res) => {
        const logout = await res.clearCookie('token', { path: '/'})
        console.log("logout",logout);
        if(logout){
            res.send({ "status": "success", "message": "Logout Successfully" })
        }else{
            res.send({ "status": "failed", "message": "Logout Failed" })
        }
    }


    // static loggedUser = async (req, res) => {
    //     res.send({"user": req.user})
    // }


    // static sendUserPasswordResetEmail = async (req,res) => {
    //     const {Email} = req.body
    //     if(Email){
    //         const user = await UserModel.findOne({email: Email})

    //         console.log('constroller user',user);
    //         if(user){
    //             // below code to send mail using nodemailer
    //             // const secret = user._id + process.env.JWT_SECRET_KEY
    //             // const token = jwt.sign({userID: user._id}, secret, {expiresIn: '15m'})
    //             // const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
    //             // console.log(link)

    //             // //Send Email
    //             // let info =  await transporter.sendMail({
    //             //     from: process.env.EMAIL_FROM,
    //             //     to: user.email,
    //             //     subject: "GeekShop Password Reset Link",
    //             //     html: `<a href=${link}>Click Here</a> To Reset Your Password`
    //             // })

    //             res.send({"status": "success", "message": "Email has been sent!"})
    //         }else{
    //             res.send({"status": "failed", "message": "Email Doesn't Exit...."})
    //         }
    //     }else{
    //         res.send({"status": "failed", "message": "Email Field is Required"})
    //     }
    // }

    // static userPasswordRest = async (req, res) => {
    //     const {Password, Password_Confirmation} = req.body
    //     const {id, token} = req.params
    //     console.log('id',id);
    //     console.log('token',token);
    //     const user = await UserModel.findById(id)
    //     const new_secret = user._id + process.env.JWT_SECRET_KEY
    //     try{
    //         jwt.verify(token,new_secret)
    //         if(Password && Password_Confirmation){
    //             if(Password !== Password_Confirmation){
    //                 res.send({"status": "failed", "message": "Password and Confirm Password doesn't match!"})
    //             }else{
    //                 const salt = await bcrypt.genSalt(10)
    //                 const newHashPassword = await bcrypt.hash(Password, salt)
    //                 await UserModel.findByIdAndUpdate(user._id, {$set: {password: newHashPassword}})
    //                 res.send({"status":"success", "message": "Password Updated Successfully"}) 
    //             }
    //         }else{
    //             res.send({"status": "failed", "message": "All Fields Are Required!"})
    //         }
    //     }catch(error){
    //         console.log(error)
    //         res.send({"status": "failed", "message": "Invalid Token...."})
    //     }
    // }
}

export default UserController