SELECT user_id, email, password 
FROM users 
WHERE email = $1;