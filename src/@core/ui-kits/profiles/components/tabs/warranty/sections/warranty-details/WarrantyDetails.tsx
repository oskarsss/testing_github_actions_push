import { Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import WarrantyDetailsTabs from '@/@core/ui-kits/profiles/components/tabs/warranty/sections/warranty-details/WarrantyDetailsTabs';
import WarrantyIcons from '@/@core/ui-kits/profiles/components/tabs/warranty/icons';

type Props = {
    vehicleWarrantyId: string;
};

function WarrantyDetails({ vehicleWarrantyId }: Props) {
    const { t } = useAppTranslation();

    return (
        <Stack
            flex={3}
            gap="12px"
            height="100%"
            overflow="hidden"
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="4px"
            >
                <WarrantyIcons.DetailsIcon />

                <Typography
                    variant="body1"
                    fontWeight={600}
                >
                    {t('common:profile.center.warranty.section_titles.details')}
                </Typography>
            </Stack>

            <WarrantyDetailsTabs vehicleWarrantyId={vehicleWarrantyId} />
        </Stack>
    );
}

export default memo(WarrantyDetails);
