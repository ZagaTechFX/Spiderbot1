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
- User Dashboard with trading views, analytics, strategies, and AI optimization
- Admin Dashboard with bot management, user management, KYC, audit trails, and feature flags
- Dark/Light theme support
- Real-time trading charts
- Arbitrage monitoring
- Social trading features

## Environment Variables
- `GEMINI_API_KEY`: Required for the application to function properly. This is used for AI-powered features in the trading platform.

## Architecture
This is a frontend-only application with no backend component. It uses:
- Vite development server running on port 5000
- Host configured as 0.0.0.0 for Replit proxy compatibility
- HMR (Hot Module Replacement) configured for port 5000

## Recent Setup (November 4, 2025)
- Imported from GitHub and configured for Replit environment
- Fixed vite.config.ts to use ES modules (__dirname issue resolved)
- Changed server port from 3000 to 5000 for Replit compatibility
- Added `allowedHosts: true` to server config for Replit proxy compatibility
- Configured HMR client port for proper hot reloading
- Set up workflow for development server
- Configured deployment with autoscale target
- GEMINI_API_KEY environment variable configured for AI features

## File Organization
- `/components`: Reusable UI components (Card, Icon, ToggleSwitch, TradingChart)
- `/pages/user-dashboard`: User-facing trading interface
- `/pages/admin-dashboard`: Administrative interface
- `/types.ts`: TypeScript type definitions
- `App.tsx`: Main application component with theme context and view switching
