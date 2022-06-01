const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/api/register', async (req, res, next) => {
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            documentType: req.body.documentType,
            document: req.body.document,
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            firstLastName: req.body.firstLastName,
            secondLastName: req.body.secondLastName,
            dateBirth: req.body.dateBirth,
            email: req.body.email,
            password: newPassword,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: err })
    }
});

router.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    if (!user) {
        return { status: 'error', error: 'Invalid login' }
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'secret123'
        )

        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})


module.exports = router;