import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    Icon: React.ReactNode;
    title: IntlMessageKey;
    onClick: () => void;
};

export default function TabHeader({
    Icon,
    title,
    onClick
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack
                direction="row"
                gap={1}
            >
                {Icon}
                <Typography
                    fontSize="16px"
                    fontWeight={600}
                    sx={{
                        color: ({ palette }) => palette.semantic.text.primary
                    }}
                    variant="body1"
                >
                    {t(title)}
                </Typography>
            </Stack>
            <Button
                onClick={onClick}
                startIcon={<AddIcon />}
                size="small"
                variant="contained"
                color="primary"
            >
                {t('common:button.add')}
            </Button>
        </Stack>
    );
}
