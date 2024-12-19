import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from '../../../../models/index.js';
import { where } from 'sequelize';
const user = db.user;
const client = db.client;
const folder = db.folder;

class ClientController {
    static createClient = async (req, res) => {
        // console.log("reeeee",req)
        const { name, mobile } = req.body;

        // Get token from headers
        const token = await req.cookies.token;
        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }

        if (req.body.name && req.body.mobile) {
            const userCreate = await client.create({
                clientName: name,
                clientMobile: mobile,
                createdBy: req.user.dataValues.id
            });

            if (userCreate) {
                const createFolder = await folder.create({
                    FolderName: name,
                    displayFolderName: name,
                    fparentId: null,
                    isRelease: false,
                    createdBy: req.user.dataValues.id
                })
                if (createFolder) {
                    res.send({ "status": "success", "message": "Folder Created Successfully!" })
                } else {
                    res.send({ "status": "failed", "message": "Folder Creation Failed" })
                }
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields Required!" })
        }

    }


    static getClient = async (req, res) => {
        try {
            console.log('ggggggggggg--->', req.user);
            const getUser = await user.findOne({ where: { id: req.user.dataValues.id, isDeleted: false } });
    
            const folders = await folder.findAll({
                where: { 
                    fparentId: null,
                    createdBy: getUser.dataValues.id, // Add the condition for createdBy
                },
                include: [{
                    model: folder,
                    as: 'subFolders',
                    attributes: ['id', 'FolderName', 'displayFolderName', 'fparentId', 'isRelease']
                }],
                attributes: ['id', 'FolderName', 'displayFolderName', 'fparentId', 'isRelease']
            });
    
            console.log("folderfolders", folders);
    
            // Send the response once
            return res.status(200).json({
                code: 200,
                message: "Folder Details",
                data: folders
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

    static deleteClient = async (req, res) =>{
        try {
            console.log(req.params.id," Check Id");
            
            const getUser  = await client.findOne({ where: { id: req.params.id, isDeleted: false } })
            // const getUserid = getUser.id

            console.log(getUser,"getdeleteClientData")
            // const deletedata = await client.update({isDeleted:true}, { where: {getUser.id}});
            const deletedata = await client.update({ isDeleted: true }, { where: { id: req.params.id } });
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
    
    static getclientdata = async (req, res)=>{
        try {
            const getUser  = await client.findAll({where: { isDeleted : false}})

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
}

  

export default ClientController