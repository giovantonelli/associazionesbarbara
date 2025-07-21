# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "Associazione Santa Barbara APS", a non-profit organization based in Grumo Appula, Italy. The site is built with vanilla HTML, CSS, and JavaScript and hosted on GitHub Pages with Jekyll configuration.

## Development Commands

### Local Development
```bash
# Start local server (Python 3)
python3 -m http.server

# Alternative with specific port
python3 -m http.server 8000
```

### Testing
No automated test framework is configured. Manual testing required through browser.

## Architecture & Key Files

### Core Structure
- **Static Site**: Pure HTML/CSS/JS, no build process required
- **Backend**: Supabase for authentication and database
- **Hosting**: GitHub Pages with Jekyll configuration

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
- `assets/css/style.css`: Main stylesheet with responsive design
- `assets/js/script.js`: Main JavaScript file with authentication logic
- `data/faq.json`: FAQ data structure

**Configuration:**
- `_config.yml`: Jekyll configuration for GitHub Pages
- `CNAME`: Custom domain configuration

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

### File Organization
- Keep all images in `assets/images/`
- CSS follows mobile-first responsive approach
- JavaScript uses vanilla ES6, no framework dependencies
- FAQ content managed through `data/faq.json`

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

## Deployment

The site auto-deploys to GitHub Pages when changes are pushed to the main branch. Jekyll processes the site according to `_config.yml` configuration.