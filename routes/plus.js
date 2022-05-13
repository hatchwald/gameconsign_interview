var express = require('express')
var router = express.Router()

router.get("/", function (req, res, next) {



    res.render('plus', { title: 'ExpressJS', some: "your pattern will be show on page '/plus/yournumber'", data: "" });
}).get("/:plusId", (req, res, next) => {
    const params = req.params
    let plus_num = params.plusId
    plus_num = Number(plus_num)
    if (isNaN(plus_num)) {
        res.send(" your number not valid")
    } else {
        if (plus_num <= 0) {
            res.send("your number must be higher than 0")
        }

        let first_last_arr = []
        for (let index = 0; index <= plus_num + 1; index++) {
            first_last_arr[index] = "+"
        }
        if ((plus_num + 2) % 2 != 0) {
            let mid_num = (plus_num + 1) / 2
            first_last_arr[mid_num] = "-"
        } else {
            let mid_num = (plus_num + 2) / 2
            first_last_arr[mid_num] = "-"
        }
        first_last_arr = first_last_arr.join(" ")
        let temp_arr = []
        temp_arr[0] = "+"
        for (let index = 1; index <= plus_num; index++) {
            temp_arr[index] = "-"
        }
        temp_arr[plus_num + 1] = "+"
        temp_arr = temp_arr.join(" ")
        let mid_str = []
        for (let index = 0; index < plus_num + 2; index++) {
            mid_str[index] = "-"
        }
        mid_str = mid_str.join(" ")
        let final_arr = []
        final_arr[0] = first_last_arr
        final_arr[1] = temp_arr
        final_arr[2] = mid_str
        final_arr[3] = temp_arr
        final_arr[4] = first_last_arr

        res.render('plus', { title: 'ExpressJS', some: "", data: final_arr });
    }

})

module.exports = router