const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { email, password } = req.body; 
    const db = req.app.get('db'); 
    const foundUser = await db.find_user([email]); 

    if(foundUser[0]) {
        return res.status(409).send(`${email} is already taken. Please choose a different email.`);
    }

    // Salt and Hashing Password 
    const passwordSalt = bcrypt.genSaltSync(14); 
    const passwordHash = bcrypt.hashSync(password, passwordSalt);
    
    // Registering User
    const newUser = await db.register_user([email, passwordHash]); 

    // Initializing a balance for the user 
    const newUserBalance = await db.create_new_balance([newUser[0].user_id])

    // Deleting Unhashed Password 
    delete newUser[0].password;

    // Set values to the session 
    req.session.user = newUser[0];
    req.session.click_balance = newUserBalance[0].click_balance;

    const accountInfo = {
        user_id: newUser[0].user_id, 
        email: newUser[0].email, 
        click_balance: newUserBalance[0].click_balance
    };

    res.status(200).send(accountInfo)
};

const login = async (req, res) => {
    const { email, password } = req.body; 
    const db = req.app.get('db'); 
    const foundUser = await db.find_user([email]); 
    
    if(!foundUser[0]) {
        return res.status(403).send('Invalid credentials, please try again')
    }

    const authedPassword = bcrypt.compareSync(password, foundUser[0].password); 
    const userBalance = await db.get_user_balance([foundUser[0].email]);

    if(authedPassword) {
        delete foundUser[0].password; 
        req.session.user_id = foundUser[0].user_id; 
        req.session.email = foundUser[0].email; 
        req.session.click_balance = userBalance[0].click_balance; 

        const accountInfo = {
            user_id: foundUser[0].user_id, 
            email: foundUser[0].email, 
            click_balance: userBalance[0].click_balance
        };

        res.status(200).send(accountInfo); 
    } else {
        res.status(401).send('Invalid credentials, please try again');
    }
};

const logout = async (req, res) => {
    const click_balance = req.body.click_balance; 
    // TODO: 
    // Might need to have the balance update from the session
    const user_id = req.session.user_id; 
    const db = req.app.get('db'); 
    db.update_balance([click_balance, user_id])
        .then(() => {
            req.session.destroy();
            res.status(200).send('User logged out')
        })
};

const deleteUser = async (req, res) => {
    const user_id = +req.params.user_id; 
    const { email, password } = req.body;
    const db = req.app.get('db'); 
    const foundUser = await db.find_user([email]); 
    const authedPassword = bcrypt.compareSync(password, foundUser[0].password); 

    if(authedPassword) {
        const db = req.app.get('db'); 
        db.delete_user([user_id, user_id])
        .then(() => {
            req.session.destroy();
            res.status(200).send('Account has been deleted')
        })} else {
            res.status(401).send('Invalid credentials, please try again');
        }
};

// Checks to see if the users is logged in. 
const checkSession = (req, res) => {
    if(req.session.email === undefined) {
        res.status(403).send('user is not signed in')
    }
    else {
        res.status(200).send('user is signed in')
    }
};

const getSessionInfo = (req, res) => {
    const userInfo = {
        user_id: req.session.user_id, 
        click_balance: req.session.click_balance, 
        email: req.session.email
    }
    res.status(200).send(userInfo)
}

module.exports = {
    register, 
    login, 
    logout, 
    deleteUser,
    checkSession,
    getSessionInfo
}