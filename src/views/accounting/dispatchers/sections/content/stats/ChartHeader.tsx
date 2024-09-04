import { Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export enum ChartTitle {
    AVERAGE_GROSS = 'dispatchers:stats.average_gross',
    AVERAGE_RPM = 'dispatchers:stats.average_rpm'
}

type Props = {
    title: ChartTitle;
};

export default function ChartHeader({ title }: Props) {
    const { t } = useAppTranslation();

    return (
        <Typography
            variant="h5"
            fontWeight={600}
            padding="16px"
        >
            {t(title)}
        </Typography>
    );
}
