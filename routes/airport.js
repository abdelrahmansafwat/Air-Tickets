const express = require("express");
const router = express.Router();
const airportModel = require("../models/airport");

//Find route
router.get("/find/:q", async (req, res) => {
  console.log(req.params);
  var data = await airportModel.fuzzySearch(req.params.q);
  console.log(data[0]);
  res.status(200).json({
    data
  });
  /*
  await airportModel.find({ $text: { $search: req.params.q } }, (err, data) => {
    if (!data) {
      res.status(401).json({
        message: "Airport not found.",
      });
    } else {
      console.log(data);
      res.status(200).json({
        data
      });
    }
  });
  */
});

module.exports = router;
