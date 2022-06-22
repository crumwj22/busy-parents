const sequelize = require('../config/connection');
<<<<<<< HEAD
const { User } = require('../models');
const { Rider } = require('../models');
const { Driver, Comment } = require('../models');
=======
const { Driver, Comment, Rider, User } = require('../models');
>>>>>>> ffa37bed7b2c142a55b2758807d3b0b07d223811

const userData = require('./userData.json');
const riderData = require('./rider.json');
const driverData = require('./driver.json');
const commentData = require('./commentData.json');
<<<<<<< HEAD

=======
>>>>>>> ffa37bed7b2c142a55b2758807d3b0b07d223811

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
