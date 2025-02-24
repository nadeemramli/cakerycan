# CakeryCan E-commerce Platform

A full-stack e-commerce platform for selling cake products with a customer-facing storefront and an admin backend for business operations.

## Project Vision

See [VISION.md](VISION.md) for detailed information about:
- Core purpose and objectives
- Target audiences
- Key features prioritization
- Success metrics

All development should align with this vision document.

## Project Structure

This is a monorepo containing:

- **Customer-facing website** (`apps/frontend`): The main e-commerce site at cakerycan.com
- **Admin panel** (`apps/admin`): Business operations dashboard at order.cakerycan.com
- **Shared packages** (`packages/*`): Common code used across applications

## Technology Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel
- **Package Management**: Yarn Workspaces

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn 1.22+
- Supabase account
- Vercel account

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/cakerycan.git
   cd cakerycan
   ```

2. Install dependencies
   ```
   yarn install
   ```

3. Set up environment variables
   - Copy `.env.example` to `.env.local` in both app directories
   - Fill in your Supabase credentials

4. Run the development servers
   ```
   # For customer website
   yarn dev:frontend
   
   # For admin panel
   yarn dev:admin
   ```

### Local Development

- Customer website runs on: http://localhost:3000
- Admin panel runs on: http://localhost:3001

## Project Commands

```
# Development
yarn dev:frontend     # Run frontend development server
yarn dev:admin        # Run admin development server

# Building
yarn build:packages   # Build shared packages
yarn build:frontend   # Build frontend for production
yarn build:admin      # Build admin panel for production
yarn build            # Build everything

# Deployment
# Handled automatically by Vercel
```

## File Structure
Database schema and migrations → /supabase/migrations
TypeScript types and services → /packages/database
Admin UI components → /apps/admin
Frontend UI components → /apps/frontend


## Deployment

This project is deployed to Vercel with the following setup:

- **Frontend**: Deployed to cakerycan.com
- **Admin**: Deployed to order.cakerycan.com

Each directory is configured as a separate Vercel project but shares the same GitHub repository.

## Database Schema

The main database tables include:
- users
- products
- categories
- orders
- order_items
- inventory
- blog_posts

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit your changes: `git commit -m 'Add amazing feature'`
3. Push to the branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## License

[MIT License](LICENSE)