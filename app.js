// app.js
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./server/config/dbConfig');
const appRoutes = require('./server/config/routes'); // Import the application end points/API
const appConfig = require('./server/config/appConfig');
const dotenv = require('dotenv');
dotenv.config();
//Environment variables Setup Path
// dotenv.config({ path: './path/to/your/.env' });

// Initialize Express app
const app = express();
const router = express.Router();

// Connect to database
console.log('Connecting to customer database...');
connectDB();

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Load Passport config
require('./config/passport')(passport);

// Routes
appRoutes(app, router); // Assign name to end points (e.g., '/api/management/', '/api/users' ,etc. )

// Start the server 
app.listen(appConfig.port, () => {
    console.log(`Server is running on port ${appConfig.port}`);
});
