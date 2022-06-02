const User = require('./User');
const Rider = require('./Rider');
const Driver = require('./User');

// We can also define the association starting with License
User.belongsTo(Driver, Rider, {
  foreignKey: 'user_id',
});

Driver.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Rider,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'requested_rides'
});

Rider.belongsToMany(Driver, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Rider,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'scheduled_rides'
});

module.exports = { User, Driver, Rider };
