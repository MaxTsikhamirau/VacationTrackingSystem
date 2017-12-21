const Joi = require('joi');

const addEmployee = {
  body: {
    id: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    groups: Joi.array()
  }
};

const updateEmployee = {
  params: {
    id: Joi.string().required()
  },
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    groups: Joi.array()
  }
};

const removeEmployee = {
  params: {
    id: Joi.string().required()
  }
};

module.exports = {
  addEmployee,
  updateEmployee,
  removeEmployee
};
