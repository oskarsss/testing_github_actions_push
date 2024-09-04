import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import WarrantyIcons from '@/@core/ui-kits/profiles/components/tabs/warranty/icons';

export default function CoverageItemsTableNoItems() {
    const { t } = useAppTranslation();

    return (
        <Stack
            gap="12px"
            alignItems="center"
            justifyContent="center"
            paddingTop="60px"
            textAlign="center"
        >
            <WarrantyIcons.SearchIcon />

            <Typography
                variant="body1"
                fontWeight={600}
                width="230px"
            >
                {t('common:profile.center.warranty.tabs.coverage_items.table.no_items')}
            </Typography>
        </Stack>
    );
}
