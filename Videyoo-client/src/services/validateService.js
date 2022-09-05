import Joi from "joi-browser";

export const videoValidation =()=>{
    return {
    title: Joi.string().min(2).max(256).required().label("Title"),   
    description: Joi.string().min(2).max(1024).required().label("Description")
  };
}

export const userValidation = (schema)=>{
    schema = {
    name: Joi.string().min(2).max(256).required().label("Name"),
    email: Joi.string().min(2).max(256).required().label("Email"),
    url: Joi.string().min(10).max(1024).required().label("Url"),
    password: Joi.string().required().min(6).label("Password"),   
  };
  return schema;
}



