const express = require('express');
const JsonModel = require('../../models/jsonModel');

const recipeModel = new JsonModel('recipes');

const add = (recipie) => {
    const { title, description, preparation } = recipie;
    const recipe = {
        title, description, 
        preparation, ingredients: [], 
        categories: [], images: [], score: 0,
        updatedAt: new Date()
    }
    return recipeModel.save(recipe);
};


const addIngredientsToRecipe = (id, ingredients) => {
    const recipe = recipeModel.find(id);
    ingredients.forEach(ingredient => recipe.ingredients.push(ingredient));
    return recipeModel.update(recipe);
};

const addCategoriesToRecipe = (id, categories) => {
    const recipe = recipeModel.find(id);
    categories.forEach(category => recipe.categories.push(category));
    return recipeModel.update(recipe);
};

const addImage = (id, img) => {
    const imgName = `${new Date().getMilliseconds()}_${img.name}`;
    const imgPath = './assets';
    img.mv(`${imgPath}/${imgName}`, err => {
        if(err) throw new Error('Error saving image');
    });
    const recipe = recipeModel.find(id);
    recipe.images.push(imgName)
    return recipeModel.update(recipe);
};

module.exports = {
    add,
    addImage,
    addIngredientsToRecipe,
    addCategoriesToRecipe
};
