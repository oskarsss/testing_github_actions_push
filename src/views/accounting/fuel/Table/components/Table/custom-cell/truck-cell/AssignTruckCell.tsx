import { Stack } from '@mui/material';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

function FuelAssignTruck() {
    const { t } = useAppTranslation('common');
    return (
        <Stack
            direction="row"
            gap="4px"
            alignItems="center"
            color={(theme) => theme.palette.semantic.foreground.brand.primary}
            fontWeight={500}
        >
            <ControlPointDuplicateIcon
                color="primary"
                style={{ fontSize: '20px' }}
            />
            {t('button.assign')}
        </Stack>
    );
}

export default FuelAssignTruck;
