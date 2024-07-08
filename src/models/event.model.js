// models/event.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Event Schema
const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  category: {
    type: [String],  
    required: true
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    long: {
      type: Number,
      required: true
    }
  },
  date: {
    type: Date,
    required: true
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  registerAmount: {
    type: Number,
    required: true
  },
  poster: {
    type: String, 
    required: true
  },
  registeredUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

// Create the Event Model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
