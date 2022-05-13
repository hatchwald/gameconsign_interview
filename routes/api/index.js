var express = require('express')
var router = express.Router()
const axios = require('axios')
const url = require('url')
const querystring = require('query-string')

router.get("/", function (req, res, next) {
    const parsedUrl = url.parse(req.originalUrl)
    const parsedQuery = querystring.parse(parsedUrl.query)
    axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then(result => {
            const count_data = result.data.count
            let raw_data = result.data.results
            let keyword = ""
            if (typeof parsedQuery.search !== "undefined") {
                keyword = parsedQuery.search
                let matches_data = raw_data.filter(param => param.name.includes(keyword) || param.url.includes(keyword))
                raw_data = matches_data
                console.log(matches_data);
            }
            let page = (typeof parsedQuery.page !== "undefined") ? parsedQuery.page : 1
            page = (isNaN(page)) ? 1 : Number(page)
            page = (page < 1) ? 1 : page
            let limit = (typeof parsedQuery.limit !== "undefined") ? parsedQuery.limit : 20
            limit = (isNaN(limit)) ? 20 : Number(limit)
            limit = (limit < 1) ? 1 : limit
            let offset = (page > 1) ? page * limit : 0
            let final_data = []
            let max_data = (offset > 0) ? limit + offset : limit
            for (let index = offset; index < max_data; index++) {
                let data_to_push = raw_data[index]
                if (typeof data_to_push != "undefined") {
                    final_data.push(data_to_push)
                }
            }
            const last_page = Math.floor(count_data / limit)
            let result_data = ""
            if (keyword != "") {
                result_data = { count: count_data, limit: limit, page: page, last_page: last_page, keyword: keyword, data: final_data, }
            } else {
                result_data = { count: count_data, limit: limit, page: page, last_page: last_page, data: final_data }
            }
            res.status(result.status).json(result_data)
        })
        .catch(error => {
            console.error(error);
        });
})

module.exports = router