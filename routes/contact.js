const {User, Contact} = require("../models");
const StatusCode = require("../utils/statusCode");
const ResultCode = require("../utils/resultCode");


module.exports = function(app) {
    // 모든 연락처를 조회
    app.get('/contact/:userId', async (req, res) => {
        const contactData = await User.findOne({ id: req.params.userId })
            .populate("contacts")
            .exec()
        
        return res.status(StatusCode.OK).json(contactData.contacts)
    })

    // 연락처 추가
    app.post('/contact/insert/:userId', (req, res) => {
        let contact = new Contact()
        contact.fullName = req.body.fullName
        contact.phone = req.body.phone
        contact.personId = req.body.personId
        contact.image = req.body.image

        // Save content and Send response to clien0t

        contact
            .save()
            .then(() =>
                User.updateOne(
                    { id: req.params.userId },
                    { $addToSet: { contacts: [contact._id] } }
                ).exec()
            )
            .then(() => res.redirect(`/contact/${req.params.userId}`))
            .catch((reason) =>
                res.status(StatusCode.InternalServerError).send(reason)
            );
    })
}