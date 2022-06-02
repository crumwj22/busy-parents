const User = require('./User');
const Rider = require('./Rider');
const Driver = require('./User');

Driver.hasOne(User, {
  // Define the third table needed to store the foreign keys
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.belongsTo(Driver, {
  foreignKey: 'user_id',
});

Driver.hasMany(Rider, {
  // Define the third table needed to store the foreign keys
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Rider.belongsTo(Driver, {
  foreignKey: 'user_id',
});

module.exports = { User, Driver, Rider };
