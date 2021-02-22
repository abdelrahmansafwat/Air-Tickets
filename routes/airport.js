const express = require("express");
const router = express.Router();
const airportModel = require("../models/airport");

//Find route
router.get("/find?:q", async (req, res) => {
  airportModel.find({ $text: { $search: req.params.q } }, (err, data) => {
    if (!data) {
      res.status(401).json({
        message: "Airport not found.",
      });
    } else {
      res.status(200).json({
        data
      });
    }
  });
});

module.exports = router;
