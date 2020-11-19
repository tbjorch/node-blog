import { body } from 'express-validator';

export const postBodyValidator = () => {
    return [
        body("title").exists().isString().withMessage("Expects parameter title in post body in string format"),
        body("body").exists().isString().withMessage("Expects parameter body in post body, in string format"),
        body("author").exists().isString().withMessage("Expects parameter author in post body, in string format"),
    ]
}