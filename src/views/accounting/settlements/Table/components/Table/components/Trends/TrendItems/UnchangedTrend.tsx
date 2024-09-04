import { Stack, Typography } from '@mui/material';

type Props = {
    percentage: string;
};

function UnchangedTrend({ percentage }: Props) {
    return (
        <Stack
            direction="row"
            spacing={2}
        >
            <span style={{ color: 'orange' }}>▼</span>
            <Typography
                fontSize="14px"
                fontWeight={500}
                color="orange"
            >
                {percentage || 0}%
            </Typography>
        </Stack>
    );
}

export default UnchangedTrend;
