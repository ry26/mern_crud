import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from '../../../../models/index.js';
const user = db.user;
const client = db.client;
const folder = db.folder;

class FolderController {
    static createFolder = async (req, res) => {
        // console.log("reeeee",req)
        const { fparentId,name } = req.body;
        console.log('parentId server',req.body.fparentId)
        console.log('name server',req.body.name)
        // Get token from headers
        const token = await req.cookies.token;
        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }

        if (req.body.fparentId && req.body.name) {
                const createFolder = await folder.create({
                    FolderName: name,
                    displayFolderName: name,
                    fparentId: fparentId,
                    isRelease: false,
                    createdBy: req.user.dataValues.id
                })
                if (createFolder) {
                    res.send({ "status": "success", "message": "Folder Created Successfully!" })
                } else {
                    res.send({ "status": "failed", "message": "Folder Creation Failed" })
                }
        } else {
            res.send({ "status": "failed", "message": "All Fields Required!" })
        }

    }


    // static getClient = async (req, res) => {
    //     try {
    //         console.log('ggggggggggg--->',req.user)
    //         const getUser = await user.findOne({ where: { id: req.user.dataValues.id, isDeleted: false } });
    //         console.log('getUser', getUser);
    //         console.log('11111111', getUser.dataValues);

    //         const sql = `SELECT f.id,f.FolderName,f.displayFolderName,f.fparentId,f.isRelease 
    //         FROM folder AS f
    //         LEFT JOIN folder AS fd ON f.id = fd.fparentId AND fd.isDeleted=FALSE
    //         WHERE f.isDeleted= FALSE AND f.createdBy = ${getUser.dataValues.id}`;

    //         const data = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
    //         if (data) {
    //             return res.status(200).send({ code: 200, message: "Folder Details", data: data });
    //         } else {
    //             return res.status(404).send({ code: 404, message: "Folder Not Found", data: [] });
    //         }
    //     } catch (e) {
    //         console.log('eeeeee', e)
    //     }


    // }

}

export default FolderController