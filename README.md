# Savora

A modern restaurant ordering platform built with React, designed to provide a smooth food discovery, ordering, and restaurant management experience.

## Live Demo

https://savora-rho-amber.vercel.app/

## GitHub Repository

https://github.com/ghada484/Savora

## Overview

Savora is a front-end restaurant ordering platform that allows customers to explore dishes, search and filter the menu, manage their cart, place orders, and track their order status.

The project also includes a demo restaurant administration dashboard for managing menu items and customer orders.

The application is built with React and uses a real external API for recipe data, while authentication, cart data, custom menu items, and orders are handled through LocalStorage for the front-end demo.

## Features

### Customer Features

* Browse restaurant dishes
* Search for dishes
* Filter dishes by category
* View detailed food information
* Add dishes to cart
* Increase and decrease item quantities
* Remove items from cart
* View cart subtotal and delivery fee
* Complete checkout
* Choose a payment method
* Place restaurant orders
* View order confirmation
* View previous orders
* View individual order details
* Track order status
* Manage customer profile
* Responsive design for desktop, tablet, and mobile

### Authentication

* Customer registration
* Customer login
* Logout
* Protected customer routes
* Admin authentication
* Admin-protected routes
* Demo admin account

### Admin Features

* Restaurant dashboard
* View total orders
* View total revenue
* View confirmed orders
* View delivered orders
* View recent orders
* Manage menu items
* Search menu items
* Filter menu items
* Create new food items
* Edit existing food items
* Delete food items
* Manage customer orders
* Search orders
* Filter orders by status
* Update order status
* View complete order details

## Tech Stack

* React
* React Router
* Context API
* Axios
* JavaScript
* CSS
* LocalStorage
* DummyJSON Recipes API
* Vercel

## API Integration

Savora uses the DummyJSON Recipes API to retrieve real recipe data.

Main endpoints used:

* Get recipes
* Get recipe by ID
* Search recipes
* Get recipe tags
* Get recipes by tag

API Base URL:

https://dummyjson.com

## State Management

The project uses React Context API to manage application state.

### AuthContext

Handles:

* Authentication
* Registration
* Login
* Logout
* User profile updates
* Admin role detection

### CartContext

Handles:

* Cart items
* Adding products
* Removing products
* Quantity management
* Cart count
* Subtotal
* Delivery fee
* Cart total

### OrderContext

Handles:

* Creating orders
* Retrieving customer orders
* Retrieving individual orders
* Updating order status

### ToastContext

Provides reusable toast notifications across the application.

## Project Structure

```text
src/
├── assets/
│   └── images/
│
├── Components/
│   ├── AdminProtectedRoute/
│   ├── CartItem/
│   ├── CategoryCard/
│   ├── FoodCard/
│   ├── Footer/
│   ├── Hero/
│   ├── Loading/
│   ├── Navbar/
│   ├── ProtectedRoute/
│   └── SearchBar/
│
├── Pages/
│   ├── About/
│   ├── AdminOrderDetails/
│   ├── Cart/
│   ├── Checkout/
│   ├── CreateFood/
│   ├── EditFood/
│   ├── FoodDetails/
│   ├── Home/
│   ├── Login/
│   ├── ManageMenu/
│   ├── ManageOrders/
│   ├── Menu/
│   ├── MyOrders/
│   ├── NotFound/
│   ├── OrderConfirmation/
│   ├── OrderDetails/
│   ├── Profile/
│   ├── Register/
│   └── RestaurantDashboard/
│
├── context/
│   ├── AuthContext.js
│   ├── CartContext.js
│   ├── FoodContext.js
│   ├── OrderContext.js
│   └── ToastContext.js
│
├── data/
│   └── foods.js
│
├── services/
│   └── api.js
│
├── App.js
└── index.css
```

## Installation

Clone the repository:

```bash
git clone https://github.com/ghada484/Savora.git
```

Navigate to the project:

```bash
cd Savora
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will run locally on:

```text
http://localhost:3000
```

## Production Build

To create an optimized production build:

```bash
npm run build
```

## Demo Admin Account

Use the following credentials to access the restaurant dashboard:

```text
Email: admin@savora.com
Password: admin123
```

> This is a front-end demo account. Authentication and user data are stored in LocalStorage and are not intended for production security.

## Design

Savora follows a modern editorial restaurant design direction with:

* Warm ivory backgrounds
* Charcoal typography
* Terracotta accents
* Editorial-style typography
* Food-focused imagery
* Clean layouts
* Rounded buttons and cards
* Responsive layouts
* Subtle micro-interactions
* Mobile-first considerations

## Responsive Design

Savora is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The main pages and customer/admin flows have been tested across responsive layouts.

## Future Improvements

The current version focuses on the front-end experience.

Possible future improvements include:

* Node.js and Express backend
* MongoDB database
* JWT authentication
* Secure password hashing
* Real restaurant accounts
* Real payment integration
* Real-time order tracking
* Backend menu management
* Image upload system
* Restaurant delivery management

## Author

**Ghada Abdalla**

Systems & Computers Engineering

Front-End Developer

## License

This project was created for portfolio and educational purposes.
