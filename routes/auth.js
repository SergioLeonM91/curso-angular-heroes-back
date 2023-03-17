const { Router } = require('express');
const { check } = require('express-validator');

const { 
    login,
    register
} = require('../controllers');
const { validateFields } = require('../middlewares');

const router = Router();

router.get( '/user/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    validateFields
], login );

router.post('/register', register);

module.exports = router;