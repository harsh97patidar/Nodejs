const express = require('express')
require('dotenv').config()
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

app.post('/login',(req,res)=>{

    const userName = req.body.userName
    const token = generateAuthToken({userName:userName})
    res.status(200).json({accessToken:token})
})

const generateAuthToken = (data)=>{
    return jwt.sign(data,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '20s'})
}

app.listen(process.env.AUTH_PORT)