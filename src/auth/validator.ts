import { body } from 'express-validator';

export const signupBodyValidator = (
    [
        body("email").isEmail().withMessage("Expects parameter email in post body in correct email format"),
        body("password").isString().withMessage("Expects parameter password in post body, in string format"),
        body("repPassword").isString().withMessage("Expects parameter repPassword in post body, in string format").custom((value, { req }) => {
            if (value !== req.body?.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
    ]
)

export const loginBodyValidator = (
    [
        body("email").isEmail().withMessage("Expects parameter email in post body in correct email format"),
        body("password").isString().withMessage("Expects parameter password in post body, in string format"),
    ]
);