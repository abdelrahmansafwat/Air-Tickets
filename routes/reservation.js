const express = require("express");
const FormData = require("form-data");
const axios = require("axios");
const router = express.Router();

//Find route
router.post("/find", async (req, res) => {
  console.log(req.body);
  var birmanUrl = "http://143.110.230.33/api/birman";
  var flynovoairUrl = "http://143.110.230.33/api/flynovoair";
  var usbairUrl = "http://144.126.215.47/api/usbair";

  var birmanData = null;
  var flynovoairData = null;
  var usbairData = null;

  await axios
    .post(birmanUrl, {
      departure_code: req.body.departure_code,
      arrival_code: req.body.arrival_code,
      departure_date: req.body.departure_date,
      arrival_date: req.body.arrival_date,
      adult: req.body.adult,
      child: req.body.child,
      infant: req.body.infant,
      oneway: req.body.oneway,
    })
    .then(function (response) {
      console.log(response.data);
      birmanData = response.data;
    })
    .catch(function (error) {
      console.log(error);
      if (error) {
      }
    });

  await axios
    .post(flynovoairUrl, {
      departure_code: req.body.departure_code,
      arrival_code: req.body.arrival_code,
      departure_date: req.body.departure_date,
      arrival_date: req.body.arrival_date,
      adult: req.body.adult,
      child: req.body.child,
      infant: req.body.infant,
      oneway: req.body.oneway,
    })
    .then(function (response) {
      console.log(response.data);
      flynovoairData = response.data;
    })
    .catch(function (error) {
      console.log(error);
      if (error) {
      }
    });

  await axios
    .post(usbairUrl, {
      departure_code: req.body.departure_code,
      arrival_code: req.body.arrival_code,
      departure_date: req.body.departure_date,
      arrival_date: req.body.arrival_date,
      adult: req.body.adult,
      child: req.body.child,
      infant: req.body.infant,
      oneway: req.body.oneway,
    })
    .then(function (response) {
      console.log(response.data);
      usbairData = response.data;
    })
    .catch(function (error) {
      console.log(error);
      if (error) {
      }
    });

  res.status(200).json({
    flynovoair: flynovoairData,
    birman: birmanData,
    usbair: usbairData,
  });
});

module.exports = router;
