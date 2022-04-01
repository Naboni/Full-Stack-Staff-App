import { body } from "express-validator";

class UserValidator {
  checkCreateUser() {
    return [
      body("name").notEmpty().withMessage("The name value should not be empty"),
      body("email").isEmail().withMessage("The value should be an email"),
      body("age")
        .optional()
        .isInt()
        .withMessage("The value should be a number"),
    ];
  }
}

export default new UserValidator();
