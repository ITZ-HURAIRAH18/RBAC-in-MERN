# 🔐 RBAC Permission Matrix

## Permission Overview

This document shows which permissions are assigned to each default role.

## Permissions Legend
- ✅ = Has Permission
- ❌ = No Permission

## Permission Matrix

| Permission | Admin | Manager | Editor | Viewer | User |
|-----------|-------|---------|--------|--------|------|
| **User Management** |
| read_users | ✅ | ✅ | ❌ | ✅ | ✅ |
| create_users | ✅ | ✅ | ❌ | ❌ | ❌ |
| update_users | ✅ | ✅ | ❌ | ❌ | ❌ |
| delete_users | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Product Management** |
| read_products | ✅ | ✅ | ✅ | ✅ | ❌ |
| create_products | ✅ | ❌ | ❌ | ❌ | ❌ |
| update_products | ✅ | ❌ | ✅ | ❌ | ❌ |
| delete_products | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Reports & Analytics** |
| view_reports | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Role Management** |
| manage_roles | ✅ | ❌ | ❌ | ❌ | ❌ |

## Role Descriptions

### 👑 Admin
**Full System Access**
- Complete control over all features
- Can manage users, products, reports, and roles
- Can create and delete any resource
- **Use Case**: System administrators, owners

**Permissions**: All 10 permissions

### 👔 Manager
**User & Product Management**
- Can manage users (create, read, update)
- Can view products
- Cannot delete users or manage roles
- **Use Case**: Team leads, department managers

**Permissions**: 
- read_users
- create_users
- update_users
- read_products

### ✏️ Editor
**Product Content Management**
- Can view and edit products
- Cannot create or delete products
- No access to users or roles
- **Use Case**: Content editors, product managers

**Permissions**:
- read_products
- update_products

### 👀 Viewer
**Read-Only Access**
- Can view users and products
- Cannot make any changes
- **Use Case**: Auditors, stakeholders, read-only users

**Permissions**:
- read_users
- read_products

### 👤 User
**Basic Access**
- Can only view users list
- Minimal permissions
- **Use Case**: Basic authenticated users

**Permissions**:
- read_users

## Access Control Flow

```
┌─────────────────────────────────────────────────────────┐
│                    User Login                            │
│                 (email + password)                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              JWT Token Generated                         │
│    Contains: userId, email, permissions[]               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│           Token Stored in localStorage                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│          User Navigates to Protected Route              │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│         Frontend: Check Permission with Hook            │
│         usePermission("read_users")                      │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
   ✅ Allowed                ❌ Denied
        │                         │
        ▼                         ▼
  Show Content          Redirect to /unauthorized
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│         Backend: Verify Permission in Middleware        │
│         auth, can("read_users")                         │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
   ✅ Allowed                ❌ Denied
        │                         │
        ▼                         ▼
  Process Request         Return 403 Forbidden
```

## Permission Hierarchy

```
┌──────────────────────────────────────────────────────────┐
│                        ADMIN                              │
│  ┌────────────────────────────────────────────────────┐  │
│  │              All Permissions (10)                  │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   MANAGER    │  │    EDITOR    │  │    VIEWER    │
│      (4)     │  │      (2)     │  │      (2)     │
└──────────────┘  └──────────────┘  └──────────────┘
        │
        ▼
┌──────────────┐
│     USER     │
│      (1)     │
└──────────────┘
```

## Creating Custom Roles

You can create custom roles with any combination of permissions:

### Example: Sales Manager
```javascript
Permissions:
- read_users
- read_products
- create_products
- update_products
- view_reports
```

### Example: Support Agent
```javascript
Permissions:
- read_users
- update_users
- read_products
```

### Example: Analyst
```javascript
Permissions:
- read_users
- read_products
- view_reports
```

## Best Practices

### ✅ DO
- Assign minimum required permissions
- Create specific roles for specific tasks
- Regularly audit user permissions
- Use descriptive role names
- Document custom roles

### ❌ DON'T
- Give everyone admin access
- Create roles with conflicting permissions
- Assign permissions directly to users (use roles)
- Leave unused roles active
- Share admin credentials

## Permission Naming Convention

All permissions follow this pattern:
```
<action>_<resource>

Examples:
- read_users
- create_products
- delete_users
- manage_roles
```

### Actions
- `read` - View/List resources
- `create` - Create new resources
- `update` - Modify existing resources
- `delete` - Remove resources
- `view` - Access specific features (like reports)
- `manage` - Full control (like roles)

### Resources
- `users` - User accounts
- `products` - Product inventory
- `reports` - Analytics and reports
- `roles` - Roles and permissions

## Testing Permissions

### Test Checklist
- [ ] Login as each role type
- [ ] Verify navigation shows correct items
- [ ] Test CRUD operations for each resource
- [ ] Verify unauthorized access is blocked
- [ ] Check API returns 403 for forbidden actions
- [ ] Confirm UI hides unauthorized buttons

### Test Scenarios

**Scenario 1: Manager tries to delete user**
- Expected: Delete button should not appear
- API should return 403 if attempted

**Scenario 2: Viewer tries to edit product**
- Expected: Edit button should not appear
- API should return 403 if attempted

**Scenario 3: User tries to access Reports**
- Expected: Reports link not in navigation
- Redirect to /unauthorized if URL accessed directly

---

**Last Updated**: 2026-02-05
