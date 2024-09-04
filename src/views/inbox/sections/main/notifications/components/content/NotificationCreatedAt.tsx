import moment from 'moment-timezone';
import { Stack, Typography } from '@mui/material';
import { useAccountCompanies } from '@/store/app/hooks';
import { memo } from 'react';

type Props = {
    notificationCreatedAt: string;
};

function NotificationCreatedAt({ notificationCreatedAt }: Props) {
    const { company } = useAccountCompanies();

    if (!company) return null;

    const now = moment.tz(company?.timezone);
    const createdAt = moment(notificationCreatedAt).tz(company?.timezone);
    const diff = now.diff(createdAt);

    const diffFormatted = moment.duration(diff).humanize();

    return (
        <Stack>
            <Typography
                variant="body1"
                fontSize="12px"
                fontWeight={500}
                color="semantic.text.disabled"
                whiteSpace="nowrap"
                textAlign="right"
            >
                {diffFormatted}
            </Typography>
        </Stack>
    );
}

export default memo(NotificationCreatedAt);
