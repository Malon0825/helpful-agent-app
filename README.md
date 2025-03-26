# AI Chat Application

A modern, responsive chat application for AI agent interaction with a sleek UI and smooth animations.

## Features

- **Responsive Design** - Optimized for mobile, tablet, and desktop screens
- **Conversation Management** - Switch between multiple chat conversations
- **Theme Customization** - Change the accent color to personalize your experience
- **Smooth Animations** - Enjoy fluid transitions and message animations
- **API Integration** - Connects to a .NET 8 backend

## Technology Stack

- **Frontend**:
  - React 18+
  - TypeScript
  - Tailwind CSS
  - Vite

- **Backend** (separate repository):
  - .NET 8
  - API endpoints for chat interaction

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd ai-chat-app

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start the development server
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` in your browser to see the app.

### Building for Production

```bash
# Build the app
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── components/
│   ├── Chat/              # Chat-related components
│   ├── Common/            # Reusable UI components
│   ├── Layout/            # Layout components
│   └── Sidebar/           # Sidebar components
├── context/               # React context providers
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── assets/                # Static assets
```

## Customization

- **Theme**: Modify the accent color through the user interface
- **Animations**: Animation settings can be adjusted in `tailwind.config.js`

## License

[MIT License](LICENSE)
