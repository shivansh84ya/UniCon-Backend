// src/populateEvent.js
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import Event from './models/event.model.js';
import User from './models/user.model.js'; // Assuming you have a User model

dotenv.config();

const createUser = async (username) => {
  const user = new User({ username, email: `${username}@example.com`, password: 'password' });
  await user.save();
  return user;
};

const populateEvents = async () => {
  // Connect to MongoDB
  await connectDB();

  // Clear existing data
  await Event.deleteMany({});
  await User.deleteMany({});

  // Create users
  const user1 = await createUser('user1');
  const user2 = await createUser('user2');

  // Create events
  const events = [
    {
      name: 'Event 1',
      department: 'IT',
      category: ['Tech', 'Conference'],
      location: { lat: 40.7128, long: -74.0060 },
      date: new Date('2024-08-01'),
      postedBy: user1._id,
      registerAmount: 100,
      poster: 'https://example.com/event1.jpg',
      registeredUsers: [user1._id, user2._id]
    },
    {
      name: 'Event 2',
      department: 'HR',
      category: ['Workshop'],
      location: { lat: 34.0522, long: -118.2437 },
      date: new Date('2024-09-15'),
      postedBy: user2._id,
      registerAmount: 50,
      poster: 'https://example.com/event2.jpg',
      registeredUsers: [user1._id]
    }
  ];

  await Event.insertMany(events);
  console.log('Event database populated!');
  mongoose.connection.close();
};

populateEvents().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
