import { Stack } from '@mui/material';
import React from 'react';
import CapListStyled from '@/views/dispatch/scheduling/dialogs/CapList/styled';

type Props = {
    icon: React.ReactNode;
    name: string;
};

export default function TypeCell({
    icon,
    name
}: Props) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
                svg: {
                    width : '24px',
                    height: '24px'
                }
            }}
        >
            {icon}
            <CapListStyled.MainTextCell noWrap>{name}</CapListStyled.MainTextCell>
        </Stack>
    );
}
