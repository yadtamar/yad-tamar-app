const validation = ((schema) => {
   return async (req, res, next) => {
       try{
            const validatBody = await schema.validate(req.body)
            req.body = validatBody;
            console.log(validatBody)
            next();
       }catch(err){

       }
   }
})

module.exports = validation