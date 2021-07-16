const express = require('express');
const bcrypt = require('bcryptjs');

const JsonModel = require('../../models/jsonModel');
const { generateJWT } = require('../../core/helpers/jwt');

const usersModel = new JsonModel('users');

const encryptPassword = (password) =>  {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

const addUser = async (user) => {
    const { password, email } = user
    const userFound = usersModel.findByField('email', email);

    if (!userFound) {
        user.password = encryptPassword(password);
        const userAdded = usersModel.save(user);
        const token = await generateJWT(userAdded.id, userAdded.name);
        return { ...userAdded, token }
    } else {
        throw new Error('User already exist');
    }
};

const authUser = async ({ email, password }) => {
    const userFound = usersModel.findByField('email', email);
    if (!userFound) throw new Error('User does not exist');
    const validPassword = bcrypt.compareSync(password, userFound.password);
    if (!validPassword) throw new Error('User or password incorrects');
    const token = await generateJWT(userFound.id, userFound.name);
    return { ...userFound, token }
};

const renewUserToken = async (uid, name) => {
    return generateJWT(uid, name);
};

module.exports = {
    addUser, 
    authUser,
    renewUserToken
}