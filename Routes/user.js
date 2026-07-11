const espress = require('express');
const router = espress.Router();
const { signinUser, signupUser, getUser, updateUser, deleteUser, blockUser ,updatePassword } = require('../Controller/userController');


router.post('/signin', signinUser);
router.post('/signup', signupUser);
router.get('/', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/block/:id', blockUser);
router.put('/update-password/:id', updatePassword);

module.exports = router;