var express = require('express')
var router = express.Router()
const axios = require('axios')

router.get("/", function (req, res, next) {
    // const params = req.params
    console.log(req.query.limit);
    axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then(result => {
            const raw_data = result.data.results
            let limit = 20
            let offset = 0
            let final_data = []
            for (let index = offset; index < limit; index++) {
                final_data.push(raw_data[index])
            }
            const result_data = { limit: limit, data: final_data }
            res.status(result.status).json(result_data)
        })
        .catch(error => {
            console.error(error);
        });
})

module.exports = router