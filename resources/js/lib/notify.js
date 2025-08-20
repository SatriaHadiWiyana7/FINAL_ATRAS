import toast from 'react-hot-toast';

// Success notification
export const success = (message, options = {}) => {
    return toast.success(message, {
        duration: 4000,
        position: 'top-right',
        style: {
            background: '#10B981',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
        },
        iconTheme: {
            primary: 'white',
            secondary: '#10B981',
        },
        ...options
    });
};

// Error notification
export const error = (message, options = {}) => {
    return toast.error(message, {
        duration: 4000,
        position: 'top-right',
        style: {
            background: '#EF4444',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
        },
        iconTheme: {
            primary: 'white',
            secondary: '#EF4444',
        },
        ...options
    });
};

// Info notification
export const info = (message, options = {}) => {
    return toast(message, {
        duration: 4000,
        position: 'top-right',
        style: {
            background: '#3B82F6',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
        },
        icon: 'ℹ️',
        ...options
    });
};

// Warning notification
export const warning = (message, options = {}) => {
    return toast(message, {
        duration: 4000,
        position: 'top-right',
        style: {
            background: '#F59E0B',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
        },
        icon: '⚠️',
        ...options
    });
};

// Custom notification
export const custom = (message, options = {}) => {
    return toast(message, {
        duration: 4000,
        position: 'top-right',
        style: {
            background: '#374151',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
        },
        ...options
    });
};

// Loading notification
export const loading = (message, options = {}) => {
    return toast.loading(message, {
        position: 'top-right',
        style: {
            background: '#6B7280',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
        },
        ...options
    });
};

// Dismiss all notifications
export const dismiss = () => {
    toast.dismiss();
};

// Promise-based notification
export const promise = (promise, messages, options = {}) => {
    return toast.promise(promise, messages, {
        position: 'top-right',
        style: {
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
        },
        ...options
    });
};
