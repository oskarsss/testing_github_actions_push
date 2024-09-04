import { Typography, Stack } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
    amount: number;
    icon: ReactNode;
    isSelected: boolean;
};

export default function ItemsAmount({
    amount,
    icon,
    isSelected
}: Props) {
    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            height="21px"
            padding="0px 4px"
            borderRadius="16px"
            gap="4px"
            sx={{
                '& .MuiTypography-root': {
                    color: ({ palette }) =>
                        isSelected
                            ? palette.semantic.text.brand.primary
                            : palette.semantic.text.secondary
                },
                backgroundColor: ({ palette }) =>
                    isSelected
                        ? palette.semantic.foreground.brand.secondary
                        : palette.semantic.foreground.secondary,

                svg: {
                    width : '12px',
                    height: '12px',
                    fill  : ({ palette }) =>
                        isSelected
                            ? palette.semantic.foreground.brand.primary
                            : palette.semantic.foreground.primary,

                    path: {
                        fill: ({ palette }) =>
                            isSelected
                                ? palette.semantic.foreground.brand.primary
                                : palette.semantic.foreground.primary
                    }
                }
            }}
        >
            <Typography
                fontSize="12px"
                fontWeight={600}
                lineHeight={1.4}
                color="inherit"
            >
                {amount}
            </Typography>
            {icon}
        </Stack>
    );
}
