import { Stack, Typography } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

type Props = {
    info: string;
    subInfo: string | ReactNode;
    align?: CSSProperties['alignItems'];
};

export default function CellWithMultipleLines({
    info,
    subInfo,
    align
}: Props) {
    return (
        <Stack
            direction="column"
            alignItems={align}
        >
            <Typography
                color={(theme) =>
                    theme.palette.mode === 'light' ? theme.palette.semantic.text.primary : '#CCCCCC'}
                fontSize="12px"
                fontWeight="500"
                lineHeight="18px"
                sx={{
                    overflow    : 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace  : 'nowrap'
                }}
            >
                {info}
            </Typography>

            <Typography
                color={(theme) => (theme.palette.mode === 'light' ? '#667085' : '#CCCCCC')}
                fontSize="10px"
                fontWeight="400"
                lineHeight="15px"
                sx={{
                    overflow    : 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace  : 'nowrap'
                }}
            >
                {subInfo}
            </Typography>
        </Stack>
    );
}
