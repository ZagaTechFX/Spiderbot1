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

### Advanced Trading Chart Implementation (November 5, 2025)
**Upgraded from TradingChart to AdvancedTradingChart with institutional-grade features:**

**New Technical Indicators:**
- **EMA (Exponential Moving Average)**: 9, 21, and 50 period EMAs
- **Bollinger Bands**: 20-period with 2 standard deviations (upper, middle, lower bands)
- **MACD (Moving Average Convergence Divergence)**: 12/26/9 with signal line and histogram
- **RSI (Relative Strength Index)**: 14-period with overbought (70) and oversold (30) levels
- **Volume**: Histogram with buy/sell coloring

**Advanced Features:**
- **Indicator Menu**: Dropdown panel with 6+ technical indicators
- **Multi-Indicator Support**: Toggle multiple indicators simultaneously
- **Active Indicators Badge**: Visual display of currently active indicators with quick remove
- **Professional Calculations**: 
  - EMA calculation with proper multipliers
  - Bollinger Bands with variance and standard deviation
  - MACD with fast/slow EMA and signal line
  - Histogram visualization for MACD divergence
- **Chart Types**: Candlestick, Line, and Area charts
- **Timeframe Selector**: 1m, 5m, 15m, 1h, 4h, 1D, 1W, 1M
- **OHLCV Display**: Real-time Open, High, Low, Close, Volume with price change percentage
- **Drawing Tools**: Trend lines, horizontal lines, price alerts
- **Responsive Design**: Mobile-optimized controls and layout
- **Theme Support**: Full dark/light theme integration
- **Auto-Resize**: Chart automatically adjusts to container size with ResizeObserver

**Technical Implementation:**
- Created `components/AdvancedTradingChart.tsx` (700+ lines)
- Integrated lightweight-charts library with custom indicator calculations
- Updated `pages/user-dashboard/StrategiesView.tsx` to use AdvancedTradingChart
- Professional-grade chart suitable for institutional trading platforms
- All indicators calculate in real-time from price data

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

### Strategy Marketplace Expansion (November 4, 2025)
Expanded from 4 to 11 total strategies with comprehensive configuration panels:

**New Strategies Added:**
1. **Normal Grid Bot** - Simplified grid trading with basic upper/lower price ranges
2. **Normal DCA Bot** - Basic dollar-cost averaging with simple safety orders
3. **TradingView Webhook Bot** - 30+ settings including webhook URL, alert parser, execution controls, compliance
4. **Dip Analyser Bot** - 40+ institutional settings with Smart Money Concepts, TWAP execution, forced accumulation
5. **Trend-Following Bot** - EMA Crossover + ATR Filter with trailing stops
6. **Mean Reversion Bot** - Z-Score + RSI Bands for ranging markets
7. **Volatility Breakout Bot** - Donchian/Keltner channel breakouts with time-of-day filters

**Implementation Details:**
- Created `StrategyConfigPanelLayout` component with tabbed interface for complex strategies
- Added 7 new TypeScript interfaces to `types.ts`:
  - `NormalGridConfig`, `NormalDCAConfig`
  - `TrendFollowingConfig`, `MeanReversionConfig`, `VolatilityBreakoutConfig`
  - `TradingViewWebhookConfig`, `DipAnalyserConfig`, `SignalBotConfig`
- Created dedicated config panel components in `components/strategies/`:
  - NormalGridConfigPanel, NormalDCAConfigPanel
  - TrendFollowingConfigPanel, MeanReversionConfigPanel, VolatilityBreakoutConfigPanel
  - TradingViewWebhookConfigPanel, DipAnalyserConfigPanel
- Updated `StrategyType` to include all 11 strategy types
- Implemented `getDefaultConfig()` function with sensible defaults for each strategy
- Updated `renderConfigPanel()` to route to appropriate config panels

**Strategy Marketplace Total: 11 Strategies**
1. Advanced DCA ✅
2. Advanced Grid ✅
3. Normal Grid ✅ (NEW)
4. Normal DCA ✅ (NEW)
5. Quantitative Strategy ✅ (institutional algorithmic)
6. Signal Bot ✅
7. TradingView Webhook Bot ✅ (NEW)
8. Dip Analyser Bot ✅ (NEW)
9. Trend-Following Bot ✅ (NEW)
10. Mean Reversion Bot ✅ (NEW)
11. Volatility Breakout Bot ✅ (NEW)

