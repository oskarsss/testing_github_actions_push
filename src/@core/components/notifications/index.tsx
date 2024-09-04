import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import type { SettingsNotificationUpdate } from '@proto/settings_notification';
import type { NotificationModel_NotificationSetting } from '@proto/models/model_notification';
import { isEqual } from 'lodash';
import { memo } from 'react';
import Notification from './Notification';
import MainNotificationType from './MainNotificationType';

type Props = {
    userId: string;
    url: string;
    fullName: string;
    notifications: NotificationModel_NotificationSetting[];
    onHandleUpdate: (settings: SettingsNotificationUpdate[]) => Promise<unknown>;
};

function UserNotification({
    userId,
    url,
    fullName,
    notifications,
    onHandleUpdate
}: Props) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-content_${userId}`}
                id={`panel-header_${userId}`}
                sx={{
                    position  : 'sticky',
                    top       : 0,
                    zIndex    : 1,
                    background: ({ palette }) => palette.semantic.foreground.white.tertiary,

                    padding                         : 0,
                    '& .MuiAccordionSummary-content': {
                        gap: '2px'
                    }
                }}
            >
                <Avatar
                    alt={fullName}
                    src={url}
                    sx={{
                        width      : 22,
                        height     : 22,
                        marginRight: '5px',
                        fontSize   : '10px'
                    }}
                >
                    {fullName[0]}
                </Avatar>

                <Typography
                    variant="body1"
                    fontSize="14px"
                    fontWeight={500}
                >
                    {fullName}
                </Typography>
            </AccordionSummary>

            <AccordionDetails
                sx={{
                    padding: 0
                }}
            >
                <MainNotificationType
                    title="common:notifications.titles.order"
                    notifications={notifications}
                    onHandleUpdate={onHandleUpdate}
                />

                {notifications.map((notification) => (
                    <Notification
                        key={notification.notificationType}
                        notification={notification}
                        onHandleUpdate={onHandleUpdate}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    );
}

export default memo(UserNotification, isEqual);
