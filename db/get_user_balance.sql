SELECT *
FROM users u
JOIN balances b on u.user_id = b.user_id
WHERE u.email = $1; 