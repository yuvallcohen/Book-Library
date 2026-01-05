// ייבוא ספריות נדרשות
const express = require('express'); // מסגרת העבודה Express
const mongoose = require('mongoose'); // ספרייה לעבודה עם MongoDB
const cors = require('cors'); // מאפשר גישה בין דומיינים (לדוגמה, בין ה-Frontend ל-Backend)
require('dotenv').config(); // מאפשר טעינת משתנים מקובץ .env

const app = express(); // יצירת מופע של אפליקציית אקספרס

// ===== Middleware ===== //
app.use(cors()); // מאפשר בקשות ממקורות חיצוניים (CORS)
app.use(express.json()); // מאפשר לשרת לקרוא נתונים שמגיעים ב־JSON (לדוגמה, ב־POST)

// ===== התחברות למסד הנתונים MongoDB ===== //
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,          // שימוש בפרסר החדש של Mongo
  useUnifiedTopology: true        // מנגנון חדש לטיפול בקישורים
})
.then(() => console.log("✅ MongoDB connected")) // חיבור מוצלח למסד
.catch(err => console.error("❌ MongoDB connection error:", err)); // טיפול בשגיאת התחברות

// ===== ראוטים ===== //
app.use('/api/orders', require('./routes/orderRoutes')); 
// כל בקשה שמתחילה ב־/api/orders תנותב לפי ההגדרות בקובץ orderRoutes.js

// ===== הפעלת השרת ===== //
const PORT = process.env.PORT || 5000; // הגדרת פורט מתוך .env או ברירת מחדל
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`); // הדפסת הודעה כשהשרת רץ
});
