# MERN RBAC System

A full-stack Role-Based Access Control (RBAC) system built with MongoDB, Express.js, React, and Node.js.

## 🚀 Features

- **Complete RBAC Implementation**: Users, Roles, and Permissions with many-to-many relationships
- **JWT Authentication**: Secure token-based authentication
- **Permission-Based UI**: Dynamic interface that shows/hides components based on user permissions
- **Protected Routes**: Backend and frontend route protection
- **Real-time Reports**: Dashboard with sales analytics and user reports
- **Modern UI**: Clean, professional interface with custom logo and navigation
- **10 Predefined Permissions**: Granular control over user actions
- **5 Default Roles**: Admin, Manager, User, Editor, Viewer

## 📋 Permissions

- `read_users` - View users list
- `create_users` - Create new users
- `update_users` - Edit user information
- `delete_users` - Remove users
- `read_products` - View products
- `create_products` - Add new products
- `update_products` - Edit products
- `delete_products` - Remove products
- `view_reports` - Access reports dashboard
- `manage_roles` - Manage roles and permissions

## 👥 Test Credentials

| Role    | Email                | Password    | Permissions                  |
|---------|---------------------|-------------|------------------------------|
| Admin   | admin@test.com      | password123 | All permissions              |
| Manager | manager@test.com    | password123 | Read, Create, Update         |
| User    | user@test.com       | password123 | Read users only              |

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- JWT Decode
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB

### Backend Setup

1. Navigate to backend directory:
```bash
cd my-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

4. Seed the database:
```bash
node seed.js
```

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🎯 API Endpoints

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

### Reports
- `GET /api/reports/dashboard` - Dashboard stats (requires `view_reports`)
- `GET /api/reports/users` - User report (requires `view_reports`)
- `GET /api/reports/products` - Product report (requires `view_reports`)
- `GET /api/reports/sales` - Sales summary (requires `view_reports`)

### Roles
- `GET /api/roles` - Get all roles (requires `manage_roles`)
- `GET /api/roles/permissions` - Get all permissions (requires `manage_roles`)
- `POST /api/roles` - Create role (requires `manage_roles`)
- `PUT /api/roles/:id` - Update role (requires `manage_roles`)
- `DELETE /api/roles/:id` - Delete role (requires `manage_roles`)

### Sales
- `GET /api/sales` - Get all sales (requires `read_products`)
- `POST /api/sales` - Create sale (requires `create_products`)
- `DELETE /api/sales/:id` - Delete sale (requires `delete_products`)

## 🔐 How RBAC Works

1. **User** has multiple **Roles**
2. **Role** has multiple **Permissions**
3. Backend middleware checks if user has required permission
4. Frontend components conditionally render based on permissions
5. Routes are protected both on frontend and backend

## 📱 Frontend Routes

- `/` - Home page (public when not logged in)
- `/login` - Login page
- `/users` - Users management (requires `read_users`)
- `/products` - Products management (requires `read_products`)
- `/reports` - Reports dashboard (requires `view_reports`)
- `/roles` - Role management (requires `manage_roles`)
- `/unauthorized` - Access denied page

## 🎨 Features Showcase

- **Professional Logo**: Custom "AH" gradient logo
- **Permission-Based Navigation**: Links appear only if user has access
- **Loading Screen**: Smooth 2-second loading animation
- **Real Sales Tracking**: Actual sales data with analytics
- **Responsive Design**: Works on all screen sizes

## 🚧 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Activity logs
- [ ] Advanced search and filters
- [ ] Export reports to PDF/Excel
- [ ] Multi-factor authentication
- [ ] Role templates
- [ ] Bulk user import

## 👨‍💻 Author

Built with ❤️ by AH

## 📄 License

MIT License
