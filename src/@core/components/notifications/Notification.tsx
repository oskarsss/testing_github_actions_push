import { memo } from 'react';
import { Stack, Typography } from '@mui/material';
import type { NotificationModel_NotificationSetting } from '@proto/models/model_notification';
import { isEqual } from 'lodash';
import type { SettingsNotificationUpdate } from '@proto/settings_notification';
import Actions from './Actions';

type Props = {
    notification: NotificationModel_NotificationSetting;
    onHandleUpdate: (settings: SettingsNotificationUpdate[]) => Promise<unknown>;
};

function Notification({
    notification,
    onHandleUpdate
}: Props) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap="16px"
            paddingBottom="6px"
            paddingTop="6px"
            borderBottom="1px solid"
            borderColor="semantic.border.secondary"
            sx={{
                '&:first-of-type': {
                    paddingTop: 0
                },
                '&:last-child': {
                    borderBottom: 'none'
                }
            }}
        >
            <Typography
                variant="body1"
                fontSize="14px"
                fontWeight={500}
                lineHeight="19px"
            >
                {notification.friendlyName}
            </Typography>

            <Actions
                enabled={notification.enabled}
                enabledSms={notification.enabledSms}
                enabledEmail={notification.enabledEmail}
                enabledWebPush={notification.enabledWebPush}
                notificationType={notification.notificationType}
                onHandleUpdate={onHandleUpdate}
            />
        </Stack>
    );
}

export default memo(Notification, isEqual);
