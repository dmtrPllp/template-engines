const express = require('express');
const phonebookController = require('../module/phonebook.controller');

const router = express.Router();

router.get('/', phonebookController.getAll);

router.get('/add', phonebookController.getAddContactForm);

router.get('/update', phonebookController.getUpdateContactForm);

router.post('/add', phonebookController.addContact);

router.put('/update/:id', phonebookController.updateContact);

router.delete('/delete/:id', phonebookController.deleteContact);

module.exports = router;