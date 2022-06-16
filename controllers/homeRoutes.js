const router = require("express").Router();
const { Driver, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/signup", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    console.log("test");
    res.render("members");
  }
  res.render("signup");
});

router.get("/", async (req, res) => {
  // If the user already has an account send them to the members page
  console.log(req.session.user_id);
  if (req.session.user_id) {
    try {
      const dbDriverData = await Driver.findAll({});
      console.log(dbDriverData);
      // Serialize user data so templates can read it
      const posts = dbDriverData.map((driverpost) =>
        driverpost.get({ plain: true })
      );

      // Pass serialized data into Handlebars.js template
      console.log("test");
      res.render("members", { posts });
      return;
    } catch (err) {
      res.status(500).json(err);
    }
  }
  res.render("login");
});

router.post("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log("test1");
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  console.log("test");
  res.render("members");
});

// router.get("/my-account", async (req, res) => {
//   if (req.session.user_id) {
//     try {
//       const commentData = await Comment.findAll({});
//       const comments = commentData.map((comments) =>
//         comments.get({ plain: true })
//       );

//       res.render("my-account", { comments });
//       return;
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// });

// module.exports = router;
//HOMEPAGE
router.get("/", async (req, res) => {
  // If the user already has an account send them to the members page
  console.log(req.session.user_id);
  if (req.session.user_id) {
    try {
      const dbDriverData = await Driver.findAll({});
      console.log(dbDriverData);
      // Serialize user data so templates can read it
      const posts = dbDriverData.map((driverpost) =>
        driverpost.get({ plain: true })
      );

      // Pass serialized data into Handlebars.js template

      res.render("members", { posts });
      return;
    } catch (err) {
      res.status(500).json(err);
    }
  }
  res.render("login");
});

router.get("/newpost", (req, res) => {
  res.render("my-account", { logged_in: req.session.logged_in });
});

router.get("/singlepost/:id", async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        include: [User],
      },
    ],
  });

  const post = postData.get({ plain: true });
  const comments = post.comments;
  res.render("singlePost", {
    post,
    comments,
    logged_in: req.session.logged_in,
  });
});

// add driver to my account
// router.get("/my-account", async (req, res) => {
//   // if (req.session.user_id) {
//   // const driverData = await Driver.findAll({});
//   // const drivers = driverData.map((driver) => driver.get({ plain: true }));
//   try {
//     const driverData = await Driver.findAll({});
//     const drivers = driverData.map((driver) => driver.get({ plain: true }));
//     console.log(drivers, "this is a test");
//     res.render("my-account", { drivers });
//   } catch (err) {
//     res.status(500).json(err);
//   }
//   // }
// });

router.get("/my-account", (req, res) => {
  console.log("hello");
  Driver.findAll({})
    .then((dbDriverData) => {
      const drivers = dbDriverData.map((driver) => driver.get({ plain: true }));
      console.log(drivers);
      res.render("my-account", {
        drivers,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