### Comprehensive Responsive Design Implementation (November 4, 2025)
Implemented mobile-first responsive design across the entire application to support all screen sizes from mobile (320px+) to desktop (1920px+).

**Core Layout Updates:**
- **Mobile Navigation**: Implemented hamburger menu for mobile devices with sliding sidebar and backdrop overlay
- **Responsive Sidebars**: 
  - Desktop: Fixed sidebar (w-64 or w-20 when collapsed)
  - Mobile/Tablet: Off-canvas sidebar with slide-in animation, hidden by default
  - Added close button for mobile, collapse button for desktop
- **Dashboard Shells**: Both UserDashboard and AdminDashboard now support mobile menu state management
- **Backdrop Overlay**: Added semi-transparent backdrop for mobile menu with click-to-close functionality

**Header Enhancements:**
- **UserHeader & AdminHeader**: 
  - Added hamburger menu button (visible on mobile only)
  - Responsive title sizes (text-lg sm:text-xl md:text-2xl)
  - Hidden secondary elements on small screens (notifications, theme toggle visible on sm+ only)
  - Responsive avatar sizes (h-7 sm:h-8)
  - Profile dropdown width adjusts (w-64 sm:w-72) with max-height and scroll
  - Responsive spacing (px-3 sm:px-4 md:px-6, py-3 sm:py-4)

**Component-Level Responsive Updates:**
- **Card Component**: Responsive padding (p-3 sm:p-4 md:p-6) and border radius (rounded-lg sm:rounded-xl)
- **StrategyConfigPanelLayout**:
  - Responsive tab sizing (px-3 sm:px-4, text-xs sm:text-sm)
  - Horizontal scroll for tabs on narrow screens
  - Stacked buttons on mobile (flex-col sm:flex-row)
  - Full-width buttons on mobile (w-full sm:w-auto)
- **LoginPage**: 
  - Responsive container padding and sizing
  - Adaptive input fields (px-3 sm:px-4, py-2.5 sm:py-3)
  - Responsive text sizes throughout
  - Adjusted background blur circles for mobile

**Responsive Breakpoints Used:**
- **Mobile**: Default (320px+) - Single column layouts, stacked elements, hamburger menu
- **Small (sm:)**: 640px+ - Two-column grids, visible secondary elements
- **Medium (md:)**: 768px+ - Three-column grids, expanded spacing, visible profile details
- **Large (lg:)**: 1024px+ - Sidebar always visible, desktop collapse button, full layouts
- **Extra Large (xl:)**: 1280px+ - Maximum content widths, optimal desktop experience

**Layout Patterns Implemented:**
- Mobile-first approach with progressive enhancement
- Flexible grid systems that stack on mobile
- Touch-friendly button sizes (minimum 44px tap targets)
- Horizontal scrolling for wide content (tabs, tables)
- Collapsible sections and accordions for mobile
- Responsive typography scaling
- Adaptive spacing (margins and padding scale with breakpoints)

**All Views Responsive:**
- ✅ LoginPage - Full responsive design
- ✅ UserDashboard - 12 views with responsive Card-based layouts
- ✅ AdminDashboard - 8 views with responsive Card-based layouts
- ✅ All 11 Strategy Configuration Panels - Responsive tabs and forms
- ✅ TradingChart - Auto-resize with ResizeObserver
- ✅ Headers, Sidebars, Dropdowns - Full mobile support

**Technical Implementation:**
- Tailwind CSS responsive utility classes (sm:, md:, lg:, xl: prefixes)
- CSS transforms for sidebar animations (translate-x-full, translate-x-0)
- Flexbox and CSS Grid with responsive direction changes
- Conditional rendering for mobile vs desktop elements
- State management for mobile menu visibility
- Touch-optimized interactions

## File Organization
- `/components`: Reusable UI components (Card, Icon, ToggleSwitch, TradingChart, UserHeader, AdminHeader)
- `/contexts`: React contexts (AuthContext for authentication state)
- `/pages/LoginPage.tsx`: Authentication login page
- `/pages/user-dashboard`: User-facing trading interface (12 views)
- `/pages/admin-dashboard`: Administrative interface (8 views)
- `/types.ts`: TypeScript type definitions including authentication types
- `App.tsx`: Main application component with authentication routing and theme context
