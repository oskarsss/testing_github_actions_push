import { Stack, Typography } from '@mui/material';
import GpsFixedSharpIcon from '@mui/icons-material/GpsFixedSharp';
import LocationDisabledSharpIcon from '@mui/icons-material/LocationDisabledSharp';
import { useTruckLocation } from '@/store/streams/events/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    truckId: string;
};

export default function Address({ truckId }: Props) {
    const truckLocation = useTruckLocation(truckId);
    const { t } = useAppTranslation('common');

    return (
        <Stack
            direction="row"
            gap="3px"
            alignItems="center"
        >
            {truckLocation ? (
                <>
                    <GpsFixedSharpIcon
                        color="primary"
                        sx={{
                            fontSize: '12px'
                        }}
                        aria-label="Location available"
                    />

                    <Typography
                        variant="caption"
                        fontWeight={500}
                        lineHeight="20px"
                        maxWidth="125px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                    >
                        {truckLocation?.address}
                    </Typography>
                </>
            ) : (
                <>
                    <LocationDisabledSharpIcon
                        color="primary"
                        sx={{
                            fontSize: '12px',
                            color   : (theme) => theme.palette.utility.foreground.error.primary
                        }}
                        aria-label="No location"
                    />

                    <Typography
                        variant="caption"
                        fontWeight={500}
                        lineHeight="20px"
                    >
                        {t('empty.no_location')}
                    </Typography>
                </>
            )}
        </Stack>
    );
}
