import { TodayTitle } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import Stack from '@mui/material/Stack';
import { CSSProperties } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    size: 'small' | 'normal';
    styles: CSSProperties;
};

export default function TodayItem({
    size,
    styles
}: Props) {
    const { t } = useAppTranslation('common');

    return (
        <Stack
            textAlign="center"
            sx={{ ...styles }}
        >
            <TodayTitle size={size}>{t('days.today')}</TodayTitle>
        </Stack>
    );
}
