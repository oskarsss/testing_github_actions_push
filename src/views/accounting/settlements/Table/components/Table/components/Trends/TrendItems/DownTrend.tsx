import { Stack, Typography } from '@mui/material';
import { DownTrendIcon } from '@/@core/theme/entities/settlement/icons';

type Props = {
    percentage: string;
};

function DownTrend({ percentage }: Props) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
        >
            <DownTrendIcon />
            <Typography
                fontSize="14px"
                fontWeight={500}
                color="#F04438"
                sx={{
                    verticalAlign: 'middle'
                }}
            >
                {percentage || 0}%
            </Typography>
        </Stack>
    );
}

export default DownTrend;
