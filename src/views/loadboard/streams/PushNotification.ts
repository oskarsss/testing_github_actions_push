type Params = {
    title: string;
    body: string;
    onClick: () => void;
};

function showPushNotification({
    title,
    body,
    onClick
}: Params) {
    const iconPath = 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png';

    const createNotification = () => {
        const notification = new Notification(title, {
            icon: iconPath,
            body
        });

        notification.onshow = () => {
            setTimeout(notification.close.bind(notification), 10000);
        };

        notification.onclick = () => {
            onClick();
            notification.close();
        };
    };

    if (Notification.permission === 'granted') {
        createNotification();
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                createNotification();
            }
        });
    }
}

export default showPushNotification;
