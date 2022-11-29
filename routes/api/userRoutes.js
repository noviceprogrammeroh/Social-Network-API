const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/')
.get(getAllUsers) //gets all users
.post(createUser);//creates a new user

// /api/users/:userId/
router
  .route('/:id')
  .put(updateUser)
  .get(getSingleUser)
  .delete(deleteUser);


// /api/users/:userId/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .put(addFriend)
    .delete(removeFriend)

module.exports = router;
