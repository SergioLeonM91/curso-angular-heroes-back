const auth = require('../controllers/auth');
const heroes = require('../controllers/heroes');

module.exports = {
    ...auth,
    ...heroes
}