import { validationResult } from "express-validator"

const validator = async (req, res, next) => {
    /*const result = validationResult(req);
    if(result.isEmpty())
       return next();
    res.status(400).json({errors: result.array() });*/

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        return next();
    }
}

export default validator;