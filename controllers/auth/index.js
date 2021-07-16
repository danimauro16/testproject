const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { addUser, authUser, renewUserToken } = require('../../services/users/user_services');

const { validateFields } = require('../../core/middlewares/validate_fields');
const { validateJWT } = require('../../core/middlewares/validate_jwt');
 
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await addUser({ name, email, password });
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: user.token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'User already exist'
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authUser({ email, password });
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: user.token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'User or password incorrects'
        });
    }
};

const renewToken = async (req, res) => {
    const { uid, name } = req;
    const token = await renewUserToken(uid, name);
    res.json({
        ok: true,
        token
    });
};

router.post(
    '/new', 
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
        validateFields
    ],  
    createUser
);

router.post(
    '/', 
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
        validateFields
    ],  
    loginUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;