// DEFINE MODEL
var Contact = require('../models/contacts');
module.exports = function(app) {
    app.get('/test/contact/get', (req, res) => {
        Contact.find(function(err, contact){
            if(err) {
                console.error(err)
                res.status(500).json({result: 0})
                return
            }
            res.status(200).json(contact);
        })
    })
    app.post('/test/contact/insert', (req, res) => {
        // Init contact variable
        var contact = new Contact()
        contact.fullName = req.body.fullName
        contact.phone = req.body.phone
        contact.lookup = req.body.lookup
        contact.personId = req.body.personId
        contact.image = req.body.image
        // Save content and Send response to client
        contact.save(function(err){
            if(err) {
                console.error(err)
                res.status(500).json({result: 0})
                return
            }
            res.status(201).json({result: 1})
        })
        // json 내용 바꾸기
    })
}