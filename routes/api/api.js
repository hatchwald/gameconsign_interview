var express = require('express')
var router = express.Router()
var fetch = require('node-fetch')

router.get("/", async function (req, res, next) {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
    const body = await response.text();
    res.status(200).json(body)
})

module.exports = router