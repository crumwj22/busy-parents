const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoute");
const dashboardRoute = require("./dashboardRoute");
const addDriverRoute = require("./driverRoutes");

router.use("/users", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);
router.use("/dashboard", dashboardRoute);
router.use("/driver", addDriverRoute);

module.exports = router;
