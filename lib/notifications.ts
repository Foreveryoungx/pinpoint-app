export async function requestNotificationPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
        return false;
    }

    if (Notification.permission === "granted") {
        return true;
    }

    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        return permission === "granted";
    }

    return false;
}

export function sendNotification(title: string, body: string) {
    if (!("Notification" in window)) {
        return;
    }

    if (Notification.permission === "granted") {
        new Notification(title, {
            body,
            icon: "/icon-192x192.png", // Assuming PWA icon exists or fallback
            // badge: "/badge.png"
        });
    }
}
