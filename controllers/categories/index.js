const { Router, response } = require('express');
const router = Router();
const { check } = require('express-validator');

const { add, update, getAll } = require('../../services/category');

const { validateFields } = require('../../core/middlewares/validate_fields');

const createCategory = (req, res = response) => {
  try {
    const { name, description } = req.body;
    const categoryAdded = add({ name, description });
    res.status(201).json({
      ok: true,
      uid: categoryAdded.id,
      name: categoryAdded.name,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Server error',
    });
  }
};

const updateCategory = (req, res = response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const categoryUpdated = update({ id, name, description });
    res.status(200).json({
      ok: true,
      uid: categoryUpdated.id,
      name: categoryUpdated.name,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Server error',
    });
  }
};

const getAllCategory = (req, res = response) => {
  try {
    const categories = getAll();
    res.status(200).json({
      ok: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Server error',
    });
  }
};

router.post(
  '/new',
  [
    check('name', 'Title is required').trim().not().isEmpty(),
    check('description', 'Description is required').trim().not().isEmpty(),
    validateFields,
  ],
  createCategory
);

router.patch(
  '/update/:id',
  [check('name', 'Name is required').trim().not().isEmpty(), validateFields],
  updateCategory
);

router.get('/', getAllCategory);

module.exports = router;
