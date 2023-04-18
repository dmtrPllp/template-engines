const fs = require('fs');

class PhonebookService {
    constructor() {
        this.data = JSON.parse(fs.readFileSync('dictionary.json'));
    }

    getAll() {
        return this.data.contacts;
    }

    getOne(id) {
        return this.data.contacts.find(contact => contact.id === id);
    }

    create(contact) {
        const newId = this.data.contacts.reduce((maxId, contact) => Math.max(maxId, contact.id), 0) + 1;
        const newContact = { ...contact, id: newId };
        this.data.contacts.push(newContact);
        fs.writeFileSync('dictionary.json', JSON.stringify(this.data));
        return newContact;
    }

    update(id, newContact) {
        const index = this.data.contacts.findIndex(contact => contact.id === id);
        if (index !== -1) {
            this.data.contacts[index] = { ...newContact, id };
            fs.writeFileSync('dictionary.json', JSON.stringify(this.data));
            return this.data.contacts[index];
        } else {
            return null;
        }
    }

    delete(id) {
        const index = this.data.contacts.findIndex(contact => contact.id === id);
        if (index !== -1) {
            const deletedContact = this.data.contacts.splice(index, 1);
            fs.writeFileSync('dictionary.json', JSON.stringify(this.data));
            return deletedContact[0];
        } else {
            return null;
        }
    }
}

module.exports = new PhonebookService();
