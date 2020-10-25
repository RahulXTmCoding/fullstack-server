const router=require("express").Router();
const service=require('./EventServices');
const service2=require('./userServices');
router.route('/add').post(service2.isLoggedIn,service.addEvent);
router.route('/edit').post(service2.isLoggedIn,service.editEvent);
router.route('/getEvent/:eventId').get(service2.isLoggedIn,service.getEvent)
router.route('/delete').delete(service2.isLoggedIn,service.deleteEvent);
router.route('/getAll').get(service2.isLoggedIn,service.getAllEvents);



module.exports=router;