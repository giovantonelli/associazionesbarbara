# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "Associazione Santa Barbara APS", a non-profit organization based in Grumo Appula, Italy. The site combines vanilla HTML/CSS/JavaScript with modern authentication capabilities via Supabase. Hosted on GitHub Pages with custom domain `associazionesbarbara.it`.

### Common Development Commands
No package.json or build process is configured. Common workflow commands:
```bash
# Local development server options
python3 -m http.server 8000                    # Python HTTP server
npx http-server -p 8000                         # Node.js HTTP server  
# VS Code: Use Live Server extension (recommended)

# Git workflow (no CI/CD, direct to GitHub Pages)
git add -A                                      # Stage all changes
git commit -m "Descriptive commit message"     # Commit with clear message
git push origin main                            # Deploy to GitHub Pages (live site)

# Manual testing workflow
# 1. Test authentication: register.html → email confirmation → login.html → area-soci.html
# 2. Test responsive design on mobile/tablet/desktop
# 3. Test gallery lightbox navigation (photos and videos)
# 4. Verify AdBlock detection system with different browsers
# 5. Check FAQ accordion and contact form functionality
# 6. Validate all footer links and privacy/cookie management

# Performance and SEO validation
# - Use Lighthouse in Chrome DevTools for performance audit
# - Google Search Console for SEO and indexing issues
# - Test with real AdBlockers for detection accuracy
```

### Content Updates
```bash
# Update FAQ content
# Edit data/faq.json directly (JSON array with question/answer/category structure)

# Add new gallery images  
# Upload to Supabase Storage: gallery/foto/ bucket (optimize < 1MB)

# Update video gallery
# Videos served from Archive.org (https://archive.org/download/17_20250722/X.mp4)
# Thumbnails from Supabase Storage: gallery/thumbnail/X.png
```

## Architecture & Key Files

### Core Architecture
- **Frontend**: Pure HTML5/CSS3/Vanilla JavaScript (~4500 lines CSS, ~1490 lines JS)
- **Authentication**: Supabase with role-based access control (`utente` vs `socio` roles)
- **Hosting**: GitHub Pages (direct static files, no Jekyll processing despite presence of _config.yml)
- **Domain**: Custom domain `associazionesbarbara.it` via CNAME
- **Media Strategy**: Local assets in assets/images/, gallery photos via Supabase Storage buckets, videos from Archive.org CDN
- **Database**: Supabase handles user sessions, profiles table, events table with RLS policies
- **No Build Process**: All dependencies loaded via CDN, no package.json or compilation required

### Page Architecture
**Public Pages (12 total):**
- `index.html` - Homepage with hero section, association overview
- `chi-siamo.html` - About page with history, mission, values
- `attivita.html` - Activities including Corteo Storico, Tamburi projects
- `eventi.html` - Events calendar with interactive features
- `galleria.html` - Photo carousel + 18 videos with lightbox functionality
- `faq.html` - Dynamic FAQ system reading from data/faq.json
- `contatti.html` - Contact form with Google Maps integration
- `partner.html` - Partners and sponsors showcase
- `privacy.html` - GDPR-compliant privacy policy

**Authentication Pages:**
- `register.html` - User registration with email verification
- `login.html` - Authentication with session management
- `area-soci.html` - Protected members area with profile management and events admin

### Authentication System
The site uses **Supabase** for user authentication with role-based access:

**Supabase Configuration:**
```javascript
// In area-soci.html and script.js
const supabaseClient = createClient(
    'https://ciezrbsolxpjxswdkkpo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXpyYnNvbHhwanhzd2Rra3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjM1NjAsImV4cCI6MjA2ODQ5OTU2MH0.V-U8KhO8byObUW5kJ8XbLBkp9O9Efh98MdbKYFfbQJk'
);
```

**User Roles:**
- `utente` (default): Registered user without member access
- `socio`: Full access to protected member area (`area-soci.html`)

**Auth Flow:**
1. `register.html`: User registration with email confirmation
2. `login.html`: Authentication with email/password
3. `area-soci.html`: Protected content accessible only to users with `role: "socio"`

### Key Files

**Main Pages:**
- `index.html`: Homepage
- `area-soci.html`: Protected members area (authentication required)
- `login.html`, `register.html`: Authentication pages

**Core Assets:**
- `assets/css/style.css`: Main stylesheet (~4500 lines, mobile-first responsive)
- `assets/js/script.js`: Main JavaScript with Supabase auth logic (~1490 lines)
- `assets/js/notifications.js`: Toast notification system
- `assets/js/adblock-detector-v2.js`: AdBlock detection system (4-test detection)
- `assets/js/adblock-integration-v2.js`: AdBlock modal integration
- `assets/images/`: Static image assets (logo.svg, banners, activities)
- `data/faq.json`: Dynamic FAQ content structure (question/answer/category format)

