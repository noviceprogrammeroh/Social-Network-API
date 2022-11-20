const { Schema, Types, default: mongoose, Mongoose } = require('mongoose');
const userSchema = require('./User');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    //need to review this ...
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    //arrays of _ids, referencing the Thought and User models
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reactionSchema',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per user
// Create a virtual property `commentCount` that gets the amount of comments per post
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const reactionSchema = new Schema(
  {
    reactionId: {
      // * Use Mongoose's ObjectId data type
      // * Default value is set to a new ObjectId
      type: Schema.Types.ObjectId,
      default: new ObjectId(),
    },
    //need to review this ...
    reactionBody: {
      type: String,
      require: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
