import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from '../../../models/index.js';
import { where } from 'sequelize';
const shainkeydetail = db.shainkeydetail


class shainkeydetailController {

    static createShainkeydetails = async (req, res)=>{
        const { Name, Email, password, Mobile,Designation,createdBy } = req.body;
      console.log(req.body,"createShainkeydetails");
      if (Name && Email && password) {
      
          // Hashing password
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
       const userCreate = await shainkeydetail.create({
        Name : Name,
        Mobile : Mobile,
        Designation : Designation,
        userEmail: Email,
        userPassword: hashPassword,
        createdBy : createdBy
       })
       
       if (!userCreate || !userCreate.id) {
        return res.status(500).send({ "status": "failed", "message": "Failed to create user" });
       }
       // Corrected the findOne query using where clause with proper column names
       const savedUser = await shainkeydetail.findOne({ where: { userEmail: userCreate.userEmail } });
        // Generate JWT Token
        console.log("savedUser",savedUser);
        const token = jwt.sign({ id: userCreate.id }, process.env.JWT_SECRET, { expiresIn: '5d' });
        console.log("test123",token);
        res.cookie('token', token, {
            httpOnly: true,      // HTTP-only, cannot be accessed via JavaScript
            secure: true,        // Ensure cookie is sent over HTTPS
            sameSite: 'strict',  // Helps mitigate CSRF attacks
            maxAge: 24 * 60 * 60 * 1000 // Cookie expiry in 1 day
        });

        res.send({ "status": "success", "message": "Registration successful!", "token": token, "userDetails": userCreate });
        console.log("test334",token);

      

      } else {
        res.send({ "status": "failed", "message": "All Fields Are Required" });
     }

       }
    
    static getshainkeydetails = async (req, res) =>{
      try {
        const getshainkeydetails = await shainkeydetail.findAll({Where:  { isDeleted : false }})
        return res.status(200).json({
            code: 200,
            message: "Folder Details",
            data: getshainkeydetails
        });
      } catch (e) {
        return res.status(500).json({
            code: 500,
            message: "An error occurred",
            error: e.message
        });
      }
    }

    static updateshainkeydetails = async (req, res) =>{
       try {
        console.log(req,"updateshainkeydetails");
        
          const getUser = await shainkeydetail.findOne({ where: { id: req.shainkeydetail.dataValues.id, isDeleted: false } });
          

       } catch (e) {
        
       }
    }


    static userLogin = async (req, res) => {
      try {
          const { Email, Password } = req.body
          console.log("bodyyyy", req.body)
          if (Email && Password) {
              const getUser = await shainkeydetail.findOne({ where: { userEmail: Email } })
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

    static deleteshainkeydetails = async (req, res) =>{
        
    }

    static getuserdata = async (req, res)=>{
        try {
            const getUser  = await shainkeydetail.findAll({where: { isDeleted : false}})

            console.log(getUser,"getClientData")

            return res.status(200).json({
                code: 200,
                message: "Folder Details",
                data: getUser
            });
        } catch (e) {
            return res.status(500).json({
                code: 500,
                message: "An error occurred",
                error: e.message
            });
        }
    
    }

    static deleteUser = async (req, res) =>{
        try {
            console.log(req.params.id," Check Id");
            
            const getUser  = await shainkeydetail.findOne({ where: { id: req.params.id, isDeleted: false } })
            // const getUserid = getUser.id

            console.log(getUser,"getdeleteClientData")
            // const deletedata = await client.update({isDeleted:true}, { where: {getUser.id}});
            const deletedata = await shainkeydetail.update({ isDeleted: true }, { where: { id: req.params.id } });
            // Send the response once
            return res.status(200).json({
              code: 200,
              message: "Folder Details",
              data: deletedata
          });
          
        } catch (e) {
            console.log('eeeeee', e);
    
            // Handle the error and send a response if needed
            return res.status(500).json({
                code: 500,
                message: "An error occurred",
                error: e.message
            });
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
}

export default shainkeydetailController
