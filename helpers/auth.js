const Joi = require('joi')
const jwt = require('jsonwebtoken')

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(8).max(255),
        email: Joi.string().email().required().min(6).max(255)
    })

    return schema.validate(data)
}

const createToken = (user) => {
    
    let token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET, { expiresIn: 20 })
    
    return token
}


module.exports.registerValidation = registerValidation
module.exports.createToken = createToken