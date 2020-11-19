import { param } from "express-validator";
import { Types } from "mongoose";

export const objectIdParamValidator = () => {
    return [
        param("id").custom(value => {
            if (!Types.ObjectId.isValid(value)) {
                throw new Error("ID value is invalid");
            }
            return true;
        })
    ]
}