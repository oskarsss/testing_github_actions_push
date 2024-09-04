import CapListStyled from '@/views/dispatch/scheduling/dialogs/CapList/styled';
import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import moment from 'moment-timezone';

type Props = {
    emptyAt: string | null;
};

export default function EmptyAtCapListCell({ emptyAt }: Props) {
    const { t } = useAppTranslation('common');

    const emptyAtFormatted = emptyAt
        ? [moment(emptyAt).format('DD MMM'), moment(emptyAt).format('HH:mm')]
        : null;

    if (!emptyAtFormatted) {
        return (
            <Typography
                fontSize="14px"
                lineHeight="18px"
                fontWeight={500}
                sx={{
                    color: (theme) => theme.palette.semantic.text.secondary
                }}
            >
                {t('now')}
            </Typography>
        );
    }

    return (
        <Stack>
            <CapListStyled.MainTextCell>{emptyAtFormatted[0]}</CapListStyled.MainTextCell>

            <CapListStyled.SecondaryTextCell>{emptyAtFormatted[1]}</CapListStyled.SecondaryTextCell>
        </Stack>
    );
}
