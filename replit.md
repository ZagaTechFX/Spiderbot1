# SpiderBot - Institutional Crypto Trading Platform

## Overview
SpiderBot is a comprehensive crypto trading platform designed for institutional crypto trading management, providing both user and admin dashboards. Its purpose is to offer advanced tools for trading, analytics, strategy implementation, and administrative oversight in the cryptocurrency market. The platform aims to provide a robust, scalable, and secure environment for institutional-grade trading operations, leveraging AI for optimization and featuring an extensive strategy marketplace.

## User Preferences
I prefer iterative development, with clear communication at each stage. Ask before making major architectural changes or introducing new significant dependencies. I prefer detailed explanations for complex technical decisions. Ensure the code is well-commented and follows best practices for maintainability and readability.

## System Architecture
The application is a frontend-only platform built with React 19.2.0 and TypeScript, using Vite 6.2.0 as the build tool. Styling is managed with TailwindCSS (via CDN).

**UI/UX Decisions:**
- **Theme Support:** Dark/Light theme toggling for user preference.
- **Responsive Design:** Mobile-first approach implemented across the entire application, utilizing Tailwind CSS breakpoints (sm, md, lg, xl) for adaptive layouts, navigation, and component sizing. This includes responsive sidebars, headers, card components, and strategy configuration panels.
- **Navigation:** Hamburger menu for mobile navigation with off-canvas slide-in sidebars.
- **Professional Interfaces:** Integration of professional-grade components like TradingView widgets for charting.

**Technical Implementations:**
- **Authentication:** A mock, role-based authentication system is in place with 'user' and 'admin' roles, persisting state in localStorage.
- **Charting:** Utilizes Recharts and Lightweight Charts, alongside a professional TradingView widget for real-time price data, 50+ technical indicators (RSI, MA, MACD, Bollinger Bands pre-loaded), advanced tools, and multiple timeframes.
- **Strategy Marketplace:** Features 11 diverse trading strategies, including Advanced DCA, Advanced Grid, Normal Grid, Normal DCA, Quantitative Strategy (institutional algorithmic), Signal Bot, TradingView Webhook Bot, Dip Analyser Bot, Trend-Following Bot, Mean Reversion Bot, and Volatility Breakout Bot. Each strategy includes comprehensive, often institutional-grade, configuration panels with extensive settings for logic, risk management, execution, compliance, and operational controls.
- **AI Optimization:** Integrated AI-powered features for trading, specifically mentioned with the `GEMINI_API_KEY`.
- **Development Environment:** Vite development server runs on port 5000, configured with HMR and `allowedHosts: true` for Replit compatibility.

**Feature Specifications:**
- **User Dashboard:** Provides trading views, analytics, strategy management, and AI optimization tools.
- **Admin Dashboard:** Offers bot management, user management, KYC, audit trails, and feature flag controls.
- **Arbitrage Monitoring & Social Trading:** Planned or existing capabilities for advanced trading.

**System Design Choices:**
- **Frontend Focus:** The project is designed as a standalone frontend application, implying interaction with external APIs for data and services rather than an integrated backend.
- **Modularity:** Components are organized into reusable UI elements, context providers for state management (e.g., AuthContext), and dedicated pages for different functionalities (login, user dashboard, admin dashboard).
- **TypeScript:** Strong typing is enforced across the codebase for improved maintainability and error detection.

## Recent Updates

### Complete Routing & Navigation Implementation (November 5, 2025)
**Implemented comprehensive URL-based routing with separate user and admin login pages:**

**Routing Architecture:**
- **React Router DOM Integration:** Installed and configured react-router-dom for client-side routing
- **Separate Login Routes:** 
  - `/login` - User login page (UserLoginPage.tsx)
  - `/admin` - Admin login page (AdminLoginPage.tsx)
- **Protected Routes:** Implemented ProtectedRoute component with role-based access control
  - `/dashboard/*` - User dashboard (requires authentication)
  - `/admin/dashboard/*` - Admin dashboard (requires authentication + admin role)
