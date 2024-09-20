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
        <div className="fixed top-0 w-full bg-yellow-300 text-black px-2 font-bold py-3 z-[9999]">
            ⚠️ This application is currently deployed in a sandbox environment. You may experience delays or timeouts. In case of timeouts, you can always give a retry 
            <button 
                className="ml-3 underline text-blue-600 hover:text-blue-800 text-sm" 
                onClick={handleDismissClick}
            >
                Dismiss
            </button>
        </div>
    );
};

export default SandboxNotificationBadge;
