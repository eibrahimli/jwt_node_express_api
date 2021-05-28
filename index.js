const express = require('express')
const app = express()
const auth = require('./routes/auth')
const posts = require('./routes/posts')
const env = require('dotenv')
const mongoose = require('mongoose')
const checkAuth = require('./middlewares/jwt')

env.config()

// Middleware
app.use(express.json())


// Establish connection!
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connection established successfully')
    }
)

app.get('/api' , (req,res) => {
    res.send('Hey there')
})

app.use('/api/auth/', auth)
app.use('/api/posts/',checkAuth, posts)


app.listen(3000, () => {
    console.log('Here we start in port 3000')
})