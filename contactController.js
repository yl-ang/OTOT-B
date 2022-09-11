const { json } = require('body-parser');

// Import contact model
Contact = require('./contactModel');

// Handle index actions (retrieve)
exports.index = function (req, res) {
    Contact.get(function (err, contacts)  {
        if (err) {
            return res.status(500).json({message: 'Failed to retrieve contacts'})
        }
        res.json({
            status: "success",
            message: "contacts retrieved successfully",
            data: contacts
        });
    });
};

// Handles create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

    contact.save(function (err) {
        if (err) {
            return res.status(500).json({message: 'Failed to save new contact'})
        }

        res.json({
            message: "New contact created!",
            data: contact
        });
    });
};

// Handles view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            return res.status(500).json({message: 'Failed to view contact'})
        }
        res.json({
            message: 'contact details loading ...',
            data: contact
        })
    });
};

// Handle update contact info
exports.update = function (req, res) {

    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            return res.status(500).json({message: 'Failed to update contact'})
        }
        
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender ? req.body.gender : contact.gender;
        contact.email = req.body.email ? req.body.email :  contact.email;
        contact.phone = req.body.phone ? req.body.phone :  contact.phone;

        contact.save( function (err) {
            if (err) res.json(err);

            res.json({
                message: "Contact Info updated",
                data: contact
            });
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({ _id: req.params.contact_id}, function (err, contact) {
        if (err) {
            return res.status(500).json({message: 'Failed to delete contacts'})
        }
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};
