const mongoose = require('mongoose');

const joinSubmissionSchema = new mongoose.Schema({
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
  organization: {
    type: String,
    trim: true,
    maxlength: [200, 'Organization name cannot be more than 200 characters']
  },
  interests: {
    type: String,
    trim: true,
    maxlength: [500, 'Interests cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JoinSubmission', joinSubmissionSchema);
