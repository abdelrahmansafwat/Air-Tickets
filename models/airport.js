require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

let airportSchema = new Schema({
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    cityCode: { type: String, required: true },
    cityName: { type: String, required: true },
    countryName: { type: String, required: true },
    countryCode: { type: String, required: true },
    timezone: { type: String, required: true },
    lat: { type: String, required: true },
    lon: { type: String, required: true },
    city: { type: Boolean, required: true },
});

airportSchema.index({name: 'text', cityName: 'text'});

let airportModel = mongoose.model("aiport", airportSchema);

module.exports = airportModel;