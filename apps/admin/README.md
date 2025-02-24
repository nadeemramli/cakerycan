# CakeryCan Admin Panel

The administrative interface for CakeryCan, providing tools for product management, inventory control, and order processing.

## Features

- **Product Management**
  - Create and edit products with recipes
  - Manage ingredient inventory
  - Track stock levels automatically
  - Upload product images
  - Set pricing and descriptions

- **Inventory Control**
  - Track ingredient stock levels
  - Set low stock thresholds
  - Receive alerts for low inventory
  - View production capacity calculations
  - Bulk update stock levels

- **Order Management**
  - View and process incoming orders
  - Track order status
  - Manage delivery schedules
  - View customer information

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn 1.22+
- Supabase account and project
- Environment variables setup

### Environment Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Installation

1. From the root directory, install dependencies:
```bash
yarn install
```

2. Build shared packages:
```bash
yarn build:packages
```

3. Start the development server:
```bash
yarn dev:admin
```

The admin panel will be available at [http://localhost:3001](http://localhost:3001)

### First-time Setup

1. Create an admin account:
```typescript
import { createAuthService } from 'database';

const auth = createAuthService();

// First, sign up as a regular user
await auth.signUp('admin@example.com', 'secure-password');

// Then, use the Supabase dashboard or another admin account to set the role
await auth.setUserRole(userId, 'admin');
```

2. Run database migrations:
   - Navigate to your Supabase dashboard
   - Go to SQL Editor
   - Run the migrations in order:
     1. `packages/database/src/migrations/00001_product_management.sql`
     2. `packages/database/src/migrations/00002_security_policies.sql`

## Development

### Project Structure

```
apps/admin/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── services/        # Admin-specific services
│   ├── styles/          # CSS and styling
│   └── lib/             # Utilities and helpers
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

### Key Components

- `AdminProductManagementService`: Handles all product and inventory operations
- `AuthService`: Manages authentication and role-based access
- Product Management UI: Create and edit products with their recipes
- Inventory Management UI: Track and update ingredient stock levels
- Order Processing UI: Handle customer orders and delivery scheduling

### Security

The admin panel uses Row Level Security (RLS) policies to ensure:
- Only admin users can access management features
- Secure data access and modifications
- Role-based access control

### Available Scripts

```bash
# Development
yarn dev:admin         # Start development server

# Building
yarn build:admin      # Build for production

# Testing
yarn test:admin       # Run tests
yarn lint:admin       # Run linter
```

## Deployment

The admin panel is deployed to Vercel and can be accessed at [order.cakerycan.com](https://order.cakerycan.com).

### Deployment Checklist

1. Ensure all environment variables are set in Vercel
2. Verify database migrations are applied
3. Test admin access and permissions
4. Check security policies are in place

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## Support

For issues or questions:
1. Check the documentation
2. Contact the development team
3. Submit an issue in the repository
