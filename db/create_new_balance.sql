INSERT INTO balances 
(click_balance, user_id)
VALUES(0, $1)
RETURNING click_balance