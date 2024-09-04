import { Stack, Typography } from '@mui/material';
import { UpTrendIcon } from '@/@core/theme/entities/settlement/icons';

type Props = {
    percentage: string;
};

function UpTrend({ percentage }: Props) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
        >
            <UpTrendIcon />
            <Typography
                fontSize="14px"
                fontWeight={500}
                color="#12B76A"
            >
                {percentage || 0}%
            </Typography>
        </Stack>
    );
}

export default UpTrend;
