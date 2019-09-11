DELETE u.*, b.* 
FROM users u 
LEFT JOIN balances b ON b.user_id = u.user_id 
WHERE u.user_id = $1; 