import { Stack, Typography, Divider } from '@mui/material';
import TrucksTypes from '@/store/fleet/trucks/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    item: TrucksTypes.ConvertedTruckRow;
};

export default function Title({ item }: Props) {
    const { t } = useAppTranslation('core');
    return (
        <Stack
            direction="row"
            gap="5px"
            alignItems="center"
        >
            <Typography
                variant="body1"
                fontWeight={500}
                lineHeight="20px"
            >
                #{item.referenceId}
            </Typography>

            <Divider
                orientation="vertical"
                sx={{
                    margin    : 0,
                    height    : '12px',
                    width     : '2px',
                    background: (theme) => theme.palette.semantic.text.primary
                }}
            />

            <Typography
                variant="body1"
                fontWeight={500}
                lineHeight="20px"
            >
                {item.driver
                    ? `${item.driver.firstName} ${item.driver.lastName}`
                    : t('assign_menu.no_driver')}
            </Typography>
        </Stack>
    );
}
