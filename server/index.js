require('dotenv').config();
const express = require('express');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');

// Controller Functions
const authCtrl = require('./Controllers/authController'); 
const balCtrl = require('./Controllers/balanceController'); 

//ENV Variables
const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET
} = process.env;

// App Instance
const app = express();

// Top Level Middleware
app.use(express.json());
app.use(cors());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 600000
    }
}));

// DB Connection
massive(CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance);
        console.log('Database Connected');
    })
    .catch(err => console.log(err));

// Auth Endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
// app.delete('/auth/logout', authCtrl.logout);
// app.delete('/auth/logout', authCtrl.delete);

// Server Listening
app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`));