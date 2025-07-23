# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "Associazione Santa Barbara APS", a non-profit organization based in Grumo Appula, Italy. The site combines vanilla HTML/CSS/JavaScript with modern authentication capabilities via Supabase. Hosted on GitHub Pages with Jekyll processing and custom domain `associazionesbarbara.it`.

## Development Commands

### Local Development
```bash
# Start local server (Python 3 - recommended)
python3 -m http.server

# Alternative with specific port
python3 -m http.server 8000

# Access at http://localhost:8000
```

### Testing & Validation
No automated test framework is configured. Manual testing workflow:
```bash
# Test authentication flow
# 1. Open register.html - test user registration
# 2. Check email for confirmation link
# 3. Open login.html - test authentication
# 4. Access area-soci.html - verify role-based access

# Performance testing with Lighthouse
# SEO validation with Google Search Console
```

### Content Updates
```bash
# Update FAQ content
# Edit data/faq.json directly

# Add new gallery images  
# Place in assets/images/ directory

# Update video gallery
# Videos served from Archive.org (1-18.mp4)
```

## Architecture & Key Files

### Core Structure
- **Frontend**: Pure HTML5/CSS3/Vanilla JavaScript (no framework dependencies)
- **Authentication**: Supabase for user management and role-based access control
- **Hosting**: GitHub Pages with Jekyll static site generation
- **Domain**: Custom domain `associazionesbarbara.it` via CNAME
- **Media**: Images in assets/images/, videos from Archive.org CDN
- **Database**: Supabase handles user sessions, metadata, and RLS policies

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
- `area-soci.html` - Protected members area (role-based access)

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
- `assets/css/style.css`: Main stylesheet (~2000 lines, mobile-first responsive)
- `assets/js/script.js`: Main JavaScript with Supabase auth logic
- `assets/js/notifications.js`: Toast notification system
- `assets/images/`: Static image assets (logo.svg, banners, activities)
- `data/faq.json`: Dynamic FAQ content structure

**Media & Content:**
- `video/`: 18 MP4 files (1-18.mp4) served from Archive.org
- Gallery images organized by event/activity type
- Google Analytics 4 with GDPR consent management

**Configuration Files:**
- `_config.yml`: Jekyll config with SEO plugins, sitemap generation
- `CNAME`: Custom domain `associazionesbarbara.it`
- `sitemap.xml`: SEO sitemap for search engines
- `ads.txt`: Google AdSense configuration
- `.htaccess`: Server-side security headers and redirects

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

## Development Guidelines

### User Management
To promote a user to "socio" role:
1. Access Supabase Dashboard → Authentication → Users  
2. Edit user `user_metadata` → set `role: "socio"`
3. User must confirm email before role check applies
4. Session automatically updated on next page load

### File Organization & Conventions
- **Images**: All static images in `assets/images/` (optimized < 1MB)
- **Videos**: Served from Archive.org CDN (video/1-18.mp4 pattern)
- **CSS**: Mobile-first responsive design with CSS custom properties
- **JavaScript**: Vanilla ES6+ only, no build process or transpilation
- **Content**: FAQ managed via `data/faq.json`, events hardcoded in HTML
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
2. **Processing**: Jekyll processes files per `_config.yml` configuration  
3. **Build**: Static files generated with plugins (sitemap, SEO-tag, feed)
4. **Deploy**: Live site updated at `associazionesbarbara.it`
5. **CDN**: GitHub's CDN serves assets globally

### Performance Optimizations Implemented
- **Images**: Optimized formats (WebP where supported, SVG for logos)
- **JavaScript**: Vanilla JS (no framework overhead), async loading
- **CSS**: Critical CSS inlined, non-critical loaded asynchronously  
- **Videos**: External CDN (Archive.org) reduces hosting load
- **Caching**: Browser caching headers via Jekyll configuration
- **Lazy Loading**: Images load on scroll to improve initial page speed

### SEO & Analytics Setup
- **Google Analytics 4**: Integrated with GDPR consent management
- **Meta Tags**: OpenGraph and Twitter Card for social sharing
- **Structured Data**: Schema markup for organization information
- **Sitemap**: Auto-generated XML sitemap for search engines
- **Custom Domain**: `associazionesbarbara.it` with SSL certificate