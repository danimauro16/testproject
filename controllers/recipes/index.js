const { Router, response } = require('express');
const router = Router();
const { check } = require('express-validator');

const {
  add,
  addIngredientsToRecipe,
  addImage,
  addCategoriesToRecipe,
} = require('../../services/recipe');

const { validateFields } = require('../../core/middlewares/validate_fields');
const { validateFile } = require('../../core/middlewares/validate_file');

const createRecipe = (req, res = response) => {
  try {
    add(req.body);
    res.status(201).json({
      ok: true,
      msg: 'Recipe added',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Server error',
    });
  }
};

const addIngredients = (req, res = response) => {
  try {
    const { id } = req.params;
    const { ingredients } = req.body;
    addIngredientsToRecipe(id, ingredients);
    res.status(201).json({
      ok: true,
      msg: 'Ingredients added',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Server error',
    });
  }
};

const addCategories = (req, res = response) => {
  try {
    const { id } = req.params;
    const { categories } = req.body;
    addCategoriesToRecipe(id, categories);
    res.status(201).json({
      ok: true,
      msg: 'Categories added',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Server error',
    });
  }
};

const addImages = (req, res = response) => {
  try {
    const { id } = req.params;
    const { img } = req.files;
    addImage(id, img);
    res.status(201).json({
      ok: true,
      msg: 'Image added',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

router.post(
  '/new',
  [
    check('title', 'Title is required').trim().not().isEmpty(),
    check('description', 'Description is required').trim().not().isEmpty(),
    check('preparation', 'Preparation is required').trim().not().isEmpty(),
    validateFields,
  ],
  createRecipe
);

router.post(
  '/:id/add/ingredients',
  [
    check('ingredients', 'Ingregients is required').not().isEmpty(),
    validateFields,
  ],
  addIngredients
);

router.post(
  '/:id/add/categories',
  [
    check('categories', 'Categories is required').not().isEmpty(),
    validateFields,
  ],
  addCategories
);

router.post('/:id/add/images', validateFile, addImages);

module.exports = router;
