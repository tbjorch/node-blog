import { body, param } from 'express-validator';
import { Types } from 'mongoose';
import { BadRequest } from '../utils/errors/http';

export const userBodyValidator = () => {
    return [
        body("username").isString().withMessage("Expects parameter username in post body in string format"),
        body("password").isString().withMessage("Expects parameter password in post body, in string format"),
        body("repPassword").isString().withMessage("Expects parameter repPassword in post body, in string format").custom((value, { req }) => {
            if (value !== req.body?.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
    ]
}
