const User = require('./User');
const Rider = require('./Rider');
const Driver = require('./User');

User.hasMany(Rider, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Driver.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Driver, Rider };
