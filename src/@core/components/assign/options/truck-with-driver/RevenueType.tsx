import { Typography, Stack, IconButton } from '@mui/material';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { useRevenueTypesMap } from '@/store/hash_maps/hooks';
import { MouseEvent } from 'react';
import TrucksTypes from '@/store/fleet/trucks/types';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    item: TrucksTypes.ConvertedTruckRow;
};

export default function RevenueType({ item }: Props) {
    const editDriverDialog = useEditDriverDialog();
    const revenueTypesMap = useRevenueTypesMap();
    const { t } = useAppTranslation('core');
    if (!item.driver) {
        return null;
    }

    const openEditDriverDialog = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        editDriverDialog.open({ driver_id: item.driver?.driverId || '' });
    };

    const revenueType = revenueTypesMap[item.driver?.settlementRevenueTypeId];

    return (
        <Stack
            direction="row"
            gap="5px"
            alignItems="center"
        >
            {revenueType ? (
                <Typography
                    variant="caption"
                    fontWeight={500}
                    fontSize="12px"
                    lineHeight="20px"
                >
                    {revenueType.name}
                </Typography>
            ) : (
                <IconButton
                    sx={{
                        padding     : '0 4px',
                        borderRadius: '4px',
                        gap         : '3px'
                    }}
                    onClick={openEditDriverDialog}
                    aria-label="Add revenue type"
                >
                    <AddCircleOutlineSharpIcon
                        color="primary"
                        sx={{
                            fontSize: '12px'
                        }}
                    />

                    <Typography
                        variant="caption"
                        fontWeight={500}
                        fontSize="12px"
                        lineHeight="20px"
                        sx={{ color: (theme) => theme.palette.semantic.foreground.brand.primary }}
                    >
                        {t('assign_menu.revenue_type')}
                    </Typography>
                </IconButton>
            )}
        </Stack>
    );
}
