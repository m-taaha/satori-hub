//validating
const validate = (schema) => async (req, res, next) => {
    try{

        const validation = await schema.safeParseAsync(req.body);  //use safeParseSync for async schmas if needed

        if(!validation.success){
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        //if validation is successful , attach the clean data to req
        req.body = validation.data;
        next(); //move on to the next funtion .... to the (controllers)
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: `Server Error`
        })
    }
}

export default validate;