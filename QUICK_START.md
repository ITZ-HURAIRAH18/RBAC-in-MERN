# 🚀 Quick Start Guide - MERN RBAC System

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

## Step 1: Backend Setup

### 1.1 Install Dependencies
```bash
cd my-backend
npm install
```

### 1.2 Configure Environment
Create a `.env` file in `my-backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

### 1.3 Seed the Database
```bash
node seed.js
```

This will create:
- **10 Permissions**: All CRUD permissions for users, products, reports, and roles
- **5 Roles**: admin, user, manager, editor, viewer
- **3 Test Users**:
  - `admin@test.com` / `password123` (Full access)
  - `manager@test.com` / `password123` (Limited access)
  - `user@test.com` / `password123` (Read-only access)

### 1.4 Start Backend Server
```bash
npm run dev
```

Server will run on: `http://localhost:5000`

## Step 2: Frontend Setup

### 2.1 Install Dependencies
```bash
cd frontend
npm install
```

### 2.2 Start Frontend Development Server
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173` (or the port shown in terminal)

## Step 3: Test the Application

### 3.1 Login as Admin
1. Open `http://localhost:5173` in your browser
2. Login with:
   - Email: `admin@test.com`
   - Password: `password123`
3. You should see all navigation items (Users, Products, Reports, Roles)

### 3.2 Test Different Permissions

**Admin User** (admin@test.com):
- ✅ Can access all pages
- ✅ Can create, read, update, delete everything
- ✅ Can manage roles and permissions

**Manager User** (manager@test.com):
- ✅ Can read and create users
- ✅ Can read products
- ❌ Cannot delete users
- ❌ Cannot manage roles
- ❌ Cannot view reports

**Basic User** (user@test.com):
- ✅ Can only read users
- ❌ Cannot create, update, or delete
- ❌ Cannot access other pages

## Step 4: Explore Features

### Users Management
1. Navigate to **Users** page
2. Click **Add User** to create a new user
3. Assign roles to users
4. Edit or delete users (if you have permission)

### Products Management
1. Navigate to **Products** page
2. Click **Add Product** to create a product
3. Fill in: name, description, price, stock, category
4. Edit or delete products (if you have permission)

### Reports & Analytics
1. Navigate to **Reports** page
2. View dashboard statistics
3. Check user reports, product reports, and sales data
4. Switch between tabs

### Roles Management
1. Navigate to **Roles** page
2. Click **Add Role** to create a custom role
3. Select permissions for the role
4. Assign roles to users

## 🎯 Common Tasks

### Create a Custom Role
```
1. Go to Roles page
2. Click "Add Role"
3. Name: "Sales Manager"
4. Select permissions:
   - read_products
   - create_products
   - view_reports
5. Click "Create Role"
```

### Assign Role to User
```
1. Go to Users page
2. Click "Edit" on a user
3. Check the roles you want to assign
4. Click "Update User"
```

### Create a Product
```
1. Go to Products page
2. Click "Add Product"
3. Fill in details:
   - Name: "Laptop"
   - Description: "High-performance laptop"
   - Price: 999.99
   - Stock: 50
   - Category: Electronics
4. Click "Create Product"
```

## 🔧 Troubleshooting

### Backend won't start
- ✅ Check if MongoDB is running
- ✅ Verify `.env` file exists with correct values
- ✅ Run `npm install` to ensure all dependencies are installed

### Frontend shows blank page
- ✅ Check if backend is running on port 5000
- ✅ Clear browser cache and localStorage
- ✅ Check browser console for errors

### "Unauthorized" error
- ✅ Make sure you're logged in
- ✅ Check if your token is valid (try logging out and back in)
- ✅ Verify the user has the required permission

### Can't see navigation items
- ✅ This is normal! Navigation is permission-based
- ✅ Login with admin@test.com to see all items
- ✅ Check user's roles and permissions

## 📱 Testing Different User Roles

### Test as Admin
```
Email: admin@test.com
Password: password123
Expected: Full access to all features
```

### Test as Manager
```
Email: manager@test.com
Password: password123
Expected: Can manage users and view products
```

### Test as Basic User
```
Email: user@test.com
Password: password123
Expected: Read-only access to users
```

## 🎨 Customization

### Add New Permission
1. Edit `my-backend/seed.js`
2. Add permission to the array:
   ```javascript
   { name: "export_data" }
   ```
3. Run `node seed.js` again

### Add New Route
1. Create controller in `my-backend/controllers/`
2. Create route in `my-backend/routes/`
3. Add route to `server.js`
4. Create page component in `frontend/src/pages/`
5. Add route to `App.jsx`

### Change Styling
- Edit `frontend/src/App.css` for global styles
- Edit `frontend/src/index.css` for design tokens
- Modify individual component styles

## 📚 Next Steps

1. **Add more features**: Implement file uploads, email notifications, etc.
2. **Enhance security**: Add rate limiting, CSRF protection
3. **Improve UX**: Add loading states, error boundaries
4. **Deploy**: Deploy to Heroku, Vercel, or your preferred platform
5. **Add tests**: Write unit and integration tests

## 🆘 Need Help?

- Check the main documentation: `RBAC_SYSTEM_GUIDE.md`
- Review the code comments in each file
- Check browser console for frontend errors
- Check terminal for backend errors

---

**Happy Coding! 🎉**
