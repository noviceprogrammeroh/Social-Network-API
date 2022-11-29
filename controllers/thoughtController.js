const { Thought, User } = require('../models');

module.exports = {
  // Get all courses
//   getAllThoughts(req, res) {
//     Thought.find()
//       .then((thoughts) => res.json(thoughts))
//       .catch((err) => res.status(500).json(err));
//   },

getAllThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },





  // Get a single thougth
  getSingleThought({params}, res) {
    Thought.findOne({ _id: params.id})
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thougth with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
        .then(thought => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        })
        .catch(err => res.status(400).json(err));
},
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id},
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No course with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


// // Create reaction
addReaction({ params, body}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body }}, 
        { new: true, runValidators: true }
    )
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => {
    if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
    }
    res.json(dbThoughtData);
})
.catch(err => res.status(400).json(err))

},


 deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId }, 
        { $pull: { reactions: { reactionId: params.reactionId }}},
        { new : true }
    )
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
}


}
