const router=require("express").Router();
const service=require('./userServices');

router.route('/login').post(service.login);
router.route('/register').post(service.register);
router.route('/logout').post(service.logout);

module.exports=router;