import { memo } from 'react';
import { Stack, Typography } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Content from '@/views/maintenance/service-logs/main/sections/panel/components/driver/Content';
import { DriverModel_Driver } from '@proto/models/model_driver';

type Props = {
    driver?: DriverModel_Driver;
};

function Driver({ driver }: Props) {
    const { t } = useAppTranslation();

    return (
        <Stack gap="12px">
            <Stack
                direction="row"
                alignItems="center"
                gap="8px"
            >
                <VectorIcons.Maintenance.Driver
                    sx={{
                        fontSize: '24px',

                        fill: ({ palette }) => palette.semantic.foreground.brand.primary
                    }}
                />

                <Typography
                    variant="body1"
                    fontWeight={600}
                >
                    {t('entity:driver')}
                </Typography>
            </Stack>

            <Content driver={driver} />
        </Stack>
    );
}

export default memo(Driver);
