# MERN RBAC System - Complete Guide

## 🎯 Overview
This is a complete **Role-Based Access Control (RBAC)** system built with the MERN stack (MongoDB, Express, React, Node.js). The system provides granular permission-based access control for managing users, products, reports, and roles.

## 📋 Permissions List

The system supports the following permissions:

### User Management
- `read_users` - View users list
- `create_users` - Create new users
- `update_users` - Edit existing users
- `delete_users` - Delete users

### Product Management
- `read_products` - View products list
- `create_products` - Create new products
- `update_products` - Edit existing products
- `delete_products` - Delete products

### Reports
- `view_reports` - Access reports and analytics dashboard

### Role Management
- `manage_roles` - Create, edit, and delete roles and assign permissions

## 🏗️ Architecture

### Backend Structure

```
my-backend/
├── models/
│   ├── User.js          # User schema with roles reference
│   ├── Role.js          # Role schema with permissions reference
│   ├── Permission.js    # Permission schema
│   └── Product.js       # Product schema
├── controllers/
│   ├── userController.js      # CRUD operations for users
│   ├── productController.js   # CRUD operations for products
│   ├── roleController.js      # CRUD operations for roles
│   └── reportController.js    # Report generation
├── routes/
│   ├── auth.js          # Login/register routes
│   ├── admin.js         # User management routes
│   ├── products.js      # Product routes
│   ├── roles.js         # Role management routes
│   └── reports.js       # Report routes
├── middleware/
│   └── auth.js          # JWT authentication & permission checking
└── server.js            # Express server setup
```

### Frontend Structure

```
frontend/src/
├── pages/
│   ├── LoginPage.jsx      # Authentication page
│   ├── UsersPage.jsx      # User management (CRUD)
│   ├── ProductsPage.jsx   # Product management (CRUD)
│   ├── ReportsPage.jsx    # Analytics dashboard
│   ├── RolesPage.jsx      # Role management
│   └── Unauthorized.jsx   # 403 error page
├── components/
│   └── ProtectedRoute.jsx # Route protection wrapper
├── context/
│   └── AuthContext.jsx    # Authentication state management
├── hooks/
│   └── usePermission.js   # Permission checking hook
└── App.jsx                # Main routing & navigation
```

## 🔐 Authentication & Authorization Flow

### 1. Login Process
```javascript
POST /api/auth/login
Body: { email, password }
Response: { token, user: { id, email, username, permissions } }
```

### 2. Token Storage
- JWT token is stored in `localStorage`
- Token contains: user ID, email, and permissions array

### 3. Permission Checking

**Backend (Middleware):**
```javascript
import { auth, can } from "./middleware/auth.js";

router.get("/users", auth, can("read_users"), getUsers);
```

**Frontend (Hook):**
```javascript
const canCreate = usePermission("create_users");

{canCreate && <button>Create User</button>}
```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - Get all users (requires `read_users`)
- `POST /api/users` - Create user (requires `create_users`)
- `PUT /api/users/:id` - Update user (requires `update_users`)
- `DELETE /api/users/:id` - Delete user (requires `delete_users`)

### Products
- `GET /api/products` - Get all products (requires `read_products`)
- `POST /api/products` - Create product (requires `create_products`)
- `PUT /api/products/:id` - Update product (requires `update_products`)
- `DELETE /api/products/:id` - Delete product (requires `delete_products`)

### Roles
- `GET /api/roles` - Get all roles (requires `manage_roles`)
- `GET /api/roles/permissions` - Get all permissions (requires `manage_roles`)
- `POST /api/roles` - Create role (requires `manage_roles`)
- `PUT /api/roles/:id` - Update role (requires `manage_roles`)
- `DELETE /api/roles/:id` - Delete role (requires `manage_roles`)

### Reports
- `GET /api/reports/dashboard` - Dashboard stats (requires `view_reports`)
- `GET /api/reports/users` - User report (requires `view_reports`)
- `GET /api/reports/products` - Product report (requires `view_reports`)
- `GET /api/reports/sales` - Sales summary (requires `view_reports`)

## 💡 Usage Examples

### Creating a New Role

1. Navigate to **Roles** page (requires `manage_roles` permission)
2. Click **Add Role** button
3. Enter role name (e.g., "Manager")
4. Select permissions from the list
5. Click **Create Role**

### Assigning Roles to Users

1. Navigate to **Users** page (requires `read_users` permission)
2. Click **Edit** on a user (requires `update_users` permission)
3. Check/uncheck roles in the modal
4. Click **Update User**

### Managing Products

1. Navigate to **Products** page (requires `read_products` permission)
2. Click **Add Product** (requires `create_products` permission)
3. Fill in product details:
   - Name
   - Description
   - Price
   - Stock
   - Category
4. Click **Create Product**

## 🎨 UI Features

### Navigation
- Dynamic navigation based on user permissions
- Only shows menu items the user has access to
- Responsive design with mobile support

### Permission-Based UI
- Buttons and actions are hidden if user lacks permission
- Protected routes redirect to `/unauthorized` if access denied
- Informative messages when permissions are limited

### Styling
- Modern glassmorphism effects
- Smooth animations and transitions
- Color-coded badges for status indicators
- Responsive tables and forms

## 🔧 Configuration

### Environment Variables (.env)
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Default Permissions
The system includes these default permissions (created via seed script):
- read_users
- create_users
- update_users
- delete_users
- read_products
- create_products
- update_products
- delete_products
- view_reports
- manage_roles

## 🚦 Getting Started

### Backend
```bash
cd my-backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Seeding Database
```bash
cd my-backend
node seed.js
```

## 🔒 Security Features

1. **Password Hashing**: All passwords are hashed using bcryptjs
2. **JWT Authentication**: Secure token-based authentication
3. **Permission Middleware**: Server-side permission validation
4. **Protected Routes**: Client-side route protection
5. **Role-Based Access**: Granular permission control

## 📊 Data Models

### User
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  roles: [ObjectId] // Reference to Role
}
```

### Role
```javascript
{
  name: String (unique),
  permissions: [ObjectId] // Reference to Permission
}
```

### Permission
```javascript
{
  name: String (unique)
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  status: String (active/inactive),
  createdBy: ObjectId // Reference to User
}
```

## 🎯 Best Practices

1. **Always check permissions** on both frontend and backend
2. **Use the `usePermission` hook** for conditional rendering
3. **Protect all routes** with the `ProtectedRoute` component
4. **Validate user input** on both client and server
5. **Keep permissions granular** for better access control
6. **Regularly audit roles** and permissions

## 🐛 Troubleshooting

### "Unauthorized" or "Forbidden" errors
- Check if user has the required permission
- Verify JWT token is valid and not expired
- Ensure permission exists in the database

### Routes not showing in navigation
- Verify user has the required permission
- Check `usePermission` hook is working correctly
- Ensure permissions are included in JWT token

### Database connection issues
- Verify MONGO_URI in .env file
- Check MongoDB Atlas network access settings
- Ensure database user has proper permissions

## 📝 License
MIT

## 👥 Contributors
Your Team

---

**Built with ❤️ using MERN Stack**
