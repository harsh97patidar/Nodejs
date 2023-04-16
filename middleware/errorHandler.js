const AppError = require('../AppError')

const errorHandler = (error,req,res,next)=>{

    if(error instanceof AppError){

      return res.status(error.errorStatus).json({errorCode: error.errorCode, errorMessage: error.errorMessage})
    }

    return res.status(500).send("Something went wrong")

}

module.exports = errorHandler