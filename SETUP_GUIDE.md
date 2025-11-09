# SpiderBot - Complete Setup Guide

## Your Login Credentials

### Demo User Account
```
Email:    demo@spiderbot.io
Password: Demo@12345
Role:     Regular User
Portal:   http://localhost:5173/login
```

### Admin Account
```
Email:    admin@spiderbot.io
Password: Admin@12345
Role:     Administrator
Portal:   http://localhost:5173/admin
```

### Pro Trader Account
```
Email:    trader@spiderbot.io
Password: Trader@12345
Role:     Regular User
Portal:   http://localhost:5173/login
```

---

## Quick Start

### 1. Create Demo Users in Supabase

1. Open: **https://app.supabase.com**
2. Select your project: **0ec90b57d6e95fcbda19832f**
3. Go to **Authentication** → **Users**
4. Click **Invite** button for each user above

### 2. Access the Application

**Regular User**: http://localhost:5173/login
- Use demo@spiderbot.io / Demo@12345

**Admin Dashboard**: http://localhost:5173/admin
- Use admin@spiderbot.io / Admin@12345

---

## Database Access

Your Supabase project includes these tables:

- **users** - User profiles & roles
- **strategies** - Trading strategies configuration
- **active_positions** - Open trades
- **trade_history** - Completed trades
- **kyc_applications** - KYC submissions
- **bot_health** - Bot monitoring status
- **audit_logs** - Admin action history
- **feature_flags** - Feature toggles
- **support_tickets** - Support requests

### Access Database
1. Go to Supabase Dashboard
2. Click **SQL Editor**
3. Write queries to view/manage data

---

## API Endpoints

### Trading Webhook
```
POST https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/trading-webhook

Body:
{
  "strategy": "Signal Bot",
  "symbol": "BTCUSDT",
  "action": "BUY",
  "price": 50000,
  "quantity": 0.5,
  "timestamp": "2025-11-09T10:00:00Z"
}
```

### Seed Demo Users (Edge Function)
```
POST https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/seed-demo-users
```

---

## Features Ready to Use

✅ **Authentication** - Email/password login with Supabase Auth
✅ **Role-Based Access** - User and Admin roles
✅ **Strategy Management** - Create, update, delete trading strategies
✅ **Trade Tracking** - Log and monitor trades
✅ **Position Management** - Track open positions
✅ **KYC System** - User verification workflow
✅ **Bot Monitoring** - Health checks and status
✅ **Audit Logging** - Track admin actions
✅ **Feature Flags** - Toggle features on/off
✅ **Support Tickets** - User support system

---

## File Structure

```
project/
├── lib/
│   └── supabase.ts              # Supabase client
├── services/
│   ├── authService.ts           # Authentication
│   ├── strategyService.ts       # Strategy management
│   ├── tradeService.ts          # Trade operations
│   ├── userService.ts           # User profiles
│   └── adminService.ts          # Admin operations
├── contexts/
│   └── AuthContext.tsx          # Auth state management
├── supabase/
│   ├── migrations/              # Database migrations
│   └── functions/               # Edge functions
├── DEMO_LOGIN_CREDENTIALS.md    # Detailed credentials
└── setup-demo-users.html        # Setup assistant

```

---

## Environment Variables

All credentials are pre-configured in `.env`:

```
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Getting Help

1. Check browser console for errors
2. View Supabase dashboard for database issues
3. Check API response in Network tab
4. Review service files for implementation details

---

## Next Steps

1. ✅ Create demo users in Supabase
2. ✅ Login to test the application
3. ✅ Connect your exchange API keys
4. ✅ Create your first trading strategy
5. ✅ Start trading!

---

**Created**: November 9, 2025
**Version**: 1.0
**Status**: Production Ready
