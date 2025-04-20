# Technical Context: QR Menu SaaS

## Technology Stack

### Frontend
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React Hook Form for form management
- Zod for validation
- Heroicons for icons
- Client-side image processing

### Backend
- Supabase for:
  * PostgreSQL database
  * Authentication
  * Storage
  * Row-level security
  * Real-time subscriptions

### Development Tools
- VS Code
- ESLint
- Prettier
- TypeScript
- Git

## Database Schema

### Tables

#### users
- id: uuid (PK)
- email: string
- created_at: timestamp

#### profiles
- id: uuid (PK, FK to users)
- subscription_plan: enum ('free', 'advanced')
- created_at: timestamp
- updated_at: timestamp

#### businesses
- id: uuid (PK)
- user_id: uuid (FK to users)
- name: string
- logo_url: string (nullable)
- address: string (nullable)
- phone: string (nullable)
- website: string (nullable)
- created_at: timestamp
- updated_at: timestamp

#### menus
- id: uuid (PK)
- business_id: uuid (FK to businesses)
- name: string
- description: string (nullable)
- background_url: string (nullable)
- is_active: boolean
- created_at: timestamp
- updated_at: timestamp

#### categories
- id: uuid (PK)
- menu_id: uuid (FK to menus)
- name: string
- description: string (nullable)
- image_url: string (nullable)
- display_order: integer
- created_at: timestamp
- updated_at: timestamp

#### menu_items
- id: uuid (PK)
- category_id: uuid (FK to categories)
- name: string
- description: string (nullable)
- price: string
- image_url: string (nullable)
- is_available: boolean
- display_order: integer
- dietary_info: jsonb
  * vegetarian: boolean
  * vegan: boolean
  * gluten_free: boolean
  * contains_nuts: boolean
  * spicy: boolean
- created_at: timestamp
- updated_at: timestamp

#### menu_item_options
- id: uuid (PK)
- menu_item_id: uuid (FK to menu_items)
- name: string
- price: string
- is_available: boolean
- display_order: integer
- created_at: timestamp
- updated_at: timestamp

## Authentication & Authorization

### Authentication Flow
1. User signs up/logs in via Supabase Auth
2. JWT token stored in cookies
3. Token validated on each request
4. Middleware protects dashboard routes

### Authorization Rules
- Row Level Security (RLS) policies in Supabase
- Business-specific data isolation
- Subscription plan feature limits
- Role-based access control

## Image Management

### Storage Structure
```
storage/
├── logos/           # Business logos
├── menus/           # Menu background images
├── categories/      # Category images
└── menu-items/     # Menu item images
```

### Image Processing
1. Client-side validation
   - File type check
   - Size limits
   - Dimension checks

2. Image Optimization
   - Resize to max dimensions
   - Format conversion
   - Quality optimization

3. Upload Process
   - Generate unique filename
   - Upload to Supabase storage
   - Store URL in database

## Form Handling

### Form Architecture
1. Form Component (Presentation)
   - Input fields
   - Validation display
   - Error messages
   - Loading states

2. Form Wrapper (Logic)
   - Data fetching
   - Submission handling
   - Navigation
   - Error handling

### Validation
- Zod schemas for type safety
- Client-side validation
- Server-side validation
- Custom error messages

## State Management

### Data Flow
1. Server Components
   - Initial data fetch
   - Pass data as props

2. Client Components
   - Local state with useState
   - Form state with useForm
   - Loading states
   - Error handling

### Optimistic Updates
- Update UI immediately
- Revert on error
- Show loading states
- Handle race conditions

## API Integration

### Supabase Client
```typescript
// Server-side
const supabase = createServerComponentClient({ cookies });

// Client-side
const supabase = createClientComponentClient();
```

### Data Fetching
```typescript
// Example query
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', value);
```

### Error Handling
```typescript
try {
  // API call
} catch (error) {
  if (error instanceof Error) {
    // Handle known error
  }
  // Handle unknown error
}
```

## Performance Optimization

### Image Optimization
- Client-side resizing
- Format optimization
- Lazy loading
- Caching

### Code Optimization
- Code splitting
- Dynamic imports
- Tree shaking
- Bundle analysis

### Data Loading
- Parallel fetching
- Streaming
- Suspense boundaries
- Loading states

## Security Measures

### Data Protection
- Input sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

### File Upload Security
- File type validation
- Size limits
- Malware scanning
- Secure storage

## Monitoring & Logging

### Error Tracking
- Console logging
- Error boundaries
- Performance monitoring
- Usage analytics

### Metrics
- Page load times
- API response times
- Error rates
- User engagement

## Development Workflow

### Version Control
- Feature branches
- Pull requests
- Code review
- Automated testing

### Deployment
- Development environment
- Staging environment
- Production environment
- Rollback procedures

## Future Technical Considerations

### Scalability
- Database optimization
- Caching strategies
- Load balancing
- CDN integration

### Features
- Real-time updates
- Advanced search
- Analytics dashboard
- API access

### Integration
- Payment processing
- Email service
- SMS notifications
- Third-party APIs

### Mobile Support
- PWA capabilities
- Native app features
- Offline support
- Push notifications
