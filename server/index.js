require('dotenv').config();
const path = require('path');
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
app.use( express.static( `${__dirname}/../build` ) );
app.use(express.json());
app.use(cors());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 60000000
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
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/logout', authCtrl.logout);
app.post('/api/delete/:user_id', authCtrl.verifySession, authCtrl.deleteUser);
app.get('/api/check_session', authCtrl.checkSession);
app.get('/api/session_info', authCtrl.getSessionInfo)

app.post('/api/session_balance', balCtrl.updateSessionBalance);
app.put('/api/exchanage', authCtrl.verifySession, balCtrl.exchangeClicks);

// Server Listening
app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`));