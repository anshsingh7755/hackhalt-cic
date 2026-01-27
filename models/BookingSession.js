const mongoose = require('mongoose');

const bookingSessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  organisation: {
    type: String,
    trim: true,
    maxlength: [200, 'Organisation cannot be more than 200 characters']
  },
  package: {
    type: String,
    enum: ['individual', 'team', 'enterprise'],
    required: [true, 'Please select a package']
  },
  dates: {
    type: String,
    trim: true,
    maxlength: [500, 'Dates cannot be more than 500 characters']
  },
  message: {
    type: String,
    trim: true,
    maxlength: [5000, 'Message cannot be more than 5000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('BookingSession', bookingSessionSchema, 'bookingsessions');
