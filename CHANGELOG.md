# Changelog

All notable changes to the CakeryCan project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project structure with monorepo setup
- Next.js application scaffolding for frontend and admin panel
- Shared packages for UI components, utilities, and database access
- Supabase integration for database and authentication
- Environment variable templates
- Vercel deployment configuration
- Basic UI components library with Button and Card components
- Database schema types for TypeScript integration
- Project documentation (README.md and CHANGELOG.md)
- Implemented MDX-based blog system
  - Added dynamic blog post rendering with MDX
  - Created blog listing page with category filtering
  - Implemented SEO optimization for blog posts
  - Added social sharing functionality
  - Set up proper image handling with next/image
  - Added responsive design for all blog pages
- Created custom 404 page with bakery theme
- Added client-side share buttons component
- Implemented proper metadata handling for SEO
- Added image optimization with remotePatterns configuration

### Design System & Components
- Implemented centralized design tokens system for consistent styling
- Created placeholder brand components with easy update path
- Set up semantic color system with background, text, and border variants
- Added flexible typography system with configurable fonts and sizes
- Implemented responsive container utilities
- Created reusable Logo component with size and variant props
- Built responsive header with frosted glass effect and navigation
- Added footer component with configurable link sections
- Implemented main navigation with hover states and transitions
- Enhanced animation system with custom keyframes:
  - Subtle bounce effects for UI elements
  - Floating animations for visual hierarchy
  - Wiggle animations for interactive elements
  - Pulse scaling for emphasis
  - Slide-up fade for smooth entrances

### E-commerce Features
- Implemented complete order flow system:
  - Location selection with interactive map
  - Product selection and cart management
  - Checkout process with form validation
  - Payment integration with CHIP API
  - Order confirmation and thank you page
- Added state management using Zustand:
  - Cart store for managing items and region
  - User store for authentication and profile data
- Created interactive pricing table with hover effects
- Implemented social media integration:
  - TikTok and Instagram embeds
  - Live schedule display
  - Social media links

### User Interface & Experience
- Developed animated components:
  - Interactive order flow with step tracking
  - Animated pricing cards with hover states
  - Social media presence section
  - Progress tracker with visual feedback
- Enhanced homepage with:
  - Welcoming hero section with animations
  - Interactive action buttons
  - Animated pricing table
  - Visual order flow guide
- Added micro-interactions:
  - Hover effects on all interactive elements
  - Loading states and transitions
  - Emoji reactions for user engagement
  - Visual feedback for user actions

### Layout & Structure
- Set up page routing structure for e-commerce frontend:
  - Home page with animated sections
  - Browse Menu section with subcategories
  - Location page with interactive map
  - About Us page
  - Help section with multiple subpages
  - Order flow pages with progress tracking
- Implemented responsive grid system
- Added custom scrollbar styling
- Created flexible spacing system

### Technical Setup
- Configured Yarn workspaces
- Set up TypeScript for all packages
- Added build scripts for local and production environments
- Configured monorepo for Vercel deployment
- Integrated Tailwind CSS with design tokens
- Set up component-based architecture with proper type definitions
- Added client-side navigation with Next.js App Router

### Developer Experience
- Added placeholder components for pending brand assets
- Implemented maintainable and scalable design token structure
- Set up consistent spacing and typography scales
- Created semantic class naming convention for better maintainability
- Enhanced animation system with reusable utilities
- Added comprehensive type definitions for all components

### Changed
- Updated image configuration to use remotePatterns instead of domains
- Moved client-side components to separate files with 'use client' directive
- Enhanced blog post layout with better typography and spacing
- Improved error handling in blog post fetching

### Fixed
- Resolved client/server component conflicts in blog pages
- Fixed image loading issues by switching to Unsplash images
- Corrected metadata configuration in root layout
- Fixed build issues related to MDX processing

## Blog System Implementation Guide

### Content Organization
- Blog posts are stored as MDX files in `src/content/blog/`
- Each post includes frontmatter for metadata:
  - title
  - excerpt
  - coverImage
  - date
  - readTime
  - category
  - author information
  - SEO metadata

### Required Dependencies
```bash
yarn add next-mdx-remote@5.0.0
yarn add unified remark-parse remark-rehype rehype-stringify
yarn add rehype-autolink-headings rehype-slug rehype-prism-plus
```

### Key Features
- Dynamic content loading with MDX
- Category-based filtering
- Responsive image handling
- Social sharing integration
- SEO optimization
- Author attribution
- Reading time estimation

