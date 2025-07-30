/* ===================================
   MOBILE OPTIMIZATION JAVASCRIPT
   Script per migliorare l'esperienza mobile
   =================================== */

(function() {
    'use strict';

    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isMobile || isTouch) {
        document.body.classList.add('mobile-device');
    }

    // Improve mobile performance
    function optimizeForMobile() {
        // Disable hover effects on touch devices
        if (isTouch) {
            const style = document.createElement('style');
            style.textContent = `
                @media (hover: none) {
                    *:hover {
                        transition: none !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Optimize images for mobile
        const images = document.querySelectorAll('img[data-src]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Add loading indicators for mobile
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(element => {
            element.style.minHeight = '200px';
            element.innerHTML = '<div class="mobile-spinner"></div>';
        });
    }

    // Touch gesture improvements
    function improveTouchGestures() {
        // Prevent double-tap zoom on buttons
        document.addEventListener('touchend', function(e) {
            if (e.target.matches('button, .btn, a')) {
                e.preventDefault();
                e.target.click();
            }
        });

        // Add touch feedback
        document.addEventListener('touchstart', function(e) {
            if (e.target.matches('button, .btn, a')) {
                e.target.style.transform = 'scale(0.98)';
                e.target.style.opacity = '0.8';
            }
        });

        document.addEventListener('touchend', function(e) {
            if (e.target.matches('button, .btn, a')) {
                setTimeout(() => {
                    e.target.style.transform = '';
                    e.target.style.opacity = '';
                }, 150);
            }
        });
    }

    // Mobile navigation improvements
    function improveMobileNavigation() {
        const nav = document.querySelector('.nav-menu');
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        
        if (nav && toggleBtn) {
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
                    nav.classList.remove('active');
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    toggleBtn.focus();
                }
            });
        }
    }

    // Mobile form improvements
    function improveMobileForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Auto-scroll to input when focused on mobile
                input.addEventListener('focus', function() {
                    if (isMobile) {
                        setTimeout(() => {
                            this.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }, 300);
                    }
                });

                // Add proper input types for mobile keyboards
                if (input.name && input.name.includes('email')) {
                    input.type = 'email';
                }
                if (input.name && input.name.includes('tel')) {
                    input.type = 'tel';
                }
                if (input.name && input.name.includes('url')) {
                    input.type = 'url';
                }
            });
        });
    }

    // Mobile performance monitoring
    function monitorMobilePerformance() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                // Enable data-saver mode
                document.body.classList.add('low-bandwidth');
                
                // Reduce image quality
                const images = document.querySelectorAll('img');
                images.forEach(img => {
                    if (img.src && !img.src.includes('quality=')) {
                        img.src += (img.src.includes('?') ? '&' : '?') + 'quality=60';
                    }
                });
            }
        }
    }

    // Mobile accessibility improvements
    function improveMobileAccessibility() {
        // Add focus indicators for keyboard navigation
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid #007bff';
                this.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });

        // Improve mobile screen reader experience
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = `heading-${index + 1}`;
            }
        });
    }

    // Initialize mobile optimizations
    function initMobileOptimizations() {
        if (isMobile || isTouch) {
            optimizeForMobile();
            improveTouchGestures();
            improveMobileNavigation();
            improveMobileForms();
            monitorMobilePerformance();
            improveMobileAccessibility();

            // Add mobile-specific CSS
            const mobileCSS = `
                .mobile-spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #007bff;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .low-bandwidth * {
                    animation: none !important;
                    transition: none !important;
                }
            `;

            const style = document.createElement('style');
            style.textContent = mobileCSS;
            document.head.appendChild(style);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileOptimizations);
    } else {
        initMobileOptimizations();
    }

    // Export for testing
    window.MobileOptimizer = {
        isMobile,
        isTouch,
        optimizeForMobile,
        improveTouchGestures,
        improveMobileNavigation
    };

})();
