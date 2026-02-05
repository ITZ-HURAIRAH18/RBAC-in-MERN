# 🚀 MERN RBAC System - Complete Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [System Architecture](#system-architecture)
- [Permissions & Roles](#permissions--roles)
- [API Documentation](#api-documentation)
- [Design System](#design-system)
- [Loading Screen](#loading-screen)
- [Troubleshooting](#troubleshooting)

---

## 🌟 Overview

A **full-stack MERN application** with **Role-Based Access Control (RBAC)** featuring:
- ✅ JWT Authentication
- ✅ 10 Granular Permissions
- ✅ 5 Pre-configured Roles
- ✅ Full CRUD for Users, Products, Reports, and Roles
- ✅ Premium Dark Theme UI
- ✅ Animated Water Clock Loading Screen
- ✅ Responsive Design

---

## ✨ Features

### Backend (Node.js + Express + MongoDB)
- **Authentication**: JWT-based with bcrypt password hashing
- **Authorization**: Permission-based middleware
- **Models**: User, Role, Permission, Product
- **Controllers**: User, Product, Role, Report management
- **API Routes**: Protected endpoints with permission checks

### Frontend (React + Vite)
- **Pages**: Login, Users, Products, Reports, Roles, Unauthorized
- **Components**: ProtectedRoute, LoadingScreen
- **Context**: AuthContext for global authentication state
- **Hooks**: usePermission for permission checking
- **Design**: Premium dark theme with glassmorphism

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Backend Setup

```bash
cd my-backend
npm install
```

Create `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/mern-rbac
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

Seed the database:
```bash
node seed.js
```

Start the server:
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 3. Login

**Admin Account:**
- Email: `admin@test.com`
- Password: `password123`

**Manager Account:**
- Email: `manager@test.com`
- Password: `password123`

**User Account:**
- Email: `user@test.com`
- Password: `password123`

---

## 🏗️ System Architecture

### Database Models

#### User
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  roles: [ObjectId] // Reference to Role
}
```

#### Role
```javascript
{
  name: String,
  permissions: [ObjectId] // Reference to Permission
}
```

#### Permission
```javascript
{
  name: String (unique)
}
```

#### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  status: String,
  createdBy: ObjectId // Reference to User
}
```

### Authentication Flow

```
1. User logs in with email/password
2. Backend validates credentials
3. JWT token generated with user info + permissions
4. Token stored in localStorage
5. Token sent with every API request
6. Backend middleware validates token
7. Permission middleware checks user permissions
```

---

## 🔐 Permissions & Roles

### 10 Permissions

| Permission | Description |
|------------|-------------|
| `read_users` | View users list |
| `create_users` | Create new users |
| `update_users` | Edit existing users |
| `delete_users` | Delete users |
| `read_products` | View products |
| `create_products` | Create products |
| `update_products` | Edit products |
| `delete_products` | Delete products |
| `view_reports` | Access reports & analytics |
| `manage_roles` | Manage roles & permissions |

### 5 Default Roles

#### 👑 Admin (All 10 permissions)
- Full system access
- Can manage everything
- **Use Case**: System administrators

#### 👔 Manager (4 permissions)
- `read_users`, `create_users`, `update_users`, `read_products`
- Can manage users and view products
- **Use Case**: Team leads, department managers

#### ✏️ Editor (2 permissions)
- `read_products`, `update_products`
- Can edit products only
- **Use Case**: Content editors, product managers

#### 👀 Viewer (2 permissions)
- `read_users`, `read_products`
- Read-only access
- **Use Case**: Auditors, stakeholders

#### 👤 User (1 permission)
- `read_users`
- Basic access
- **Use Case**: Standard users

### Permission Matrix

| Permission | Admin | Manager | Editor | Viewer | User |
|-----------|-------|---------|--------|--------|------|
| read_users | ✅ | ✅ | ❌ | ✅ | ✅ |
| create_users | ✅ | ✅ | ❌ | ❌ | ❌ |
| update_users | ✅ | ✅ | ❌ | ❌ | ❌ |
| delete_users | ✅ | ❌ | ❌ | ❌ | ❌ |
| read_products | ✅ | ✅ | ✅ | ✅ | ❌ |
| create_products | ✅ | ❌ | ❌ | ❌ | ❌ |
| update_products | ✅ | ❌ | ✅ | ❌ | ❌ |
| delete_products | ✅ | ❌ | ❌ | ❌ | ❌ |
| view_reports | ✅ | ❌ | ❌ | ❌ | ❌ |
| manage_roles | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 📡 API Documentation

### Authentication

**POST** `/api/auth/login`
```json
Request:
{
  "email": "admin@test.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here"
}
```

**POST** `/api/auth/register`
```json
Request:
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Users (Protected)

**GET** `/api/users` - Requires `read_users`
**POST** `/api/users` - Requires `create_users`
**PUT** `/api/users/:id` - Requires `update_users`
**DELETE** `/api/users/:id` - Requires `delete_users`

### Products (Protected)

**GET** `/api/products` - Requires `read_products`
**POST** `/api/products` - Requires `create_products`
**PUT** `/api/products/:id` - Requires `update_products`
**DELETE** `/api/products/:id` - Requires `delete_products`

### Roles (Protected)

**GET** `/api/roles` - Requires `manage_roles`
**GET** `/api/roles/permissions` - Requires `manage_roles`
**POST** `/api/roles` - Requires `manage_roles`
**PUT** `/api/roles/:id` - Requires `manage_roles`
**DELETE** `/api/roles/:id` - Requires `manage_roles`

### Reports (Protected)

**GET** `/api/reports/dashboard` - Requires `view_reports`
**GET** `/api/reports/users` - Requires `view_reports`
**GET** `/api/reports/products` - Requires `view_reports`
**GET** `/api/reports/sales` - Requires `view_reports`

---

## 🎨 Design System

### Color Palette

**Primary Colors:**
- Primary: `#6366f1` (Indigo)
- Primary Light: `#818cf8`
- Primary Dark: `#4f46e5`

**Gradients:**
- Primary: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Success: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
- Fire: `linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)`

**Dark Theme:**
- Background Primary: `#0a0e27`
- Background Secondary: `#151932`
- Background Tertiary: `#1e2139`

**Text Colors:**
- Primary: `#ffffff`
- Secondary: `#e2e8f0`
- Muted: `#cbd5e1`

### Typography

- **Primary Font**: Inter (body text)
- **Accent Font**: Poppins (headings)
- **Font Sizes**: Responsive with `clamp()`

### Components

**Navigation:**
- Sticky header with blur backdrop
- Gradient logo
- Permission-based links
- User avatar with initials

**Cards:**
- Glassmorphism effect
- Hover lift animation
- Gradient borders
- Rounded corners (24px)

**Buttons:**
- Gradient backgrounds
- Ripple effect on click
- Hover lift animation
- Glow shadows

**Forms:**
- Dark input backgrounds
- Focus ring with glow
- Smooth transitions
- Clear error states

---

## ⏳ Loading Screen

### Water Clock Animation

The app features a beautiful **animated water clock** loading screen that appears for 2 seconds on initial page load.

**Features:**
- ✅ Water draining from top container
- ✅ Water filling bottom container
- ✅ Animated water drops
- ✅ Water flow through tube
- ✅ Shimmer effects
- ✅ Pulsing text
- ✅ Bouncing dots

**Files:**
- `frontend/src/components/LoadingScreen.jsx`
- `frontend/src/components/LoadingScreen.css`

---

## 🛠️ Troubleshooting

### Text Not Visible
**Solution**: Refresh browser with `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)

### Navigation Links Not Showing
**Solution**: Check if user has proper permissions. Navigation items only show if user has the required permission.

### MongoDB Connection Error
**Solution**: 
1. Check if MongoDB is running
2. Verify `MONGO_URI` in `.env`
3. Ensure database is accessible

### JWT Token Expired
**Solution**: Logout and login again to get a new token

### Port Already in Use
**Solution**: 
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change PORT in .env
PORT=5001
```

---

## 📁 Project Structure

```
MERN Setup/
├── my-backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── roleController.js
│   │   └── reportController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Role.js
│   │   ├── Permission.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   ├── products.js
│   │   ├── roles.js
│   │   └── reports.js
│   ├── .env
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── UsersPage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ReportsPage.jsx
│   │   │   ├── RolesPage.jsx
│   │   │   └── Unauthorized.jsx
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── LoadingScreen.css
│   │   ├── componenets/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── usePermission.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## 🎯 Key Features Summary

### Security
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Permission-based authorization
- ✅ Protected routes (frontend & backend)
- ✅ Token validation

### User Management
- ✅ Create, read, update, delete users
- ✅ Assign roles to users
- ✅ View user list with roles
- ✅ Password hashing on creation

### Product Management
- ✅ Full CRUD operations
- ✅ Category management
- ✅ Stock tracking
- ✅ Status management (active/inactive)

### Role Management
- ✅ Create custom roles
- ✅ Assign permissions to roles
- ✅ Edit and delete roles
- ✅ Visual permission selection

### Reports & Analytics
- ✅ Dashboard statistics
- ✅ User reports
- ✅ Product reports
- ✅ Sales summary
- ✅ Tabbed interface

### UI/UX
- ✅ Premium dark theme
- ✅ Glassmorphism effects
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Water clock loading screen
- ✅ Permission-based navigation
- ✅ Modal forms
- ✅ Color-coded badges

---

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Create new app
2. Set environment variables
3. Connect to MongoDB Atlas
4. Deploy from GitHub

### Frontend (Vercel/Netlify)
1. Create new project
2. Connect to GitHub
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

---

## 📝 License

MIT License - Feel free to use this project for learning or commercial purposes.

---

## 🎉 Conclusion

You now have a **fully functional MERN RBAC system** with:
- ✅ Complete authentication & authorization
- ✅ 4 main CRUD modules
- ✅ 10 granular permissions
- ✅ 5 pre-configured roles
- ✅ Beautiful, responsive UI
- ✅ Animated loading screen
- ✅ Production-ready code

**Built with ❤️ using MongoDB, Express, React, and Node.js**

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the API documentation
3. Verify permissions are correctly assigned
4. Check browser console for errors

**Happy Coding! 🚀**
