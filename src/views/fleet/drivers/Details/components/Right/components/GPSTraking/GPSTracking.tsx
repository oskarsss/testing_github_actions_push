import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import GPSTrackingContent from '@/views/fleet/drivers/Details/components/Right/components/GPSTraking/GPSTrackingContent/GPSTrackingContent';

export type GPSTrackingProps = {
    id: string;
};

export default function GPSTracking({ id }: GPSTrackingProps) {
    const { t } = useAppTranslation();

    return (
        <RightStyled.IconBlock>
            <Box>
                <Typography>{t('common:gps_tracking')}</Typography>
            </Box>

            <GPSTrackingContent id={id} />
        </RightStyled.IconBlock>
    );
}
