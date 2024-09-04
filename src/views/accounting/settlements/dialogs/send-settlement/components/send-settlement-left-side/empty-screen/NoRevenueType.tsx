import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';
import SettingIcons from '@/views/settings/icons/icons';

type Props = {
    driverId: string;
};

export default function NoRevenueType({ driverId }: Props) {
    const { t } = useAppTranslation();
    const editDriverDialog = useEditDriverDialog();

    const openEditDriver = () => {
        editDriverDialog.open({ driver_id: driverId });
    };

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            gap="8px"
            minHeight="90px"
            height="100%"
        >
            <SettingIcons.RevenueTypes
                sx={{
                    fontSize: '40px',
                    color   : (theme) => theme.palette.semantic.foreground.primary
                }}
            />
            <Typography
                fontSize="18px"
                fontWeight={600}
                lineHeight={1.4}
                color={(theme) => theme.palette.semantic.text.primary}
            >
                {t('modals:settlements.send_settlement.empty.no_revenue_type')}
            </Typography>
            <Typography
                fontSize="14px"
                fontWeight={500}
                lineHeight={1.4}
                maxWidth="200px"
                textAlign="center"
                color={(theme) => theme.palette.semantic.text.secondary}
            >
                <Typography
                    component="span"
                    fontSize="inherit"
                    fontWeight="inherit"
                    lineHeight="inherit"
                    textAlign="center"
                    color={(theme) => theme.palette.semantic.text.brand.primary}
                    onClick={openEditDriver}
                    sx={{
                        cursor    : 'pointer',
                        transition: 'opacity 0.3s',
                        '&:hover' : {
                            opacity: 0.7
                        }
                    }}
                >
                    {t('modals:settlements.send_settlement.empty.no_revenue_type_id.text_button')}{' '}
                </Typography>
                {t('modals:settlements.send_settlement.empty.no_revenue_type_id.text_after_button')}
            </Typography>
        </Stack>
    );
}
