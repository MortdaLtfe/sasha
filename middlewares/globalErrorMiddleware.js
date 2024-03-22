export default function(error,req,res, next){
  
  return res.status(error.statusCode).json(
    {
      message: error.message, 
      status: error.status, 
      error, 
      stack: error.stack
    })
}