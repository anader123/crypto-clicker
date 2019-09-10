CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    email VARCHAR(25), 
    password VARCHAR(70)
);