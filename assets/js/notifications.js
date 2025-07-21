/**
 * Modern notification system to replace alert() calls
 */

function createNotificationSystem() {
    // Create container
    const container = document.createElement('div');
    container.id = 'notification-container';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        pointer-events: none;
    `;
    document.body.appendChild(container);

    return {
        show: function(message, type = 'info', duration = 5000) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                margin-bottom: 10px;
                padding: 12px 16px;
                border-radius: 8px;
                color: white;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                pointer-events: auto;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            `;
            
            // Set background color based on type
            const colors = {
                'success': '#28a745',
                'danger': '#dc3545', 
                'error': '#dc3545',
                'warning': '#ffc107',
                'info': '#17a2b8'
            };
            notification.style.backgroundColor = colors[type] || colors.info;
            
            // Set icon
            const icons = {
                'success': '✓',
                'danger': '✗',
                'error': '✗', 
                'warning': '⚠',
                'info': 'ℹ'
            };
            const icon = icons[type] || icons.info;
            
            notification.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span><strong>${icon}</strong> ${message}</span>
                    <span style="margin-left: 12px; opacity: 0.7; font-size: 16px; cursor: pointer;">×</span>
                </div>
            `;
            
            container.appendChild(notification);
            
            // Click to dismiss
            notification.addEventListener('click', function() {
                if (notification.parentNode) {
                    notification.style.opacity = '0';
                    notification.style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 300);
                }
            });
            
            // Animate in
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // Auto remove
            if (duration > 0) {
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.style.opacity = '0';
                        notification.style.transform = 'translateX(100%)';
                        setTimeout(() => {
                            if (notification.parentNode) {
                                notification.remove();
                            }
                        }, 300);
                    }
                }, duration);
            }
            
            return notification;
        },
        
        success: function(message, duration = 4000) {
            return this.show(message, 'success', duration);
        },
        
        error: function(message, duration = 7000) {
            return this.show(message, 'error', duration);
        },
        
        warning: function(message, duration = 5000) {
            return this.show(message, 'warning', duration);
        },
        
        info: function(message, duration = 4000) {
            return this.show(message, 'info', duration);
        }
    };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.notify = createNotificationSystem();
        console.log('✅ Notifications loaded');
    });
} else {
    window.notify = createNotificationSystem();
    console.log('✅ Notifications loaded');
}