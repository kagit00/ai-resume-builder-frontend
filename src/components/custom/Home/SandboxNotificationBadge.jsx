import React, { useEffect, useState } from 'react';

const SandboxNotificationBadge = () => {
    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        const hasSeenNotification = localStorage.getItem('hasSeenSandboxNotification');
        if (hasSeenNotification) setShowNotification(false);
    }, []);

    const handleDismissClick = () => {
        localStorage.setItem('hasSeenSandboxNotification', 'true');
        setShowNotification(false);
    };

    if (!showNotification) return null;

    return (
        <div className="fixed top-0 w-full bg-yellow-500 text-black text-center font-bold py-3 z-50">
            ⚠️ This application is currently deployed in a sandbox environment. You may experience delays or timeouts. 
            <button 
                className="ml-3 underline text-blue-600 hover:text-blue-800" 
                onClick={handleDismissClick}
            >
                Dismiss
            </button>
        </div>
    );
};

export default SandboxNotificationBadge;
