import { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCreateCoverageItemDialog } from '@/@core/ui-kits/profiles/components/tabs/warranty/modals/coverage-item/CreateCoverageItem';

type Props = {
    vehicleWarrantyId: string;
    count: number;
};

function CoverageItemsHeader({
    vehicleWarrantyId,
    count
}: Props) {
    const { t } = useAppTranslation();
    const createWarrantyItemDialog = useCreateCoverageItemDialog();

    const createNewItem = () => {
        createWarrantyItemDialog.open({ vehicleWarrantyId });
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Typography
                variant="body1"
                fontWeight={600}
            >
                {t('common:profile.center.warranty.tabs.coverage_items.total_items', {
                    count
                })}
            </Typography>

            <Button
                variant="text"
                startIcon={<AddIcon fontSize="small" />}
                onClick={createNewItem}
                size="small"
            >
                {t('common:button.add_item')}
            </Button>
        </Stack>
    );
}

export default memo(CoverageItemsHeader);
