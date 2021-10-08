const express = require('express')
const router = express.Router();
const { getTours, getTour, createTour, updateTour, deleteTour } = require('../controllers/tourController')

router.route("/").get(getTours).post(createTour);

router.route("/:id").patch(updateTour).delete(deleteTour).get(getTour);

module.exports = router;