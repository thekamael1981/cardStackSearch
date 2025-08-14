# Binary Search Card Simulator

## Overview

This is a React-based educational application that visualizes binary search algorithms through an interactive card deck simulation. The application demonstrates how binary search works by allowing users to input a sorted sequence of cards and a target value, then step through the search process with visual feedback and detailed explanations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: Custom React hooks with local state
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured but using in-memory storage currently)
- **Session Management**: Express sessions with PostgreSQL session store
- **API Design**: RESTful API structure with `/api` prefix
- **Development**: Hot module replacement with Vite integration

### Component Structure
The application uses a modular component architecture with:
- **UI Components**: Reusable shadcn/ui components in `/components/ui/`
- **Feature Components**: Specialized components for the simulation (`card-deck`, `control-panel`, `step-history`, `simulation-results`)
- **Pages**: Route-specific components in `/pages/`
- **Hooks**: Custom React hooks for business logic (`use-binary-search`, `use-toast`)

## Key Components

### Data Schema
- **SimulationStep**: Tracks each step in the binary search process including action type, selected cards, and comparisons
- **SimulationResult**: Contains final results including success status, total steps, and efficiency metrics
- **CardSequence**: Validates input card sequences and target values

### Binary Search Logic
- **Algorithm Implementation**: Custom binary search with step-by-step tracking
- **Visualization States**: Different card states (available, selected, found, removed)
- **Progress Tracking**: Detailed history of search steps with descriptions and statistics

### User Interface
- **Control Panel**: Input forms for card sequences and target values with validation
- **Card Deck Visualization**: Interactive display showing current search state
- **Step History**: Timeline of all search steps with visual indicators
- **Results Display**: Summary statistics and search efficiency metrics

## Data Flow

1. **Input Processing**: User enters card sequence and target value through the control panel
2. **Validation**: Input is parsed and validated for correct format and sorting
3. **Algorithm Execution**: Binary search algorithm generates all steps upfront
4. **Step Navigation**: User can step through the search process one step at a time
5. **Visualization Updates**: Card deck and history components update based on current step
6. **Results Display**: Final statistics are shown when search completes

## External Dependencies

### UI/Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI primitives for accessibility
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe CSS class composition

### Development Tools
- **TypeScript**: Type safety across the entire application
- **Vite**: Fast build tool with HMR support
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind

### Backend Dependencies
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Runtime type validation
- **Neon Database**: Serverless PostgreSQL (configured for future use)

## Deployment Strategy

### Build Process
- **Client Build**: Vite builds the React application to `dist/public`
- **Server Build**: ESBuild bundles the Express server to `dist/index.js`
- **Type Checking**: TypeScript compilation validation without emit

### Environment Configuration
- **Development**: Hot module replacement with Vite dev server
- **Production**: Static file serving with Express
- **Database**: PostgreSQL connection via environment variables (DATABASE_URL)

### Development Workflow
- **Local Development**: `npm run dev` starts both client and server with HMR
- **Type Safety**: Shared TypeScript types between client and server
- **Database Migrations**: Drizzle Kit for schema management
- **Code Quality**: Structured with path aliases and consistent imports

The application is designed for educational purposes, focusing on making binary search algorithms understandable through interactive visualization and step-by-step explanations.