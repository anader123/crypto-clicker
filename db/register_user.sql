INSERT INTO users 
(email, password)
VALUES 
($1, $2)
RETURNING user_id, email; 