const mongoose = require('mongoose');

// הגדרת סכמת הנתונים להזמנות במסד הנתונים MongoDB באמצעות Mongoose
const orderSchema = new mongoose.Schema({
  // מערך פריטים שהוזמנו בעגלה
  items: [
    {
      title: String,     // שם הספר או הפריט שהוזמן
      price: Number,     // מחיר ליחידה של הפריט
      quantity: Number,  // כמות הפריטים שנבחרה
    }
  ],
  // פרטי הלקוח שהזמין
  customer: {
    fullName: String,  // שם מלא של הלקוח
    phone: String,     // מספר טלפון ליצירת קשר
    email: String,     // כתובת דוא"ל של הלקוח
    address: {         // כתובת למשלוח (יכולה להיות ריקה אם למשלוח עצמי)
      street: String,  // רחוב
      city: String,    // עיר
      zip: String,     // מיקוד
    }
  },
  shippingMethod: String,  // שיטת המשלוח, לדוגמה "איסוף עצמי - סניף תל אביב"
  orderType: String,       // סוג ההזמנה, לדוגמה "איסוף עצמי" או "משלוח"
  totalPaid: Number,       // הסכום הכולל ששולם עבור ההזמנה
}, {
  timestamps: true  // מוסיף שדות createdAt ו-updatedAt אוטומטית לכל הזמנה
});

// יצירת המודל בשם 'Order' המבוסס על סכמת ההזמנה שהוגדרה
const Order = mongoose.model('Order', orderSchema);

// ייצוא המודל לשימוש בקבצים אחרים בפרויקט
module.exports = Order;
