import Joi from "joi";

const schema = Joi.object({
    firstName: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/))
    .message("Please enter a valid name"),

     lastName: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/))
    .message("Please enter a valid name"),

});

export default schema;