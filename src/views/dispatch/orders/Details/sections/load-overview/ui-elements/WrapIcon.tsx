import LoadOverviewStyled from '@/views/dispatch/orders/Details/sections/load-overview/LoadOverview.styled';
import { Stack, Tooltip } from '@mui/material';
import { PropsWithChildren } from 'react';

type Props = {
    title: string;
} & PropsWithChildren;

export default function WrapIcon({
    title,
    children
}: Props) {
    return (
        <Stack>
            <Tooltip
                disableInteractive
                title={title}
            >
                <LoadOverviewStyled.Item.IconWrapper>
                    {children}
                </LoadOverviewStyled.Item.IconWrapper>
            </Tooltip>
        </Stack>
    );
}
