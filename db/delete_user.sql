DELETE u.*, b.*
FROM users u 
JOIN balances b ON u.user_id = b.user_id
WHERE u.user_id = $1; 