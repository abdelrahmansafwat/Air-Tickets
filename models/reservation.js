require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

let reservationSchema = new Schema({
    passengers: { type: [Schema.Types.Mixed], required: true },
    selectedGoingTicket: { type: [Schema.Types.Mixed], required: true },
    selectedReturningTicket: { type: [Schema.Types.Mixed], required: true },
    oneWay: { type: Boolean, required: true },
    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true },
});


let reservationModel = mongoose.model("reservation", reservationSchema);

module.exports = airportModel;