import Joi from "joi";

const schema = Joi.object({

  title: Joi.string().min(4).messages({
    "string.empty": "Please enter title",
    "string.min": "Title should contain at least 4 characters",
  }),
  description: Joi.string().min(4).messages({
    "string.empty": "Please enter description",
    "string.min": "Description should contain at least 4 characters",
  }),
  location: Joi.string().messages({
    "string.empty": "Please select a location"
  }),
  bloodtype: Joi.string().messages({
    "string.empty": "Please select a blood type"
  })
   
});

export default schema;
