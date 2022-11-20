const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
//email regex variable
const regex = '^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$';

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (emailValue) {
          return regex.test(emailValue);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    //arrays of _ids, referencing the Thought and User models
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
