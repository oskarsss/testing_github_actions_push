import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import moment from 'moment-timezone';
import MarkAllAsReadButton from './MarkAllAsReadButton';

export default function Index() {
    const { t } = useAppTranslation();

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap="10px"
            padding="0 20px"
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="4px"
            >
                <Typography
                    variant="body1"
                    fontWeight={500}
                    fontSize="12px"
                    color="semantic.foreground.disabled"
                >
                    {t('common:days.today')}
                </Typography>

                <Typography
                    variant="body1"
                    fontWeight={500}
                    fontSize="12px"
                    color="semantic.foreground.disabled"
                    borderRadius="50%"
                />

                <Typography
                    variant="body1"
                    fontWeight={500}
                    fontSize="12px"
                    color="semantic.foreground.disabled"
                >
                    {moment().format('ddd, MMM DD')}
                </Typography>
            </Stack>

            <MarkAllAsReadButton />
        </Stack>
    );
}
