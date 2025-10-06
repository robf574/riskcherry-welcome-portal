# RiskCherry Welcome Portal

A secure client onboarding portal for RiskCherry certification services. This portal guides clients through the complete onboarding process from legal & commercial setup to lab & technical configuration.

## Features

- **Secure Token Access**: Protected portal requiring access token
- **Legal & Commercial Onboarding**: Complete legal documentation and commercial setup
- **Lab & Technical Onboarding**: Technical configuration and portal access
- **Progress Tracking**: Visual progress indicators and completion status
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/robf574/riskcherry-welcome-portal.git
cd riskcherry-welcome-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
```

### Deployment

The portal is deployed to GitHub Pages at:
**https://robf574.github.io/riskcherry-welcome-portal/**

To deploy updates:
```bash
npm run deploy
```

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── TokenAccess.tsx # Authentication component
│   ├── OnboardingSelector.tsx # Main onboarding interface
│   └── ...
├── pages/              # Page components
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is proprietary software owned by RiskCherry.

## Support

For support and questions, contact your RiskCherry representative.