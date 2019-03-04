const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    createdAt:  { type: Date },
    updatedAt:  { type: Date },
    username:   { type: String, required: true },
    password:   { type: String, required: true },
    tags: [{ type: Schema.ObjectId, ref: 'tags' }],
    projects: [{ type: Schema.ObjectId, ref: "project" }],
})

// Must use function here! ES6 => functions do not bind this!
UserSchema.pre('save', function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
