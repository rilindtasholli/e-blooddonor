import Joi from "joi";

const schema = Joi.object({
   

 firstName: Joi.string().min(2).messages({
    "string.empty": "Please enter title",
    "string.min": "First name should contain at least 2 characters",
 
  }),

   lastName: Joi.string().min(2).messages({
    "string.empty": "Please enter title",
    "string.min": "Last name should contain at least 2 characters",
  }),

});

export default schema;