var express = require('express')
var router = express.Router()
const axios = require('axios')

router.get("/", async function (req, res, next) {
    axios
        .get('https://pokeapi.co/api/v2/pokemon')
        .then(result => {
            res.status(result.status).json(result.data)
            // console.log(`statusCode: ${result.status}`);
            // console.log(result.data);
        })
        .catch(error => {
            console.error(error);
        });
})

module.exports = router