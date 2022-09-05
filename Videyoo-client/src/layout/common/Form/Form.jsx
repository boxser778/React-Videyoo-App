import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Textarea from "./Textarea";

class Form extends Component {
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        autoComplete="off"
      />
    );
  }

  handleChange = ({ currentTarget: { name, value } }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty({ name, value });
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data, errors });
  };

  renderTextarea(name, label) {
    const { data, errors } = this.state;
    return (
      <Textarea
        label={label}
        name={name}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
        className="form-control"
        autoComplete="off"
        cols="30"
        rows="5"
      />
    );
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  renderButton(btnText) {
    return (
      <button disabled={this.validate()} className="btn-login mt-2 col-12">
        {btnText}
      </button>
    );
  }

  validate = () => {
    const data = { ...this.state.data };
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
}

export default Form;
