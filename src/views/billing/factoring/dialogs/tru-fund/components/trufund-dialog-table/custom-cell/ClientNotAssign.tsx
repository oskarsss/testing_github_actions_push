import { Stack, Tooltip, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function ClientNotAssign() {
    const { t } = useAppTranslation();
    return (
        <Tooltip
            disableInteractive
            title={t('billing:dialogs.open_edit_load')}
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="4px"
                sx={{
                    cursor: 'pointer'
                }}
            >
                <AddCircleOutlineIcon
                    color="primary"
                    sx={{ fontSize: '16px' }}
                />
                <Typography
                    noWrap
                    fontWeight={500}
                    fontSize="12px"
                    lineHeight="18px"
                    color="semantic.text.brand.primary"
                    textTransform="uppercase"
                >
                    {t('common:button.assign')}
                </Typography>
            </Stack>
        </Tooltip>
    );
}
