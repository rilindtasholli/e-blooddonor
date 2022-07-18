import Joi from "joi";

const schema = Joi.object({
  firstName: Joi.string().min(2).messages({
    "string.empty": "Please enter first name",
    "string.min": "First name should contain at least 2 characters",
 
  }),

   lastName: Joi.string().min(2).messages({
    "string.empty": "Please enter last name",
    "string.min": "Last name should contain at least 2 characters",
  }),

  email: Joi.string()
    .email({ tlds: { allow: ['com', 'net'] } })
    .messages({
      "string.email": "Email is invalid",
      'string.empty': "Please enter email"
    }),

    password: Joi.string()
    .min(8)
    .messages({
      'string.empty': "Please enter password",
      "string.min": "Password should contain at least 8 characters"
    }),

    confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .messages({
      'string.empty': "Please enter password",
      "string.min": "Password should match first password"
    }),

    location: Joi.string()
    .valid(
      "Prishtinë",
      "Mitrovicë",
      "Pejë",
      "Prizren",
      "Ferizaj",
      "Gjilan",
      "Gjakovë"
    )
    .error(new Error("Invalid Location name")),

    bloodType: Joi.string()
    .valid("O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-")
    .error(new Error("Invalid blood type")),
     
  });


export default schema;
