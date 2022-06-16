const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");
// const { User } = require('../../models');

//Get Comments
router.get("/", (req, res) => {
  Comment.findAll({})
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET one Comment
router.get("/:id", (req, res) => {
  Comment.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// //Create a comment
// router.post('/', withAuth, (req, res) => {
//   // check the session
//   if (req.session) {
//     console.log(req.session);
//     Comment.create({
//       comment_text: req.body.comment_text,
//       driver_id: req.body.driver_id,
//       // use the id from the session
//       user_id: req.session.user_id,
//     })
//       .then((dbCommentData) => res.json(dbCommentData))
//       .catch((err) => {
//         console.log(err);
//         res.status(400).json(err);
//       });
//   }
// });

// create a new comment on a post
router.post("/", async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    req.body.post_id = Number(req.body.post_id);
    console.log(req.body);

    const commentData = await Comment.create(req.body);
    console.log("commentData", commentData);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete a Comment
router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
