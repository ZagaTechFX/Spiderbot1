# SpiderBot - Institutional Crypto Trading Platform

## Overview
SpiderBot is a comprehensive crypto trading platform built with React, TypeScript, and Vite. It provides both user and admin dashboards for institutional crypto trading management.

## Project Structure
- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: TailwindCSS (via CDN)
- **Charts**: Recharts and Lightweight Charts
- **Port**: 5000 (configured for Replit environment)

## Key Features
- **Authentication System**: Role-based access control with separate user and admin interfaces
- User Dashboard with trading views, analytics, strategies, and AI optimization
- Admin Dashboard with bot management, user management, KYC, audit trails, and feature flags
- Dark/Light theme support
- Real-time trading charts
- Arbitrage monitoring
- Social trading features

## Authentication
- Mock authentication system with demo credentials
- Two user roles: 'user' and 'admin'
- Demo credentials:
  - Regular User: username `demo`, password `demo`
  - Admin User: username `admin`, password `admin`
- Authentication state persisted in localStorage
- Role-based routing: users see UserDashboard, admins see AdminDashboard

## Environment Variables
- `GEMINI_API_KEY`: Required for the application to function properly. This is used for AI-powered features in the trading platform.

## Architecture
This is a frontend-only application with no backend component. It uses:
- Vite development server running on port 5000
- Host configured as 0.0.0.0 for Replit proxy compatibility
- HMR (Hot Module Replacement) configured for port 5000

## Recent Changes (November 4, 2025)
### Initial Setup
- Imported from GitHub and configured for Replit environment
- Fixed vite.config.ts to use ES modules (__dirname issue resolved)
- Changed server port from 3000 to 5000 for Replit compatibility
- Added `allowedHosts: true` to server config for Replit proxy compatibility
- Configured HMR client port for proper hot reloading
- Set up workflow for development server
- Configured deployment with autoscale target
- GEMINI_API_KEY environment variable configured for AI features

### Authentication Implementation
- Created `contexts/AuthContext.tsx` for authentication state management
- Built `pages/LoginPage.tsx` with credential display and form validation
- Implemented `components/UserHeader.tsx` with profile dropdown and theme toggle
- Implemented `components/AdminHeader.tsx` with admin-specific options and alerts
- Updated `App.tsx` to enforce authentication before dashboard access
- Removed public "Switch to Admin View" button (security improvement)
- Added `UserRole` and `AuthContextType` to type definitions

### Trading Chart Enhancement
- Rebuilt `components/TradingChart.tsx` with professional TradingView-style interface
- Added chart type switcher: Candlestick, Line, and Area charts
- Implemented toggleable Volume and RSI indicators
- Added interactive timeframe selector (1m, 5m, 15m, 1h, 4h, 1D, 1W, 1M)
- Enhanced chart styling with better colors and professional layout
- Improved OHLCV display with real-time price tracking
- Added drawing tools interface (trend lines, horizontal lines, alerts)
- Better crosshair with customized styling and tooltips

### Institutional Algorithmic Strategy
- Expanded `AlgoStrategyConfig` interface with comprehensive institutional-grade settings
- Created advanced configuration panel with 6 categories:
  - **Core Logic**: Model selection (Trend-Following, Mean Reversion, Volatility Breakout, Pairs/Stat-Arb)
  - **Risk Management**: Portfolio-level risk controls, VaR, leverage limits, correlation filters, portfolio construction
  - **Execution**: Order management, slippage controls, circuit breakers, time filters, commission models
  - **Compliance**: Audit logging, allocation buckets, post-trade reporting, slippage monitoring
  - **Operational**: Kill switch, data feed monitoring, connectivity handling, system integrity
  - **Adaptive & Model Risk**: Parameter adaptation, performance monitoring, model validation, decay detection
- Added 40+ professional settings including:
  - Walk-forward analysis periods
  - PSI/CSI drift detection
  - Kelly Criterion capital allocation
  - Graceful shutdown modes
  - Trade rationale logging
  - Backtest/live skew monitoring

## File Organization
- `/components`: Reusable UI components (Card, Icon, ToggleSwitch, TradingChart, UserHeader, AdminHeader)
- `/contexts`: React contexts (AuthContext for authentication state)
- `/pages/LoginPage.tsx`: Authentication login page
- `/pages/user-dashboard`: User-facing trading interface (12 views)
- `/pages/admin-dashboard`: Administrative interface (8 views)
- `/types.ts`: TypeScript type definitions including authentication types
- `App.tsx`: Main application component with authentication routing and theme context
