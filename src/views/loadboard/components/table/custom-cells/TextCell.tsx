import { Box, SxProps, Theme, Typography } from '@mui/material';
import { memo } from 'react';

type Props = {
    text: string | number;
    sx?: SxProps<Theme>;
};

function TextCell({
    text,
    sx
}: Props) {
    return (
        <Box>
            <Typography
                noWrap
                fontWeight={500}
                color="semantic.text.secondary"
                fontSize="14px"
                sx={sx}
            >
                {text}
            </Typography>
        </Box>
    );
}

export default memo(TextCell);
