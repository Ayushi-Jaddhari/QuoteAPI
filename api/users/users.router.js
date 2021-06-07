const {createUser,getQuotes,deletequotes,login,createQuotes}= require('./user.controller');
const router = require('express').Router();
const {checkToken} = require('../../auth/token_validate')
router.post('/',checkToken,createUser);
router.post('/createQuotes',checkToken,createQuotes);
router.get('/',getQuotes);
router.delete('/',checkToken,deletequotes);
router.post('/login',login);
module.exports = router;