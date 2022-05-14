var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

router.get('/', function (req, res, next) {
    const token = jwt.sign({ data: 'foobar' }, 'thisissecret', {
        expiresIn: '1h'
    })
    res.send(`This is your secret to access api page <b>${token}</b> token will expired in 1h`)
});

module.exports = router;
