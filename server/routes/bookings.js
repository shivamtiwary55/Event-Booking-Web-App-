const express = require('express');
const router = express.Router();
const {bookEvent,sendBookingOTP,getMyBookings,confirmBooking,cancelBooking} = require('../controllers/bookingController.js');
const{protect,admin} = require('../middlerware/auth');

router.post('/',protect,bookEvent);
router.post('/send-otp',protect,sendBookingOTP);
router.get('/my',protect,getMyBookings);
router.put(':id/confirmed',protect,admin,confirmBooking);
router.get('/:id',protect,cancelBooking);

module.exports = router;


