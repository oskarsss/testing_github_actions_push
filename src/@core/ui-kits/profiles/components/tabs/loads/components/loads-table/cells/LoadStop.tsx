import { memo } from 'react';
import { Stack, Typography } from '@mui/material';
import moment from 'moment-timezone';
import { ManifestModel_Stop } from '@proto/models/model_manifest';

function formatDate(inputDate: string | undefined) {
    if (!inputDate) return '';

    return moment(inputDate).format('MM/DD hh:mm A');
}

type Props = {
    stop?: ManifestModel_Stop;
};

function LoadStop({ stop }: Props) {
    const stop_address = stop
        ? `${stop?.location?.city ?? ''}, ${stop?.location?.state ?? ''} ${
            stop?.location?.postalCode ?? ''
        }`
        : '';
    const stop_time = stop
        ? `${formatDate(stop?.appointmentStartAtLocal)} ${
            stop?.location?.timezone ? `(${stop?.location?.timezone})` : ''
        }`
        : '';

    return (
        <Stack>
            <Typography
                color="semantic.text.primary"
                fontSize="12px"
                fontWeight="500"
                lineHeight="18px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {stop_address}
            </Typography>

            <Typography
                color="semantic.text.secondary"
                fontSize="10px"
                fontWeight="400"
                lineHeight="15px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {stop_time}
            </Typography>
        </Stack>
    );
}

export default memo(LoadStop);
