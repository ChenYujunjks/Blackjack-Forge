import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config(); // This loads the environment variables from the .env file

// 1. Schema Definitions
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    email: { type: String, unique: true }
});

const gameSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['ongoing', 'finished'], default: 'ongoing' },
    playerCards: [{ type: String }],
    dealerCards: [{ type: String }],
    outcome: { type: String, enum: ['win', 'lose', 'tie'] }
});

// 2. Model Definitions
const User = mongoose.model('User', userSchema);
const Game = mongoose.model('Game', gameSchema);


// 3. Connection Setup
const dbUrl = process.env.DB_URL;  // || 'mongodb://localhost/blackjack'
mongoose.connect(dbUrl).catch(error => {
    console.error('Connection error', error.message);
});

// 4. Connection Events
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', function() {
    console.log('MongoDB connection established successfully');
});

export { User, Game };   // 5. Exports
