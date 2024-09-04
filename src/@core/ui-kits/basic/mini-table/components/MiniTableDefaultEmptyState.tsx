import { Stack } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import { ReactElement } from 'react';

type Props = {
    text?: IntlMessageKey | ReactElement;
};

export default function MiniTableDefaultEmptyState({
    text = 'core:basic.mini_table.no_items'
}: Props) {
    const { t } = useAppTranslation();

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            color="text.secondary"
        >
            {typeof text === 'string' ? t(text) : text}
        </Stack>
    );
}
