const express  = require('express')
const router = express.Router()
const auth = require('../middlewares/jwt')

router.get('/', (req,res) => {
    res.send(req.user)
})

module.exports = router