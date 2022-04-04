const express = require('express')
const router = express.Router()
const urlController = require('../controller/urlController')



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


// ==================================================================================================================================
                                          //   POST URL  Create Shorten
// ==================================================================================================================================


router.post('/url/shorten', urlController.createShortUrl)


module.exports = router
