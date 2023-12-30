const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  selectedDate: {
    type: String, // You can use Date type if you want to store actual dates
    required: true,
  },
  selectedTime: {
    type: String,
    required: true,
  },
  passengerCount: {
    type: Number,
    required: true,
  },
  confirmationNumber: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
