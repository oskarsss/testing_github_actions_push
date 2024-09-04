import { Stack, Typography } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

type Props = {
    label: string;
    Icon?: ReactNode;
    color?: CSSProperties['color'];
};

export default function CommonTabLabel({
    label,
    Icon,
    color
}: Props) {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            {Icon ?? null}
            <Typography
                fontSize="12px"
                lineHeight="18px"
                variant="body1"
                sx={{ color: (theme) => color || theme.palette.semantic.foreground.primary }}
                fontWeight={600}
            >
                {label}
            </Typography>
        </Stack>
    );
}
