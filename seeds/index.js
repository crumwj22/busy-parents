const sequelize = require('../config/connection');
const { Driver, Comment, Rider, User } = require('../models');

const userData = require('./userData.json');
const riderData = require('./rider.json');
const driverData = require('./driver.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Driver.bulkCreate(driverData, {
    individualHooks: true,
    returning: true,
  });
  await Rider.bulkCreate(riderData, {
    individualHooks: true,
    returning: true,
  });
  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  console.log('\n----- POST Added! -----\n');


  process.exit(0);
};

seedDatabase();
//activity 23
