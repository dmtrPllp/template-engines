const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/add-user', userController.createUser);
router.put('/edit/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