**Media & Content:**
- Gallery photos: Supabase Storage `gallery/foto/` bucket
- Video thumbnails: Supabase Storage `gallery/thumbnail/` bucket  
- Videos: Archive.org CDN (18 videos, 1-18.mp4 pattern)
- Google Analytics 4 with GDPR consent management
- AdBlock detection system with modal enforcement

**Configuration Files:**
- `CNAME`: Custom domain `associazionesbarbara.it`
- `sitemap.xml`: SEO sitemap for search engines
- `copilot-instruction.md`: Development guidelines and conventions

### Authentication Implementation Details

**Protection Logic in area-soci.html:**
```javascript
async function checkAuthentication() {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    
    // Check session exists and email is confirmed
    if (!session || !session.user || !session.user.email_confirmed_at) {
        window.location.href = 'login.html';
        return;
    }
    
    // Check user role
    const userRole = session.user.user_metadata?.role || 'utente';
    if (userRole !== 'socio') {
        // Show access denied message
        return;
    }
    
    // Show member content
    showMembersContent();
}
```

### Members Area Features (area-soci.html)
The protected members area includes:

**Profile Management:**
- Edit personal information (name, address, phone, etc.)
- Change password functionality
- Change email with verification

**Events Management (Admin):**
- Create, edit, and delete events via tabbed interface
- Set event visibility (public/private)
- Full CRUD operations on events table with comprehensive form fields
- User assignment for event creation from dropdown
- Events table with sortable columns and action buttons
- Real-time updates with Supabase integration

**Database Tables:**
- `events`: Event data with public/private visibility
- `profiles`: Extended user profile information

## Development Guidelines

### Development Setup
```bash
# Local development (no build process required)
# Option 1: Using Python
python3 -m http.server 8000
# Then visit: http://localhost:8000

# Option 2: Using Live Server (VS Code extension)
# Install Live Server extension and right-click index.html -> "Open with Live Server"

# Option 3: Using Node.js http-server
npx http-server -p 8000
```

### User Management
To promote a user to "socio" role:
1. Access Supabase Dashboard → Authentication → Users  
2. Edit user `user_metadata` → set `role: "socio"`
3. User must confirm email before role check applies
4. Session automatically updated on next page load

