const createPath = require('../helpers/create-path');
const phonebookService = require('./phonebook.service');

class PhonebookController {
    getAll(req, res) {
        const contacts = phonebookService.getAll();

        res.render(createPath('index'), { contacts, req, title: 'Home', helpers: { refuse: () => '/' }, layout: './layout/page' });
    }

    getAddContactForm(req, res) {
        const contacts = phonebookService.getAll();

        console.log(req.url);

        res.render(createPath('index'), { contacts, req, title: 'Home', helpers: { refuse: () => '/' }, layout: './layout/page' });
    }

    addContact(req, res) {
        const { fullName, phoneNumber } = req.body;

        console.log(req.body);

        phonebookService.create({ name: fullName, contact: phoneNumber });

        const contacts = phonebookService.getAll();

        console.log(contacts);

        res.render(createPath('index'), { contacts, req, title: 'Home', helpers: { refuse: () => '/' }, layout: './layout/page' });
    }

    getUpdateContactForm(req, res) {
        const { id, name, contact } = req.query;

        const contactInfo = {
            id,
            name,
            contact
        };

        res.json(contactInfo);
    }


    updateContact(req, res) {
        const { updName, contact } = req.body;
        const id = +decodeURIComponent(req.params.id);

        console.log(req.body);

        phonebookService.update(id, { name: updName, contact });

        const contacts = phonebookService.getAll();

        console.log(contacts);

        res.render(createPath('index'), {
            contacts, req, title: 'Home', helpers: { refuse: () => '/' }, layout: './layout/page'
        });
    }

    deleteContact(req, res) {
        const id = +decodeURIComponent(req.params.id);

        phonebookService.delete(id);

        const contacts = phonebookService.getAll();

        res.render(createPath('index'), {
            contacts, req, title: 'Home', helpers: { refuse: () => '/' }, layout: './layout/page'
        });
    }
}

module.exports = new PhonebookController();