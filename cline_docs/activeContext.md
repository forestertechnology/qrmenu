# Active Context: QR Menu SaaS

## Current Development Phase
We are in Phase 2: Menu Management System

## Recent Changes
- Implemented QR code generation system:
  * Created QR code generation utilities
  * Added QR code flyer creation functionality
  * Implemented background image selection
  * Added custom background upload for advanced plans
  * Created server actions for QR code operations
  * Added download functionality
  * Implemented subscription plan limits for backgrounds
  * Created loading and error states
- Added QR code page to menu dashboard
- Created reusable components for QR code generation
- Updated menu list to include QR code links
- Added TypeScript types for QR code components
- Implemented error handling and loading states

## Current Focus
Building the QR code generation system and public menu view:

### Critical Development Requirements
- IMPORTANT: All commands must be prefixed with directory change:
  ```powershell
  Set-Location "D:\projects\On Our Menu\v4\onourmenu";
  ```
  This is required because each command runs in a new terminal instance that defaults to the Desktop directory.

### Next Steps
1. ✅ QR Code Generation:
   - ✅ Implement QR code generation library
   - ✅ Create flyer template system
   - ✅ Add background image selection
   - ✅ Implement download functionality
   - ✅ Add subscription plan limits for backgrounds

2. Public Menu View:
   - Create public menu layout
   - Implement category navigation
   - Add item details display
   - Optimize for mobile viewing
   - Add SEO metadata

3. Menu Sharing:
   - Add share button functionality
   - Implement social media sharing
   - Create shareable links
   - Add copy to clipboard feature

### Completed Tasks
1. ✅ Initialize Next.js 14 project with TypeScript
2. ✅ Configure development environment
3. ✅ Establish Supabase connection
4. ✅ Set up project structure
5. ✅ Business Profile Management
6. ✅ Menu Management System
7. ✅ Category Management System
8. ✅ Menu Item Management System
9. ✅ QR Code Generation System

## Blockers/Dependencies
None currently identified

## Technical Decisions Made
1. Authentication: Supabase Auth
2. Database: Supabase (PostgreSQL)
3. File Storage: Supabase Storage
4. UI Framework: Tailwind CSS
5. Form Handling: React Hook Form + Zod
6. State Management: React Query + Context
7. Image Upload: Client-side resizing with canvas
8. Error Handling: Next.js error boundaries
9. Menu Background: Support for both patterns and solid colors
10. Category Ordering: Drag-and-drop with optimistic updates
11. Menu Items: Support for dietary information and images
12. Form Validation: Zod schemas for type safety
13. QR Code Generation: Server-side generation with canvas
14. QR Code Flyers: Custom templates with restaurant branding
15. Background Selection: Different options based on subscription plan

## Notes
- Mobile-first development is critical (90% mobile usage)
- Need to maintain strict subscription plan limitations
- Performance optimization should be considered from the start
- Every command must be prefixed with directory change to ensure correct working directory
- Always verify working directory before executing critical operations
- Image optimization is crucial for menu items
- Consider implementing lazy loading for menu items
- Need to ensure responsive design for all screen sizes
- Consider implementing search functionality for menu items
- Plan for future menu item variants and options
