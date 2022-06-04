const router = require('express').Router();
const userRoutes = require('./userRoutes');
const driverRoutes = require('./driverRoutes');
// const riderRoutes = require('./riderRoutes');

router.use('/users', userRoutes);
router.use('/driver', driverRoutes);
// router.use('/rider', riderRoutes);

module.exports = router;
