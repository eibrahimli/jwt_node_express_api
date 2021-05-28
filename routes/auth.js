const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerValidation,createToken, checkToken } = require('../helpers/auth')
const User = require('../models/User')
const auth = require('../middlewares/jwt')

const router = express.Router()

const salt = 10

router.post('/register', async(req,res) => {
    const {error} = registerValidation(req.body)
    if(error) return res.status(422).send(error)
    
    const user = new User({
        name: req.body.name,
        password: await bcrypt.hash(req.body.password,salt),
        email: req.body.email
    })

    try{
        await user.save()
        
        let token = createToken(user)

        if(token) {
            return res.header('auth-token',token).status(200).send(token)
        } else {
            res.status(400).send({message: 'Token can not be created'})
        }
    }catch(err) {
        if(err.keyPattern.email && err.keyValue.email) {
            return res.status(400).send({ message: 'Email exists try another one' })
        }
        res.status(400).send(err)
    }

})

router.post('/login', async (req,res) => {
    // Take data from req
    let data = req.body

    // Check user exists in database    
    let find = await User.findOne({ email: data.email })
    
    if(!find) return res.status(400).send({ message: 'User not found' }) 

    let token = createToken(find)

    if(token) {
        res.status(200).send(token)
    } else {
        res.status(400).send({message: 'Token can not be created'})
    }


})

module.exports = router