var express = require('express')
var router = express.Router()

router.get("/", function (req, res, next) {
    res.send("anagram page")
})

router.post('/', function (req, res, next) {
    const form_data = req.body
    if (Array.isArray(form_data)) {
        const new_map = new Map()
        for (const anagram of form_data) {
            let sorted = [...anagram]
            sorted.sort()
            sorted = sorted.join("")
            if (new_map.has(sorted)) {
                new_map.get(sorted).push(anagram)
            } else {
                new_map.set(sorted, [anagram])
            }
        }
        let final_data = [...new_map.values()]
        res.status(200).json({ message: "your result anagram", data: final_data })
    } else {
        res.status(400).json({ message: 'your data not valid', data: form_data })
    }
})

module.exports = router