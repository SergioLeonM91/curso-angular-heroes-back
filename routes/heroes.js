const { Router } = require('express');
const { check } = require('express-validator');
const { 
    listing,
    add,
    edit,
    search,
    show,
    deleteHero
} = require('../controllers');
const { 
    validateFields
} = require('../middlewares');

const router = Router();

router.get( '/listing', listing );

router.post('/add', [
    check('hero', 'superhero is required').not().isEmpty(),
    // check('publisher', 'publisher is required').not().isEmpty(),
    // check('alter_ego', 'alter ego is required').not().isEmpty(),
    // check('first_appearance', 'first appearance is required').not().isEmpty(),
    // check('characters', 'characters is required').not().isEmpty(),
    validateFields
], add);

router.put('/edit/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check('hero', 'superhero is required').not().isEmpty(),
    validateFields
], edit);

router.post('/search', search);

router.get('/show/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    validateFields
], show);

router.delete('/delete/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    validateFields
], deleteHero);

module.exports = router;