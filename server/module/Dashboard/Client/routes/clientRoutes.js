import express from "express";
const router = express.Router();
import ClientController from "../controller/clientController.js";
import checkUserAuth from "../../../../middlewares/auth-middleware.js";

// router.use('/create/client', checkUserAuth)
router.use('/getclient', checkUserAuth)
// router.use('/deleteClientdata', checkUserAuth)



router.post('/create/client', ClientController.createClient)
// router.post('/login', UserController.userLogin)
router.get('/getclient',ClientController.getClient)

router.delete('/deleteClientdata/:id', ClientController.deleteClient)

router.get('/getclientdata',ClientController.getclientdata)

export default router;