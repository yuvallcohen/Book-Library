// ייבוא המודל של ההזמנה ממסד הנתונים
const Order = require('../models/orderModel');

// פונקציה ליצירת הזמנה חדשה (תטופל על ידי ראוטר)
const createOrder = async (req, res) => {
  try {
    // חילוץ הנתונים שנשלחו מהלקוח מתוך גוף הבקשה
    const { items, customer, shippingMethod, totalPaid } = req.body;

    // בדיקה אם קיימים פריטים בהזמנה - אם לא, מחזירים שגיאה 400
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items in the order' });
    }

    // יצירת מופע חדש של הזמנה עם הנתונים מהלקוח
    const order = new Order({
      items,
      customer,
      shippingMethod,
      totalPaid
    });

    // שמירה של ההזמנה במסד הנתונים
    await order.save();

    // החזרת תגובת הצלחה עם סטטוס 201 וההזמנה שנשמרה
    res.status(201).json(order);
  } catch (err) {
    // במקרה של שגיאת שרת - הדפסת השגיאה ושליחת תגובת שגיאה כללית
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ייצוא הפונקציה לשימוש בקבצים אחרים (למשל בקובץ הראוטר)
module.exports = {
  createOrder
};
