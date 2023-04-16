const express = require('express')
const dotenv = require('dotenv')
const client = require('./database')
const errorHandler = require('./middleware/errorHandler')
const authenticateToken = require('./authenticate')
const bodyParser = require("body-parser")
const AppError = require('./AppError')
const cors = require('cors')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config()

// CORS is enabled for the selected origins
let corsOptions = {
    origin: [ 'http://localhost:8080', 'http://localhost:3000' ]
};

app.use(cors());

app.options('*', cors());

// app.use((req, res, next) => {
//     //allow access from every, elminate CORS
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.removeHeader('x-powered-by');
//     //set the allowed HTTP methods to be requested
//     res.setHeader('Access-Control-Allow-Methods','POST');
//     //headers clients can use in their requests
//     res.setHeader('Access-Control-Allow-Headers','Content-Type');
//     //allow request to continue and be handled by routes
//     next();
//   })

// app.use(cors({origin: "http://localhost:8080"}))

    app.get('/',(req,res)=>{
        res.send("Hi")
    })

    app.get('/posts',authenticateToken,async(req,res)=>{

        console.log(('This is the "/" route.'))

        try{

            const results = await client.query(`Select * from post`)
            res.status(200).json({
                status: "success",
                data: {
                  posts: results.rows,
                },
              });

        }catch(e){
            console.log(e)
        }

    })

    app.post('/post',(req,res,next)=>{

        const {id,title,body} = req?.body

        const sqlQuery = `INSERT INTO post (title, body) VALUES ('${title}', '${body}')`

        return client.query(sqlQuery).then((t)=> { 
            res.status(200).json(req.body)
           }).catch((error)=> {
            console.log("error>",error.message)
                 next(error)                
            })
    })

    app.post('/post/:id/comment',async (req,res,next)=>{

        const {message ,userId ,parentId, id } = req.body

        const {id:postId} = req.params
   
        const sqlQuery = `Insert INTO comment (message, "userId", "parentId", id, "postId", "updatedAt") VALUES ('${message}','${userId}','${parentId}','${id}','${postId}', NOW())`
        console.log("sql query",sqlQuery)

        try{
        const results = await client.query(sqlQuery)

        res.status(201).json({comment: req.body})

        }catch(error){
            console.log("error>",error.message)
            next(error)    
        }
    })
   
    
    app.put('/post/:id/comment/:commentId',async(req,res,next)=>{

        const {message} = req.body

        const {id:postId,commentId} = req.params

        const sqlQuery = `UPDATE comment SET message='${message}' WHERE id='${commentId}'`

        try{
         const results = await client.query(sqlQuery)
         res.status(201).json({comment: req.body})
        }catch(error){
            next(error)
        }
    })

    app.delete('/post/:id/comment/:commentId', async (req,res,next)=>{

        const {commentId} = req.params

        const sqlQuery = `DELETE FROM comment WHERE id='${commentId}'`

        try{
           
            const results = await client.query(sqlQuery)
           res.status(201).json({message: "Deleted"})

        }catch(error){
            console.log("error",error.message)
            next(error)
        }
        
    })

    app.use(errorHandler)
    app.listen({ port: process.env.PORT })