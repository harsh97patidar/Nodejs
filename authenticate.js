require('dotenv').config()
const jwt = require('jsonwebtoken')

// res.sendStatus(200); // equivalent to res.status(200).send('OK')
// res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
// res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
// res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')

const authenticateToken = (req,res,next)=>{
const authHeader  = req.headers['authorization']

const token = authHeader && authHeader.split(' ')[1]

if(token==null || !token) return res.sendStatus(401)

jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,_)=>{

    if(err){
        return res.sendStatus(403)
    }
    next()
   })


}


module.exports =  authenticateToken