import { ContextRunner } from 'express-validator';
import express from 'express';

const validate = (validations: ContextRunner[]) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        for (const validation of validations) {
            const result = (await validation.run(req)).formatWith(({msg}) => {return msg;});
            if (!result.isEmpty()) {
                return res.status(400).json({ 
                    result : false,
                    status : "warning",
                    data: null,
                    msg: result.array()[0] 
                });
            }
        }
        next();
    };
};

export default validate;