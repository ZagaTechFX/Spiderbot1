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

## External Dependencies
- **React 19.2.0 & TypeScript:** Core frontend development stack.
- **Vite 6.2.0:** Build tool for development and production.
- **TailwindCSS (via CDN):** Utility-first CSS framework for styling.
- **Recharts & Lightweight Charts:** Charting libraries.
- **react-ts-tradingview-widgets:** For integrating professional TradingView charts.
- **Gemini API:** Used for AI-powered features, requiring `GEMINI_API_KEY`.
- **Binance Exchange:** Real-time price data source for TradingView widgets.
- **Telegram/Discord/Custom API:** Potential signal sources for the Signal Bot.