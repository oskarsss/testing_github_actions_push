import { Stack, Typography } from '@mui/material';
import { ENTITY_CHIP_COLORS } from '@/@core/theme/entities';
import { ReactNode } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    status: string;
    icons: (size: number | undefined) => Record<string, ReactNode>;
    icon_size?: number;
    text: IntlMessageKey;
    children?: ReactNode;
};

export default function StatusBadge({
    status,
    icons,
    icon_size = 16,
    text,
    children
}: Props) {
    const { t } = useAppTranslation();
    const chip_color = ENTITY_CHIP_COLORS[status] || 'gray';

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            width="fit-content"
            sx={{
                backgroundColor: (theme) => theme.palette.utility.foreground[chip_color].secondary,
                padding        : '1px 6px',
                color          : (theme) => theme.palette.utility.foreground[chip_color].primary,
                maxHeight      : 32,
                borderRadius   : '4px'
            }}
        >
            {icons(icon_size)[status]}
            <Typography
                variant="body2"
                fontWeight={500}
                fontSize="12px"
                sx={{
                    whiteSpace: 'nowrap',
                    color     : (theme) => theme.palette.utility.text[chip_color]
                }}
            >
                {t(text)}
            </Typography>
            {children}
        </Stack>
    );
}
