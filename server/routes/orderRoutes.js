const express = require('express');
const router = express.Router();

// ייבוא הפונקציה מה-controller
const { createOrder } = require('../controllers/orderController');

// נתיב POST ליצירת הזמנה חדשה
router.post('/', createOrder);

// ניתן להוסיף נתיבים נוספים בעתיד (כמו GET, DELETE וכו')

module.exports = router;