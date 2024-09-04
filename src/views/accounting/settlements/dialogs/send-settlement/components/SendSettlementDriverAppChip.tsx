import VectorIcons from '@/@core/icons/vector_icons';
import { Stack } from '@mui/material';
import { useLastDriverPing } from '@/store/streams/events/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    driverId: string;
};

export default function SendSettlementDriverAppChip({ driverId }: Props) {
    const driverPing = useLastDriverPing(driverId);
    const { t } = useAppTranslation('modals');

    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            gap="4px"
            paddingX="6px"
            height="20px"
            borderRadius="4px"
            fontSize="12px"
            fontWeight={500}
            lineHeight={1.3}
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.utility.foreground[driverPing ? 'blue_dark' : 'error'].secondary,
                color: (theme) => theme.palette.utility.text[driverPing ? 'blue_dark' : 'error'],
                svg  : {
                    fontSize: '16px'
                }
            }}
        >
            {driverPing ? <VectorIcons.PhoneCheckMarkIcon /> : <VectorIcons.PhoneCrossMarkIcon />}
            {t('settlements.send_settlement.driver_app')}
        </Stack>
    );
}
