const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.post('/todos', (req, res, next) => {
    if (req.body.action) {
        Todo.create(req.body)
            .then((data) => res.json(data))
            .catch(next);
    } else {
        res.json({
            error: 'The input field is empty',
        });
    }
});


module.exports = router;