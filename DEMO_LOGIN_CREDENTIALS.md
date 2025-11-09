# SpiderBot Demo Login Credentials

## Setup Instructions

Your SpiderBot application is now connected to Supabase. To create demo accounts, follow these steps:

### Step 1: Access Supabase Dashboard
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Navigate to your project: **0ec90b57d6e95fcbda19832f**
3. Click on **Authentication** in the left sidebar
4. Click **Users** tab

### Step 2: Create Demo Users

Click the **Invite** button to create these users:

#### User 1: Regular User
- **Email**: `demo@spiderbot.io`
- **Password**: `Demo@12345`
- **Role**: User (regular access)

#### User 2: Admin User
- **Email**: `admin@spiderbot.io`
- **Password**: `Admin@12345`
- **Role**: Admin (full access)

#### User 3: Pro Trader
- **Email**: `trader@spiderbot.io`
- **Password**: `Trader@12345`
- **Role**: User (regular access)

### Step 3: Verify User Profiles

After creating the auth users, the system automatically creates user profiles in the `users` table. Verify by:

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Run this query to see all users:

```sql
SELECT id, username, display_name, role, kyc_status, subscription_plan FROM public.users;
```

### Step 4: Login to Application

Once users are created, you can login using:

**Regular User Portal**: `http://localhost:5173/login`
- Email: `demo@spiderbot.io`
- Password: `Demo@12345`

**Admin Portal**: `http://localhost:5173/admin`
- Email: `admin@spiderbot.io`
- Password: `Admin@12345`

---

## Database Access

### Your Supabase Credentials:
- **Project URL**: `https://0ec90b57d6e95fcbda19832f.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw`

### Direct Database Access:
1. Go to Supabase Dashboard
2. Click **SQL Editor**
3. Create queries to view/manage data in these tables:
   - `users` - User profiles
   - `strategies` - Trading strategies
   - `active_positions` - Open trades
   - `trade_history` - Past trades
   - `kyc_applications` - KYC submissions
   - `bot_health` - Bot monitoring
   - `audit_logs` - Admin activity logs

---

## API Endpoints

### Trading Webhook
- **URL**: `https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/trading-webhook`
- **Method**: POST
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "strategy": "Signal Bot",
    "symbol": "BTCUSDT",
    "action": "BUY",
    "price": 50000,
    "quantity": 0.5,
    "timestamp": "2025-11-09T10:00:00Z"
  }
  ```

### Seed Demo Users (Optional)
- **URL**: `https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/seed-demo-users`
- **Method**: POST
- **Headers**: Same as above

---

## Features Enabled

✅ User Authentication with Supabase Auth
✅ Role-based Access Control (User/Admin)
✅ KYC Management System
✅ Strategy Management
✅ Trade History & Active Positions
✅ Bot Health Monitoring
✅ Audit Logging
✅ Feature Flags
✅ Support Tickets
✅ Real-time Database Sync

---

## Next Steps

1. Create the demo users in Supabase
2. Login with demo@spiderbot.io to access user dashboard
3. Login with admin@spiderbot.io to access admin dashboard
4. Explore the features and test the platform

For questions or issues, check the browser console for error messages.
