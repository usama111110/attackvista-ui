
# NetworkFort - Network Security Monitoring Dashboard

NetworkFort is a comprehensive network security monitoring dashboard that helps security professionals detect, analyze, and respond to cyber threats in real-time.

![NetworkFort Logo](/lovable-uploads/0b1a2317-fbf9-4d89-966f-576b38323114.png)

## 📚 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Components Overview](#components-overview)
- [Pages Overview](#pages-overview)
- [Authentication](#authentication)
- [Theming](#theming)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🌟 Introduction

NetworkFort is a modern web application built with React, TypeScript, and Tailwind CSS to provide network administrators and security professionals with a powerful dashboard for monitoring and responding to security threats.

The application offers real-time visibility into network traffic, attack detection, user activity, and system health, helping organizations enhance their security posture and respond quickly to potential threats.

## 🚀 Features

- **Dashboard Overview**: Get a quick snapshot of your network security status
- **Attack Detection**: Identify and analyze different types of attacks
- **Live Traffic Monitoring**: Watch network traffic in real-time
- **Network Visualization**: See your network topology and connections
- **User Management**: Monitor and manage user activities
- **Dark/Light Mode**: Toggle between dark and light themes for better visibility
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Default Login

Use the following credentials to log in:
- **Email**: admin@networkfort.com
- **Password**: password123

## 📂 Project Structure

```
src/
│
├── components/       # Reusable UI components
│   ├── ui/           # Basic UI elements (buttons, cards, etc.)
│   └── ...           # Feature-specific components
│
├── hooks/            # Custom React hooks
│
├── lib/              # Utility functions and libraries
│
├── pages/            # Application pages/routes
│
├── providers/        # Context providers
│
├── utils/            # Helper functions
│
├── App.tsx           # Main application component
│
└── main.tsx          # Application entry point
```

## 🧩 Components Overview

### UI Components

- **Card**: Container for displaying grouped information
- **Button**: Interactive button elements
- **Dashboard Layout**: Main layout structure for the application

### Feature Components

- **AttackChart**: Visualizes attack metrics over time
- **AttackTypesVisualization**: Shows distribution of different attack types
- **AttackInsights**: Provides analysis of detected attacks
- **LiveTrafficGraph**: Displays real-time network traffic
- **ThreatMap**: Geographical visualization of attack sources
- **SecurityScore**: Summary of overall security health

## 📄 Pages Overview

- **Dashboard (/)**: Overview of security metrics and alerts
- **Detection (/detection)**: Detailed view of detected attacks 
- **Live Traffic (/live-traffic)**: Real-time monitoring of network traffic
- **Network (/network)**: Network topology and connections
- **Users (/users)**: User management and activities
- **Settings (/settings)**: Application configuration
- **Notifications (/notifications)**: System and security notifications
- **Login (/login)**: Authentication page

## 🔐 Authentication

NetworkFort uses a simple authentication system with JWT tokens. User credentials are validated and upon successful authentication, a token is stored in the application state using the `useUserStore` hook.

The authentication flow is handled in the Login page and MainNav component, which checks for user authentication status on protected routes.

## 🎨 Theming

The application supports both dark and light modes, controlled by the ThemeProvider. 

### Theme Switching

The theme can be toggled in the Settings page. The ThemeProvider manages the current theme state and applies the appropriate CSS classes to the application.

### CSS Variables

The theme is implemented using CSS variables defined in `index.css`. These variables control colors, spacing, and other visual aspects of the application.

## 💻 Development Guidelines

### Adding New Components

1. Create a new file in the appropriate directory
2. Export the component as the default export
3. Use TypeScript interfaces for props
4. Follow the existing styling patterns using Tailwind CSS

### Adding New Pages

1. Create a new file in the `pages` directory
2. Use the DashboardLayout component for consistency
3. Add the route to the main navigation in `main-nav.tsx`

### State Management

- Use React's built-in state management (useState, useContext) for component-level state
- Use zustand (via custom stores like useUserStore) for application-wide state

## ❓ Troubleshooting

### Common Issues

- **Authentication Problems**: Check if the user token is valid and not expired
- **Visualization Issues**: Ensure data is properly formatted for chart components
- **Styling Inconsistencies**: Verify that the correct theme classes are applied

### Debugging

- Check browser console for errors
- Use React DevTools to inspect component state
- Review network requests for API issues

## 🤝 Contributing

We welcome contributions to NetworkFort! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please follow the existing code style and include appropriate tests for new features.

---

This project was created with [Lovable](https://lovable.dev).
