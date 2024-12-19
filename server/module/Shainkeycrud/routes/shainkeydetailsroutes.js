import express from 'express'
const router = express.Router()
import shainkeydetailController from '../controller/shainkeydetailsController.js';


router.post('/createShainkeydetails', shainkeydetailController.createShainkeydetails);
router.get('/getshainkeydetails', shainkeydetailController.getshainkeydetails);
router.post('/userlogin', shainkeydetailController.userLogin);
router.get('/userlist', shainkeydetailController.getuserdata);
router.delete('/deleteUser/:id', shainkeydetailController.deleteUser)
router.post('/logout',shainkeydetailController.logoutUser)
// router.update('/updateshainkeydetails',);
// router.delete('deleteshainkeydetails',);

export default router;
