const { User, Thought} = require('../models');


// Aggregate function to get the number of students overall
const userController = {
 //Get all users
  getAllUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users
         };
        return res.json(userObj);
      }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

getSingleUser({ params}, res) {
    User.findOne({_id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(user => {
            if(!user) {
                res.status(404).json({ message: 'No User found with this id!'});
                return; 
            }
            res.json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
   },


  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },


  // Find user and update
  updateUser({ params, body}, res) {
    User.findOneAndUpdate({ _id: params.id}, 
        body,{ new: true, runValidators: true })
        .then(user => {
            if(!user) {
                res.status(404).json({ message: 'No User found with the id you\'ve entered!'});
                return;
            }
            res.json(user);
        })
        .catch(err => res.status(400).json(err))
},


//delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(user => {
                if(!user) {
                    res.status(404).json({ message: 'No User found with the id you\'ve entered!'});
                    return;
                }
                res.json(user);
            })
            .catch(err => res.status(400).json(err));
    },

        // Adding friend to friend's list 
        addFriend({ params }, res) {
            User.findOneAndUpdate(
                { _id: params.id },
                { $push: { friends: params.friendId }},
                { new: true, runValidators: true }
            )
            .populate({
                path: 'friends',
                select: ('-__v')
            })
            .select('-__v')
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'No User found with the id you\'ve entered!' });
                    return;
                }
                res.json(user);
                })
                .catch(err => res.json(err));
            
        },


  // Delete a friend 
   removeFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.id }, 
        { $pull: { friends: params.friendId }},
        { new: true }
    )
    .populate({
        path: 'friends', 
        select: '-__v'
    })
    .select('-__v')
    .then(user => {
        if(!user) {
            res.status(404).json({ message: 'No User found with the id you\'ve entered!'});
            return;
        }
        res.json(user);
    })
    .catch(err => res.status(400).json(err));
}
};





    module.exports = userController; 



 
