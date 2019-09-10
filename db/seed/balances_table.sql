CREATE TABLE balances (
    balance_id SERIAL PRIMARY KEY, 
    click_balance INTEGER, 
    user_id INTEGER REFERENCES users(user_id)
);