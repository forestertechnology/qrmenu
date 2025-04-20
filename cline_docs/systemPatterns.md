# System Patterns: QR Menu SaaS

## Architecture Overview

### Directory Structure
```
src/
├── app/
│   ├── (auth)/             # Authentication routes
│   ├── (dashboard)/        # Protected dashboard routes
│   │   ├── menus/         # Menu management
│   │   │   ├── [id]/     # Individual menu routes
│   │   │   │   ├── categories/    # Category management
│   │   │   │   │   ├── [categoryId]/  # Individual category routes
│   │   │   │   │   │   └── items/     # Menu item management
│   │   ├── onboarding/   # Business onboarding
│   │   └── settings/     # User settings
│   └── api/              # API routes
├── components/
│   ├── ui/              # Reusable UI components
│   ├── forms/           # Form components
│   └── dashboard/       # Dashboard-specific components
├── lib/                 # Utility libraries
├── utils/              # Helper functions
└── types/              # TypeScript types
```

## Component Patterns

### Page Components
- Server components by default
- Handle data fetching and authorization
- Pass data to client components
- Implement error boundaries and loading states
- Follow consistent layout structure:
  * Header with title and actions
  * Main content area
  * Sidebar for additional context (when needed)

### Form Components
- Client components with "use client" directive
- Use React Hook Form with Zod validation
- Handle form state and submission
- Provide error feedback
- Support image uploads where needed
- Follow consistent structure:
  * Form fields with labels
  * Validation messages
  * Submit button
  * Loading states

### List Components
- Client components for interactivity
- Support CRUD operations
- Implement optimistic updates
- Handle loading and error states
- Support pagination or infinite scroll
- Include empty states
- Mobile-responsive layouts

### Form Wrappers
- Handle form submission logic
- Manage API calls
- Handle navigation after success
- Provide error handling
- Pass initial data to forms

## Data Management

### Supabase Integration
- Direct database access in server components
- Client-side queries for real-time updates
- File storage for images
- Authentication and authorization

### State Management
- Server state with Supabase
- Form state with React Hook Form
- UI state with React hooks
- Loading states for async operations

## Error Handling

### Error Boundaries
- Page-level error boundaries
- Component-specific error states
- User-friendly error messages
- Recovery options where possible

### Loading States
- Skeleton loaders for lists
- Loading indicators for forms
- Disabled states during operations
- Smooth transitions

## Image Management

### Upload Process
1. Client-side image selection
2. Image validation
3. Client-side resizing
4. Upload to Supabase storage
5. URL storage in database

### Image Optimization
- Client-side resizing
- Format optimization
- Lazy loading
- Responsive images
- Placeholder handling

## Authorization

### Route Protection
- Middleware for authentication
- Role-based access control
- Plan-based feature limits
- Redirect handling

### Data Access
- Row-level security in Supabase
- Business-specific data isolation
- Plan-based restrictions
- Ownership validation

## Subscription Management

### Plan Limits
- Menu count restrictions
- Category limits per menu
- Item limits per category
- Feature availability
- Storage quotas

### Enforcement
- Server-side validation
- Client-side UI adaptation
- Upgrade prompts
- Grace handling

## Mobile Optimization

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions
- Performance optimization

### Image Handling
- Responsive images
- Progressive loading
- Bandwidth optimization
- Cache management

## Common Patterns

### Form Handling
```typescript
// Form schema
const schema = z.object({
  name: z.string().min(1),
  // ... other fields
});

// Form component
export function FormComponent() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      // ... defaults
    }
  });

  const onSubmit = async (data) => {
    try {
      // Handle submission
    } catch (error) {
      // Handle error
    }
  };
}
```

### List Components
```typescript
// List component
export function ListComponent() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // CRUD operations
  const handleDelete = async (id) => {
    try {
      // Optimistic update
      setItems(prev => prev.filter(item => item.id !== id));
      // API call
    } catch (error) {
      // Revert on error
    }
  };
}
```

### Image Upload
```typescript
// Image upload component
export function ImageUpload() {
  const handleUpload = async (file) => {
    // Validate
    // Resize
    // Upload
    // Return URL
  };
}
```

## Testing Patterns

### Unit Tests
- Component testing
- Utility function testing
- Form validation testing
- Error handling testing

### Integration Tests
- Form submission flows
- API interactions
- Authentication flows
- Navigation testing

### E2E Tests
- Critical user journeys
- Payment flows
- Menu management
- QR code generation

## Performance Patterns

### Optimization
- Image optimization
- Code splitting
- Lazy loading
- Caching strategies
- Bundle optimization

### Monitoring
- Performance metrics
- Error tracking
- Usage analytics
- Load testing

## Security Patterns

### Data Protection
- Input sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

### Authentication
- JWT handling
- Session management
- Password security
- 2FA support

## Future Considerations

### Scalability
- Database optimization
- Caching strategies
- Load balancing
- CDN integration

### Extensibility
- Plugin architecture
- API versioning
- Webhook support
- Integration points
