// Google Analytics 4 Configuration
// Define dataLayer and the gtag function
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}

// Set default consent to 'denied' as a placeholder for EU users
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
});

// Load Google Analytics script
const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-F465WJF33T';
document.head.appendChild(gaScript);

// Initialize Google Analytics
gaScript.onload = function() {
    gtag('js', new Date());
    gtag('config', 'G-F465WJF33T');
};