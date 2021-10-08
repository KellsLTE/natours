const express = require('express')
const router = express.Router();
const { getTours, getTour, createTour, updateTour, deleteTour, checkID } = require('../controllers/tourController')

router.param('id', checkID)

router.route("/").get(getTours).post(createTour);

router.route("/:id").patch(updateTour).delete(deleteTour).get(getTour);

module.exports = router;