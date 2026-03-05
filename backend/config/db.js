const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;


// ## Step 3 — Verify karo folder structure

// backend/
// ├── config/db.js          ✅
// ├── controllers/
// │   ├── authController.js ✅
// │   └── productController.js ✅
// ├── middleware/
// │   ├── authMiddleware.js ✅
// │   └── errorMiddleware.js ✅
// ├── models/
// │   ├── User.js           ✅
// │   └── Product.js        ✅
// ├── routes/
// │   ├── authRoutes.js     ✅
// │   └── productRoutes.js  ✅
// ├── utils/seeder.js       ✅
// ├── server.js             ✅
// ├── .env                  ✅
// └── package.json          ✅