import { Stack } from '@mui/material';
import React from 'react';
import { IChipColors } from '@/@core/theme/chip';

type Props = {
    text: string;
    icon: React.ReactNode;
    iconColor?: IChipColors;
};

export default function OptionComponent({
    text,
    icon,
    iconColor
}: Props) {
    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            gap="4px"
            overflow="hidden"
            sx={{
                svg: {
                    fontSize: '16px',
                    color   : (theme) =>
                        iconColor
                            ? theme.palette.utility.foreground[iconColor]?.primary
                            : theme.palette.semantic.foreground.primary
                }
            }}
        >
            {icon}
            <span
                style={{
                    overflow    : 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace  : 'nowrap'
                }}
            >
                {text}
            </span>
        </Stack>
    );
}
