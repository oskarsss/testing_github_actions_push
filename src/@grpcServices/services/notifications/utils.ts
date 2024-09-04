/* eslint-disable no-param-reassign */
import { NotificationModel_NotificationSetting } from '@proto/models/model_notification';
import { SettingsNotificationUpdate } from '@proto/settings_notification';

export function updateNotification(
    settings: NotificationModel_NotificationSetting[],
    argsSettings: SettingsNotificationUpdate[]
) {
    const argsSettingsMap = new Map(
        argsSettings.map((setting) => [setting.notificationType, setting])
    );

    settings.forEach((notification) => {
        const argsSetting = argsSettingsMap.get(notification.notificationType);

        if (argsSetting) {
            notification.enabled = argsSetting.enabled;
            notification.enabledSms = argsSetting.enabledSms;
            notification.enabledEmail = argsSetting.enabledEmail;
            notification.enabledWebPush = argsSetting.enabledWebPush;
        }
    });
}
