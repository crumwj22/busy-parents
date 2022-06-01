const sequelize = require('../config/connection');
const { User } = require('../models');
const { Comment } = require('../models');
const { Blog } = require('../models');

const blogData = require('./blogPostData.json');
const commentData = require('./commentData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Blog.bulkCreate(blogData,
    {
      individualHooks: true,
      returning: true,
    });

  console.log('\n----- POST Added! -----\n');

  await commentData();
  console.log('\n----- COMMENT Added! -----\n');

  process.exit(0);
};

seedDatabase();
