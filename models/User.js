const { Schema, model} = require('mongoose');


//email regex variable
const regex = new RegExp('([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})')



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

    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        },
      ],

      friends: [
        {
            type: Schema.Types.ObjectId,
            // referring to the user document model 
            ref: 'User'
        }
        ]
    },

  {
    toJSON: {
      virtuals: true,
    //getters: true
    },
    id: false

  });



    userSchema.virtual('friendCount').get(function() {
        return this.friends.length;
    });


const User = model('User', userSchema);

module.exports = User;
