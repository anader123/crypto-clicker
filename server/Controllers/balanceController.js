
const updateSessionBalance = (req, res) => {
    const { click_balance } = req.body; 
    req.session.click_balance = click_balance; 
    res.status(200).send('Clicks have been saved');
};

module.exports = {
    updateSessionBalance
} 