- **Smart Redirects:** Unauthenticated users are redirected to appropriate login pages based on route type
- **Logout Functionality:** Both UserHeader and AdminHeader use React Router's `useNavigate` to properly redirect users to their respective login pages on logout

**New User Dashboard Views (6 total):**
1. **Backtesting View** - Strategy backtesting against historical data with configurable parameters, timeframes, and performance metrics display
2. **Risk Assessment View** - Portfolio risk monitoring with VaR, Expected Shortfall, leverage exposure, position risk analysis, and alert system
3. **Advanced View** - Professional-grade features including API trading, smart order routing, market making, arbitrage scanning, portfolio rebalancing, and WebSocket status
4. **My Wallet View** - Asset management with balance overview, transaction history, deposit/withdrawal functionality, and portfolio performance tracking
5. **Support View** - Help desk with ticket submission, FAQ section, live chat access, and ticket management
6. **Community View** - Social platform integration (Discord, Telegram, Twitter, Reddit), community events, leaderboards, and trading competitions

**New Admin Dashboard Views (3 total):**
1. **Performance Metrics View** - Platform KPIs including user growth, active bots, trading volume, revenue trends, uptime, and response times
2. **System Status View** - Real-time platform health monitoring with service status, uptime tracking, response times, and resource usage (CPU, memory, disk)
3. **Support Tickets View** - Ticket management system with filtering, priority levels, assignment tracking, and ticket statistics

**Technical Implementation:**
- All views fully integrated into UserDashboard.tsx and AdminDashboard.tsx routing logic
- Consistent UI/UX across all views with dark mode support and responsive design
- Professional styling with Tailwind CSS maintaining the platform's design system
- Interactive components with state management for dynamic content
- Role-based access control ensures proper security boundaries between user and admin functions

**Code Quality:**
- TypeScript compliance across all new components
- React best practices and hooks usage (useState, useEffect, useNavigate, useContext)
- Modular component structure for maintainability
- Architect-reviewed and verified for production readiness

### UI/UX Improvements - Strategy Configuration Panels (November 5, 2025)
**Standardized and enhanced styling across all bot configuration panels for improved usability:**

**Visual Enhancements:**
- Increased content area max-height from `60vh` to `65vh` for better visibility
- Enhanced padding from `p-3 sm:p-4` to `p-4 sm:p-6` for improved spacing
- Increased field spacing from `space-y-3` to `space-y-4` for better readability
- Improved input field styling:
  - Larger padding (`px-3 py-2.5`) for better touch targets
  - Better color contrast for labels (`text-gray-700 dark:text-gray-300`)
  - Rounded corners (`rounded-lg`) for modern appearance
  - Enhanced focus states with 2px ring
  - Smooth color transitions on all interactive elements
- Better unit label styling with medium font weight
- More readable help text with improved line-height (`leading-relaxed`)
- Consistent gap spacing (`gap-2`) between inputs and units

**Affected Components:**
- Signal Bot Configuration (6 tabs, 60+ settings) - **FULLY FUNCTIONAL**
- TradingView Webhook Configuration (4 tabs, 30+ settings)
- Dip Analyser Configuration (4 tabs, 40+ settings)
- All strategy configuration panels now have consistent styling

**Result:** Professional, clean interface with improved usability and mobile responsiveness across all bot configuration panels.

## External Dependencies
- **React 19.2.0 & TypeScript:** Core frontend development stack.
- **React Router DOM 7.0.2:** Client-side routing and navigation library.
- **Vite 6.2.0:** Build tool for development and production.
- **TailwindCSS (via CDN):** Utility-first CSS framework for styling.
- **Recharts & Lightweight Charts:** Charting libraries.
- **react-ts-tradingview-widgets:** For integrating professional TradingView charts.
- **Gemini API:** Used for AI-powered features, requiring `GEMINI_API_KEY`.
- **Binance Exchange:** Real-time price data source for TradingView widgets.
- **Telegram/Discord/Custom API:** Potential signal sources for the Signal Bot.