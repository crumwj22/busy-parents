const User = require('./User');
const Rider = require('./Rider');
const Driver = require('./Driver');
const Comment = require('./comment');

Driver.hasOne(User, {
  // Define the third table needed to store the foreign keys
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
User.belongsTo(Driver, {
  foreignKey: 'user_id',
});

Rider.hasOne(User, {
  // Define the third table needed to store the foreign keys
  foreignKey: 'user_id',
  // onDelete: 'CASCADE',
});
User.belongsTo(Rider, {
  foreignKey: 'user_id',
});

Driver.hasMany(Rider, {
  // Define the third table needed to store the foreign keys
  foreignKey: 'user_id',
  // onDelete: 'CASCADE',
});

Rider.belongsTo(Driver, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});
User.hasMany(Comment, {
  foreignKey: 'user_id'
});
Driver.hasMany(Comment, {
  foreignKey: 'user_id'
});

module.exports = { User, Driver, Rider };
