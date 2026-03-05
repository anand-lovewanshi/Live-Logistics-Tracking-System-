const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Product = require("../models/Product");

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name: "iPhone 15 Pro",
    description: "Latest Apple flagship smartphone",
    price: 99999,
    category: "Electronics",
    brand: "Apple",
    stock: 50,
    rating: 4.8,
    image: "https://via.placeholder.com/300"
  },
  {
    name: "Samsung Galaxy S24",
    description: "Top Android phone",
    price: 79999,
    category: "Electronics",
    brand: "Samsung",
    stock: 40,
    rating: 4.6
  },
  {
    name: "Nike Air Max",
    description: "Comfortable running shoes",
    price: 8999,
    category: "Footwear",
    brand: "Nike",
    stock: 100,
    rating: 4.5
  },
  {
    name: "Adidas Ultraboost",
    description: "Premium running shoes",
    price: 12999,
    category: "Footwear",
    brand: "Adidas",
    stock: 75,
    rating: 4.7
  },
  {
    name: "MacBook Pro M3",
    description: "Apple laptop with M3 chip",
    price: 199999,
    category: "Laptops",
    brand: "Apple",
    stock: 20,
    rating: 4.9
  },
  {
    name: "Dell XPS 15",
    description: "Premium Windows laptop",
    price: 149999,
    category: "Laptops",
    brand: "Dell",
    stock: 15,
    rating: 4.4
  },
  {
    name: "Sony WH-1000XM5",
    description: "Best noise cancelling headphones",
    price: 29999,
    category: "Audio",
    brand: "Sony",
    stock: 60,
    rating: 4.8
  },
  {
    name: "Boat Rockerz 450",
    description: "Budget wireless headphones",
    price: 1499,
    category: "Audio",
    brand: "Boat",
    stock: 200,
    rating: 4.1
  },
  {
    name: "Canon EOS R6",
    description: "Full frame mirrorless camera",
    price: 249999,
    category: "Cameras",
    brand: "Canon",
    stock: 10,
    rating: 4.7
  },
  {
    name: "OnePlus Nord 3",
    description: "Mid-range Android phone",
    price: 33999,
    category: "Electronics",
    brand: "OnePlus",
    stock: 80,
    rating: 4.3
  },
  {
    name: "Levi's 511 Slim Jeans",
    description: "Classic slim fit jeans",
    price: 3999,
    category: "Clothing",
    brand: "Levis",
    stock: 150,
    rating: 4.2
  },
  {
    name: "HP Pavilion 15",
    description: "Budget friendly laptop",
    price: 59999,
    category: "Laptops",
    brand: "HP",
    stock: 0,
    rating: 3.9
  }
];

const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    await User.create([
      {
        name: "Admin User",
        email: "admin@test.com",
        password: "admin123",
        role: "admin"
      },
      {
        name: "Test User",
        email: "user@test.com",
        password: "user123",
        role: "user"
      }
    ]);

    await Product.insertMany(products);
    console.log("✅ Data seeded successfully!");
    console.log("Admin: admin@test.com / admin123");
    console.log("User:  user@test.com / user123");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
   