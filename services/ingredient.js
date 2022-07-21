const express = require('express');
const JsonModel = require('../models/jsonModel');

const ingredientModel = new JsonModel('ingredients');

const add = (ingredient) => {
  return ingredientModel.save(ingredient);
};

const update = (ingredient) => {
  return ingredientModel.update(ingredient);
};

const getAll = () => {
  return ingredientModel.all();
};

module.exports = {
  add,
  update,
  getAll,
};
