const { Schema, model, Types } = require('mongoose');
const reactionSchema = require("./Reaction");
const moment = require('moment');

// Schema to create User model
const thoughtSchema = new Schema(
  {

    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    //need to review this ...
    createdAt: {
        type: Date,
        default: Date.now,
        get: (v) => moment(v).format('MMM DD, YYYY [at] hh:mm a')
      },
    username: {
      type: String,
      required: true,
    },    

    reactions: [reactionSchema],

  },

  {
    toJSON: {
      virtuals: true, 
      getters: true,
    },
    id: false
  }
);



thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});



const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

