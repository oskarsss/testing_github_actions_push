import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';

type TabLabelProps = PropsWithChildren<{
    label: string;
    labelForSmallScreen?: string;
    Icon: ReactNode;
    isSelected: boolean;
}>;

export default function TabLabel({
    label,
    labelForSmallScreen,
    isSelected,
    Icon,
    children
}: TabLabelProps) {
    const { breakpoints } = useTheme();
    const isXl = useMediaQuery(breakpoints.up('xl'));
    const { palette } = useTheme();
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            {Icon}
            <Typography
                fontSize="14px"
                lineHeight="20px"
                variant="body1"
                color={isSelected ? palette.semantic.text.brand.primary : 'GrayText'}
                fontWeight={600}
                textTransform="capitalize"
            >
                {!isXl && labelForSmallScreen ? labelForSmallScreen : label}
            </Typography>
            {children}
        </Stack>
    );
}
