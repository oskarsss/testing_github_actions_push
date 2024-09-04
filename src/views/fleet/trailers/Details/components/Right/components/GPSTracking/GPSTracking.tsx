import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { memo } from 'react';
import GPSTrackingContent from '@/views/fleet/trailers/Details/components/Right/components/GPSTracking/GPSTrackingContent/GPSTrackingContent';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    integration_provide_id?: string;
    timestamp?: number;
    lon?: number;
    lat?: number;
    icon: string;
};

function GPSTracking({
    integration_provide_id,
    timestamp,
    lon,
    lat,
    icon
}: Props) {
    const { t } = useAppTranslation();
    const router = useRouter();

    const moveToIntegration = () => {
        router.push('/settings/integrations');
    };

    return (
        <RightStyled.IconBlock>
            <Box>
                <Typography variant="subtitle1">{t('common:gps_tracking')}</Typography>

                {!integration_provide_id && (
                    <Button
                        onClick={moveToIntegration}
                        startIcon={<AddIcon />}
                    >
                        {t('common:link_to_eld')}
                    </Button>
                )}
            </Box>

            <GPSTrackingContent
                integration_provide_id={integration_provide_id}
                timestamp={timestamp}
                lat={lat}
                lon={lon}
                icon={icon}
            />
        </RightStyled.IconBlock>
    );
}

export default memo(GPSTracking);
