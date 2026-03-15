# E-Commerce API

Node.js + Express backend for an e-commerce platform with users (customer/seller/admin), products, categories, cart, orders, payments, reviews, wishlist, and promo codes.

## Features
- User registration, email verification, login, and profile updates
- Role-based access control (customer, seller, admin)
- Product and category management with admin approval workflow
- Cart management and order placement
- Promo codes with activation/deactivation and usage tracking
- Stripe and Cash on Delivery (COD) payments
- Product reviews and wishlists for customers

## Tech Stack
- Node.js, Express (ES modules)
- MongoDB + Mongoose
- JWT auth
- Joi validation
- Stripe payments
- Nodemailer for email verification

## Getting Started
1. Install dependencies:
   - `npm install`
2. Create a `.env` file and add the required variables (see below).
3. Start the server:
   - `npm run start`

Server runs on `http://localhost:3000`.

## Environment Variables
Create a `.env` file in the project root:
```
CONNECTION_STRING_MAIN=
STRIPE_SECRET_KEY=
```

Optional (recommended to move to env in future):
- JWT secret is currently hardcoded as `"secret"` in middleware.
- Email credentials are currently hardcoded in `Email/email.js`.

## Scripts
- `npm run start` - start the dev server with nodemon

## Authentication
Protected routes require a Bearer token:
```
Authorization: Bearer <token>
```

## API Overview
Base URL: `http://localhost:3000`

### Auth & Users
- `POST /register` - register
- `GET /verify/:emailtoken` - verify account
- `POST /login` - login
- `POST /update-profile` - update profile (auth)

### Admin
- `POST /restrict-profile` (auth)
- `POST /unrestrict-profile` (auth)
- `POST /promo/create` (auth)
- `POST /promo/deactivate` (auth)
- `POST /promo/activate` (auth)
- `GET /promo/list` (auth)

### Categories (`/api/categories`)
- `POST /` (auth)
- `GET /`
- `GET /:id` (auth)
- `PUT /:id` (auth)
- `DELETE /:id` (auth)
- `GET /pending` (auth, admin)
- `PATCH /:id/approve` (auth, admin)
- `PATCH /:id/reject` (auth, admin)

### Products (`/api/products`)
- `GET /`
- `GET /:id`
- `POST /create` (auth, seller/admin)
- `PUT /update/:id` (auth, seller/admin)
- `DELETE /delete/:id` (auth, seller/admin)
- `GET /pending` (auth, admin)
- `PATCH /:id/approve` (auth, admin)
- `PATCH /:id/reject` (auth, admin)

### Cart (auth)
- `GET /cart`
- `POST /addtocart`
- `DELETE /removefromcart/:productId`
- `PUT /updatequantity`
- `DELETE /clearcart`

### Orders (auth)
- `GET /orders`
- `POST /placeorder`
- `DELETE /deleteorder/:orderId`

### Payments (`/payment`) (auth)
- `POST /stripe`
- `POST /cod`

### Wishlist (auth, customer)
- `POST /add-product-to-wishlist`
- `PUT /remove-product-from-wishlist`
- `GET /get-user-wishlist`

### Reviews (auth, customer)
- `POST /review-product`
- `PUT /update-review`
- `DELETE /delete-review`
- `GET /get-reviews`

## Postman Documentation
Postman collection or docs link here:
- [ https://developers-5197.postman.co/workspace/cb543abf-8f4f-4647-9eb7-bc7007932705 ] 

## Team Members
team member names 
- [ Youssef Gaber (Team Leader) , Hafez Adel , Rehap Ahmed , Bassant Ali ] 

## Notes
- Some endpoints expect specific request bodies; check controllers for required fields.
- Product and category workflows include admin approval for seller-created items.
