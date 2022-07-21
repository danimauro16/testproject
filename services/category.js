const express = require('express');
const JsonModel = require('../models/jsonModel');

const categoryModel = new JsonModel('categories');

const add = (category) => {
  return categoryModel.save(category);
};

const update = (category) => {
  return categoryModel.update(category);
};

const getAll = () => {
  return categoryModel.all();
};

module.exports = {
  add,
  update,
  getAll,
};
