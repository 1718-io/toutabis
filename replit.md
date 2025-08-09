# Overview

Celtic Voices is a community-driven content sharing platform that allows users to publish and interact with various types of contributions including stories, insights, tips, questions, and discussions. The application features a modern full-stack architecture with React frontend, Express backend, and PostgreSQL database integration through Drizzle ORM. The platform supports both authenticated and anonymous users, with Replit OAuth integration for registered users.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **State Management**: TanStack React Query for server state and local state management
- **Routing**: Wouter for lightweight client-side routing
- **Rich Text Editing**: TipTap editor with extensions for links and images
- **Internationalization**: Custom hook-based i18n system supporting English and French

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL storage
- **Authentication**: Replit OAuth with OpenID Connect integration
- **API Design**: RESTful API with JSON responses and proper error handling

## Database Schema
- **Sessions Table**: Stores user session data (required for Replit Auth)
- **Users Table**: User profiles with OAuth integration (required for Replit Auth)
- **Contributions Table**: User-generated content with categories, likes, and metadata
- **Database**: PostgreSQL with Neon serverless integration

## Authentication & Authorization
- **Primary Auth**: Replit OAuth using OpenID Connect protocol
- **Session Storage**: PostgreSQL-backed sessions with 7-day TTL
- **Anonymous Access**: Allows non-authenticated users to create contributions
- **User Management**: Automatic user profile creation and updates via OAuth

## Content Management
- **Rich Text**: HTML content storage with TipTap editor
- **Categories**: Predefined contribution types (story, insight, tip, question, discussion, other)
- **Engagement**: Like system for contributions
- **Filtering**: Category-based filtering and sorting by date/popularity

## Development & Deployment
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Development**: Hot reload with Vite dev server and tsx for backend
- **Database Migrations**: Drizzle Kit for schema management
- **Environment**: Replit-optimized with cartographer integration

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: WebSocket-based connection pooling for serverless environments

## Authentication Provider
- **Replit OAuth**: OpenID Connect integration for user authentication
- **Session Storage**: connect-pg-simple for PostgreSQL session storage

## UI & Styling
- **Radix UI**: Headless component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Google Fonts**: Inter and Cinzel font families
- **Lucide React**: Icon library for consistent iconography

## Rich Text & Media
- **TipTap**: Rich text editor with extensible plugin system
- **Image Support**: URL-based image embedding in contributions

## Development Tools
- **Vite**: Fast build tool with HMR and plugin ecosystem
- **TypeScript**: Type safety across frontend and backend
- **Replit Plugins**: Development environment integration and error handling