import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useChartTotalUnpaid } from '@/store/charts/hooks';
import AnalyticsEmptyScreen from '@/views/analytics/components/EmptyScreen/AnalyticsEmptyScreen';
import TotalUnpaidChartContent from '@/views/components/charts/TotalUnpaidChart/components/TotalUnpaidChartContent';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ChartContainer from '../ChartContainer';

const TotalUnpaidChart = () => {
    const { t } = useAppTranslation();
    const {
        items,
        totalUnpaidCurrency,
        isLoading
    } = useChartTotalUnpaid();

    return (
        <ChartContainer
            header={(
                <Typography sx={{ fontWeight: 600, fontSize: '24px' }}>
                    {t('analytics:charts.total_unpaid.title')}
                </Typography>
            )}
            isLoading={isLoading}
            styleContent={items?.length ? { height: '100%', minHeight: '200px' } : undefined}
        >
            {items?.length ? (
                <TotalUnpaidChartContent
                    items={items}
                    totalUnpaidCurrency={totalUnpaidCurrency}
                />
            ) : (
                <AnalyticsEmptyScreen
                    type="total_unpaid"
                    size="large"
                />
            )}
        </ChartContainer>
    );
};

export default memo(TotalUnpaidChart);
