const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  addReaction,
  deleteThought,
  deleteReaction,

} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/')
.get(getAllThoughts); //gets all users

// /api/thoughts/:id
router
  .route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:userId
router.route('/:userId').post(createThought);


//reaction api
  router.route('/:thoughtId/reactions').post(addReaction);
  router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);


module.exports = router;
