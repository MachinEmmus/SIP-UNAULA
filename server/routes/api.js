const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Encuesta = require('../models/Encuesta')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.get('/api', (req, res, next) => {
    // get placeholder
});

router.post('/register', async (req, res, next) => {
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
        console.log(err);
        res.json({ status: 'error', error: err })
    }
});

router.post('/login', async (req, res, next) => {
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

        const objectReturn = {
            userToken: token,
            userDocument: user.document,
        }

        return res.json({ status: 'ok', user: objectReturn })
    } else {
        return res.json({ status: 'error', user: false })
    }
});

router.post('/sendEncuesta', async (req, res, next) => {
    try {
        await Encuesta.findOneAndUpdate(
            { document: req.body.document, },
            {
                document: req.body.document,
                rol: req.body.rol,
                gender: req.body.gender,
                hadCovid: req.body.hadCovid,
                sintomas: req.body.sintomas,
                durationCovid: req.body.durationCovid,
                timesHimCovid: req.body.timesHimCovid,
                numberOfDosis: req.body.numberOfDosis,
                postCovdiEffect: req.body.postCovdiEffect,
            },
            { upsert: true }
        );
        res.json({ status: 'ok' });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', error: err })
    }
});

module.exports = router;