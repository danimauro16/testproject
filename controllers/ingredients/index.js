const { Router, response } = require('express');
const router = Router();
const { check } = require('express-validator');

const { add, update, getAll } = require('../../services/ingredients/ingredient_services');

const { validateFields } = require('../../core/middlewares/validate_fields');

const createIngredient = (req, res = response) => {
    try {
        const { name, description } = req.body;
        const ingredientAdded = add({ name, description });
        res.status(201).json({
            ok: true,
            uid: ingredientAdded.id,
            name: ingredientAdded.name
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }
};

const updateIngredient = (req, res = response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const ingredientUpdated = update({ id, name, description });
        res.status(200).json({
            ok: true,
            uid: ingredientUpdated.id,
            name: ingredientUpdated.name
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }
};

const getAllIngredient = (req, res = response) => {
    try {
        const ingredients = getAll();
        res.status(200).json({
            ok: true,
            ingredients
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }
};

router.post(
    '/new', 
    [
        check('name', 'Title is required').trim().not().isEmpty(),
        check('description', 'Description is required').trim().not().isEmpty(),
        validateFields
    ],  
    createIngredient
);

router.patch(
    '/update/:id', 
    [
        check('name', 'Name is required').trim().not().isEmpty(),
        validateFields
    ],  
    updateIngredient
);

router.get(
    '/', 
    getAllIngredient
);

module.exports = router;
