const router = require("express").Router();
const { Comment, Driver } = require("../../models");
const withAuth = require("../../utils/auth");
// const { User } = require('../../models');



// create a new comment on a post
router.post("/", async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    req.body.post_id = Number(req.body.post_id);
    console.log(req.body);

    const commentData = await Comment.create(req.body);

    Driver.update({
      comment: commentData.id
    }, {
      where: ({
        id: commentData.driver_id
      })
    }
    )

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
