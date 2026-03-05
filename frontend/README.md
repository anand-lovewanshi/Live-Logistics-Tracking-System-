# MERN E-Commerce Product Listing System

## Setup

### Backend
\`\`\`
cd backend
npm install
cp .env.example .env   # Fill in your MongoDB URI
npm run seed           # Seed demo data
npm run dev
\`\`\`

### Frontend
\`\`\`
cd frontend
npm install
npm run dev
\`\`\`

## Demo Credentials
- Admin: admin@test.com / admin123
- User:  user@test.com / user123

## API Endpoints

### Auth
| Method | Route | Access |
|--------|-------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET  | /api/auth/me | Private |

### Products
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/products | Public |
| GET | /api/products/meta/filters | Public |
| GET | /api/products/:id | Public |
| POST | /api/products | Admin |
| PUT | /api/products/:id | Admin |
| DELETE | /api/products/:id | Admin |

## Query Parameters (GET /api/products)
- search, category, brand, minPrice, maxPrice, rating, inStock
- sort: newest | price_asc | price_desc | top_rated
- page, limit