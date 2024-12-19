import express from "express";
const router = express.Router();
import FolderController from "../controller/folderController.js";
import checkUserAuth from "../../../../middlewares/auth-middleware.js";

router.use('/create', checkUserAuth)
// router.use('/getclient', checkUserAuth)


router.post('/create', FolderController.createFolder)
// router.post('/login', UserController.userLogin)
// router.get('/getclient',ClientController.getClient)

export default router;