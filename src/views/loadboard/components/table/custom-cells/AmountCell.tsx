import { Box } from '@mui/material';
import { memo } from 'react';

type Props = {
    amount: number | string;
};

function AmountCell({ amount }: Props) {
    return (
        <Box
            sx={{
                display       : 'flex',
                flexDirection : 'row',
                justifyContent: 'flex-end',
                alignItems    : 'center',
                height        : '100%',
                fontSize      : '14px',
                fontWeight    : 500,
                color         : ({ palette }) => palette.semantic.text.primary
            }}
        >
            {amount}
        </Box>
    );
}

export default memo(AmountCell);
