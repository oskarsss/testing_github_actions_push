import { memo, useMemo } from 'react';
import { Stack, Typography } from '@mui/material';
import moment from 'moment-timezone';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import { getPrepareStops } from '@/@grpcServices/services/manifests-service/utils';

function formatDate(inputDate: string | undefined) {
    if (!inputDate) return '';

    return moment(inputDate).format('MM/DD hh:mm A');
}

type Props = {
    manifestId: string;
    stop?: ManifestModel_Stop;
};

function ManifestStop({
    manifestId,
    stop
}: Props) {
    const selectedStop = useMemo(() => {
        if (!stop) return null;
        return getPrepareStops([stop])[0];
    }, [stop]);

    const stop_address = selectedStop
        ? `${selectedStop.location?.city || ''}, ${selectedStop.location?.state || ''} ${
            selectedStop.location?.postalCode ?? ''
        }`
        : '';
    const stop_time = selectedStop
        ? `${formatDate(selectedStop.appointmentStartAtLocal)} ${
            selectedStop.location?.timezone ?? ''
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

export default memo(ManifestStop);