### File Organization & Conventions
- **Static Images**: `assets/images/` for logos, banners, UI elements (optimized < 1MB)
- **Gallery Photos**: Supabase Storage `gallery/foto/` bucket, loaded dynamically
- **Video Thumbnails**: Supabase Storage `gallery/thumbnail/` bucket (PNG format)
- **Videos**: Archive.org CDN (https://archive.org/download/17_20250722/X.mp4 pattern)
- **CSS**: Mobile-first responsive design with CSS custom properties
- **JavaScript**: Vanilla ES6+ only, no build process or transpilation
- **Content**: FAQ managed via `data/faq.json`, events stored in Supabase database
- **Security**: Content Security Policy headers implemented across all pages

### Code Style Guidelines
- **HTML**: Semantic HTML5 with proper ARIA labels for accessibility
- **CSS**: BEM methodology for class naming, CSS Grid/Flexbox for layouts
- **JavaScript**: Async/await pattern for Supabase calls, error handling with try/catch
- **Performance**: Lazy loading images, minified assets, CDN for external resources

### Design System
**Colors:**
- Primary: #E10600 (Red)
- Secondary: #FFD700 (Gold)
- Text: #333333
- Background: #FFFFFF

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## AdBlock Detection System

The site implements a comprehensive AdBlock detection system:

### Components
- `assets/js/adblock-detector-v2.js`: Core detection logic with 4 test methods
- `assets/js/adblock-integration-v2.js`: Configuration and automatic integration

### Detection Methods
1. **Bait Elements Test**: Hidden elements with ad-like classes
2. **Google Ads Script Test**: Attempts to load Google Ads scripts
3. **Image Blocking Test**: Tests loading of images from ad domains
4. **Network Request Test**: Checks requests to known ad endpoints

### Configuration
- **Threshold**: 3/4 tests must be positive for detection
- **Total Block**: Complete site access restriction when AdBlock detected
- **Modal Interface**: Responsive popup with multi-device instructions
- **Bypass Prevention**: Non-closeable modal until AdBlock is disabled

## Security Notes

- Only public Supabase anon key is exposed in frontend
- Row Level Security (RLS) policies handle authorization server-side
- Email verification is mandatory for all users
- Session management handled automatically by Supabase
- No sensitive information stored in client-side code

## Deployment & Performance

### GitHub Pages Workflow
The site auto-deploys to GitHub Pages when changes are pushed to the main branch:
1. **Trigger**: Push to `main` branch activates GitHub Actions
2. **Processing**: Static files served directly (no Jekyll build process)
3. **Deploy**: Live site updated at `associazionesbarbara.it`
4. **CDN**: GitHub's CDN serves assets globally

### Performance Optimizations Implemented
- **Images**: Optimized formats (WebP where supported, SVG for logos)
- **JavaScript**: Vanilla JS (no framework overhead), async loading
- **CSS**: Critical CSS inlined, non-critical loaded asynchronously  
- **Videos**: External CDN (Archive.org) reduces hosting load
- **Caching**: Browser caching headers via meta tags
- **Lazy Loading**: Images load on scroll to improve initial page speed

### SEO & Analytics Setup
- **Google Analytics 4**: Integrated with GDPR consent management (ID: G-F465WJF33T)
- **Meta Tags**: OpenGraph and Twitter Card for social sharing
- **Structured Data**: Schema markup for organization information
- **Sitemap**: Manual XML sitemap for search engines
- **Custom Domain**: `associazionesbarbara.it` with SSL certificate

## Critical Architecture Details

### Monolithic JavaScript Structure
The main JavaScript file (`assets/js/script.js`) is a large (~1490 lines) monolithic file containing:
- **404 detection and redirect logic** (validates against valid pages list)
- **Photo and video lightbox systems** with keyboard navigation (ESC, arrows)
- **Cookie consent management** with Google Analytics integration (GA4)
- **FAQ accordion functionality** reading from data/faq.json
- **Gallery initialization** with Swiper.js carousel and Archive.org video integration  
- **Authentication forms** handling with Supabase integration and role validation
- **Member area profile and event management** with CRUD operations
- **Notification system integration** with toast notifications
- **AdBlock detection integration** with modal enforcement

**CRITICAL**: This file has many interdependent functions. Changes can affect multiple pages simultaneously. Always test authentication flow, gallery functionality, and AdBlock detection after modifications.

### Lightbox and Gallery Systems
The site has two main lightbox systems:
1. **Photo Lightbox**: For gallery images with prev/next navigation
2. **Video Lightbox**: For video content with play controls and navigation
Both support keyboard navigation (ESC, arrow keys) and click-to-close functionality.

### Authentication Flow Details
The authentication system has multiple validation layers:
- Email confirmation required before access
- Role-based access control (`socio` vs `utente`)
- Profile data merged from both auth metadata and profiles table
- Real-time session monitoring with automatic logout on session expiry

### Gallery System Architecture
- **Photo Gallery**: Swiper.js carousel with 3D coverflow effect
- **Video Gallery**: 18 videos hosted on Archive.org with local thumbnails
- **Lightbox Navigation**: Keyboard shortcuts and touch gestures supported
- **Loading States**: Progressive loading with skeleton screens

### Key Development Patterns

#### Form and JavaScript Integration
- **Consistent naming**: Use `id` and `name` attributes like `event-date`, `event-title` for JS integration
- **Event forms**: Standardized field names that match JavaScript event handling in script.js
- **Profile forms**: Follow similar patterns for consistency with Supabase integration
- **Validation**: Client-side validation patterns already established in authentication forms

#### Page Footer Requirements
- **Uniform footer**: All pages must include privacy and cookie management links
- **HTML validation**: Ensure proper tag closure (especially `<span>` elements - known issue area)
- **Social links**: Include Facebook, Instagram, Telegram links as established
- **GDPR compliance**: Cookie consent and privacy policy links required on all pages

#### Content Management Patterns
- **FAQ system**: Edit `data/faq.json` directly (JSON array with question/answer/category structure)
- **Gallery management**: Upload photos to Supabase Storage `gallery/foto/` bucket, videos use Archive.org CDN pattern
- **Static content**: Images in `assets/images/` optimized under 1MB for performance

## Important Development Reminders

1. **No Build Process**: This is a pure static site - no compilation or build steps required
2. **No Package.json**: All dependencies loaded via CDN (Supabase, Swiper.js, etc.)
3. **No Jekyll**: Despite GitHub Pages hosting, no Jekyll processing is used
4. **Authentication-First**: Always test auth flows when making changes to protected areas
5. **Mobile-First**: All CSS follows mobile-first responsive design principles
6. **Performance**: Keep images under 1MB, use lazy loading for galleries
7. **SEO**: Maintain proper meta tags and structured data on all pages
8. **GDPR**: Ensure cookie consent and privacy compliance on new features

## Troubleshooting Common Issues

### Authentication Problems
- Check Supabase console for user email confirmation status
- Verify `role` in `user_metadata` is set to "socio" for member access
- Clear browser cache/localStorage if login issues persist

### Gallery Issues
- Ensure Supabase Storage bucket permissions are correct
- Check Archive.org CDN availability for video content
- Verify thumbnail images exist in Supabase Storage

### AdBlock Detection
- Test with multiple browsers and AdBlock extensions
- Check console for detection system errors
- Verify all 4 detection methods are functioning

### Performance Issues
- Optimize images before uploading to Supabase Storage
- Check Google Analytics for page load metrics
- Use browser DevTools for performance profiling