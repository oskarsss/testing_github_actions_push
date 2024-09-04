import React, { PropsWithChildren } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import { Stack, Typography } from '@mui/material';

type OptionsItemProps = PropsWithChildren<{
    Icon: typeof VectorIcons.CheckListIcon;
    text: string;
    size?: 'small' | 'medium';
    onClick?: () => void;
}>;
const OptionsItem = ({
    Icon,
    text,
    children,
    size = 'medium',
    onClick
}: OptionsItemProps) => (
    <Stack
        onClick={onClick}
        flexDirection="row"
        alignItems="center"
        paddingY="6px"
        gap={size === 'medium' ? '8px' : '4px'}
        paddingX={size === 'medium' ? '12px' : '8px'}
        width="100%"
        sx={
            onClick
                ? {
                    cursor   : 'pointer',
                    '&:hover': {
                        backgroundColor: (theme) => theme.palette.semantic.foreground.secondary
                    }
                }
                : undefined
        }
    >
        <Icon
            sx={{
                fontSize: size === 'medium' ? '18px' : '16px',
                color   : (theme) => theme.palette.semantic.foreground.primary
            }}
        />
        <Typography
            fontSize={size === 'medium' ? '16px' : '12px'}
            fontWeight={500}
            sx={{ color: (theme) => theme.palette.semantic.text.secondary }}
            mr="auto"
        >
            {text}
        </Typography>
        {children}
    </Stack>
);

export default OptionsItem;