### Creating New Posts
1. Create a new `.mdx` file in `src/content/blog/`
2. Add required frontmatter metadata
3. Write content using Markdown with optional JSX
4. Add images to public directory or use Unsplash URLs
5. Preview in development environment
6. Deploy to production

### SEO Best Practices
- Proper meta tags implementation
- OpenGraph data for social sharing
- Canonical URLs support
- Keyword optimization
- Sitemap generation
- Robots.txt configuration

### Benefits Over Traditional CMS
- Version control for content
- Developer-friendly workflow
- Better performance
- No database required
- Easy backup and restoration
- Markdown-based editing

### Deployment
- Deployed to Vercel, Supabase, and Cloudflare
- To ensure the reverse proxy is working properly, at Cloudflare, we need to setup the TLS/SSL settings to Full, instead of using the default setting of Flexible.


### Future Improvements
- [ ] Implement tag system, uses the Zaraz tag manager from Cloudflare.
- [ ] Add related posts feature
- [ ] Create RSS feed
- [ ] Add comment system
- [ ] Implement analytics tracking
- [ ] Submit sitemap at Google Search Console

### Authentication & Layout
- Implemented secure authentication system with Supabase
- Created responsive layout structure with collapsible sidebar
- Added protected routes with server-side authentication checks
- Implemented role-based access control (admin only access)

### Dashboard Overview
- Created main dashboard with key metrics display
  - Total Revenue
  - Active Orders
  - Inventory Status
  - Active Customers
- Implemented responsive grid layout for metrics cards
- Added data visualization for key performance indicators

### Product Management System
1. Recipe Builder
   - Multi-step form for creating and editing recipes
   - Dynamic ingredient management
   - Step-by-step instruction builder
   - Tools and equipment selection
   - Preview functionality

2. Product List
   - Searchable product catalog
   - Filtering by category and status
   - Actions: View, Edit, Duplicate, Delete
   - Status indicators (Active, Draft, Archived)
   - Last modified tracking

3. Inventory Manager
   - Real-time stock level monitoring
   - Low stock alerts with visual indicators
   - Stock threshold management
   - Supplier association
   - Reorder functionality
   - Filtering by supplier and stock status

4. Supplier Management
   - Comprehensive supplier directory
   - Performance metrics tracking
   - Contact information management
   - Order history
   - Active orders tracking
   - Reliability metrics
   - Product catalog per supplier

5. Analytics Dashboard
   - Revenue tracking with trend indicators
   - Top performing products analysis
   - Inventory metrics
   - Production efficiency metrics
   - Capacity utilization tracking
   - Time-range selection for data analysis

### User Stories

#### Authentication
- As an admin user, I want to securely log in to access the dashboard
- As a system admin, I want to ensure only authorized users can access the admin panel
- As an admin, I want to be able to log out securely

#### Dashboard
- As an admin, I want to see key metrics at a glance
- As an admin, I want to quickly navigate to different sections of the admin panel
- As an admin, I want to track real-time business performance

#### Recipe Management
- As a baker, I want to create new recipes with detailed ingredients and steps
- As a baker, I want to duplicate existing recipes to create variations
- As a baker, I want to edit recipes to improve them over time
- As an admin, I want to track which recipes are active or in draft

#### Inventory Management
- As an inventory manager, I want to track stock levels of all ingredients
- As an inventory manager, I want to be alerted when stock is running low
- As an inventory manager, I want to quickly reorder items from suppliers
- As an admin, I want to see inventory value and turnover metrics

#### Supplier Management
- As a procurement manager, I want to manage supplier information and performance
- As a procurement manager, I want to track supplier reliability
- As an inventory manager, I want to see which products each supplier provides
- As an admin, I want to analyze supplier performance metrics

#### Analytics
- As an admin, I want to track revenue and growth trends
- As a production manager, I want to monitor production efficiency
- As an inventory manager, I want to analyze stock turnover rates
- As an admin, I want to identify top-performing products

### Technical Improvements
- Implemented responsive design for all components
- Added error handling and loading states
- Implemented real-time data updates
- Added search and filtering capabilities
- Implemented data visualization components
- Added tooltips for better UX
- Implemented proper form validation
- Added success/error notifications using toast messages

### Next Steps
- Implement order management system
- Add customer relationship management
- Implement production scheduling
- Add reporting and export functionality
- Implement batch tracking system
- Add inventory cost analysis
- Implement recipe costing calculator
- Add user management system


