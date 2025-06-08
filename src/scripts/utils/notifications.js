export function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.textContent = message;

  Object.assign(notification.style, {
    position: 'fixed',
    top: '80px',
    right: '20px',
    padding: '1rem 1.5rem',
    borderRadius: '0.5rem',
    color: '#fff',
    zIndex: '10000',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    fontFamily: 'sans-serif',
    fontWeight: '500',
    opacity: '0',
    transition: 'opacity 0.5s, transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    transform: 'translateX(120%)',
  });

  switch (type) {
    case 'success':
      notification.style.backgroundColor = '#22c55e';
      break;
    case 'error':
      notification.style.backgroundColor = '#ef4444';
      break;
    case 'info':
    default:
      notification.style.backgroundColor = '#3b82f6';
      break;
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 10);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(120%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 500);
  }, duration);
}