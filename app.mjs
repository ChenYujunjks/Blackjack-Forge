import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import { User, Game} from './server/db.mjs';
import { createDeck, shuffleDeck, dealCards, calculateHandValue, determineOutcome } from './server/game.mjs';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'game.html'))
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// register requests
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const newUser = await User.create({ username, hash: password, email }); 
        req.session.userId = newUser._id; // login directly
        res.redirect('/');
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).send('Error registering new user');
    }
});

// login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && password === user.hash) {  // compare the password
        req.session.userId = user._id; // 保存用户会话
        res.redirect('/'); // 登录成功后重定向到首页或其他页面
    } else {
        res.status(401).send('Invalid username or password');
    }
});

app.post('/start', (req, res) => {
    const deck = createDeck();
    shuffleDeck(deck);
    const { playerHand, dealerHand } = dealCards(deck);
    req.session.deck = deck;  // save the deck in the session
    req.session.playerHand = playerHand;  // save player hands
    req.session.dealerHand = dealerHand;  // save hands
    res.json({
        playerHand: playerHand,
        dealerHand: [dealerHand[0], { suit: 'Hidden', value: 'Card' }] , // 庄家的第二张牌通常是隐藏的
        result: ''
    });
});

app.post('/hit', (req, res) => {
    if (req.session.deck.length === 0) {
        return res.status(400).json({ error: "No more cards in the deck." });
    }
    const card = req.session.deck.pop();
    req.session.playerHand.push(card);
    const playerTotal = calculateHandValue(req.session.playerHand);
    const bust = playerTotal > 21;
    res.json({
        playerHand: req.session.playerHand,
        dealerHand: [req.session.dealerHand[0], { suit: 'Hidden', value: 'Card' }],
        bust: bust,
        total: playerTotal
    });
});

app.post('/stand', (req, res) => {
    let dealerHand = req.session.dealerHand;
    while (calculateHandValue(dealerHand) < 17) {
        if (req.session.deck.length === 0) {
            return res.status(400).json({ error: "No more cards in the deck to draw." });
        }
        dealerHand.push(req.session.deck.pop());
    }
    req.session.dealerHand = dealerHand
    const playerTotal = calculateHandValue(req.session.playerHand);
    const dealerTotal = calculateHandValue(dealerHand);
    const result = determineOutcome(playerTotal, dealerTotal);  // get the result
    res.json({
        playerHand: req.session.playerHand,
        dealerHand: dealerHand,
        playerTotal: playerTotal,
        dealerTotal: dealerTotal,
        result: result
    });
});



// deal error for 505 and 404
app.use((req, res, next) => {
    res.status(404).send('Sorry, that route does not exist.');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});
