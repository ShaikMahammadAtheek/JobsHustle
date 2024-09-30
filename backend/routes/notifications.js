const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get all notifications
router.get('/', async (req, res) => {
    try {
      const notifications = await Notification.find();
    res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

// Get all notifications
//router.route('/').get((req, res) => {
//    Notification.find()
//        .then(notifications => res.json(notifications))
//        .catch(err => res.status(400).json('Error: ' + err));
//});

// Add a new notification
router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const category = req.body.category;

    const newNotification = new Notification({ title, content, category });

    newNotification.save()
        .then(() => res.json('Notification added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
