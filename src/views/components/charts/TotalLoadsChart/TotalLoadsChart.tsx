import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useChartTotalOrders } from '@/store/charts/hooks';
import AnalyticsEmptyScreen from '@/views/analytics/components/EmptyScreen/AnalyticsEmptyScreen';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ChartContainer from '../ChartContainer';
import TotalLoadsChartContent from './TotalLoadsChartContent';

const TotalLoadsChart = () => {
    const { t } = useAppTranslation();
    const {
        items,
        total,
        isLoading
    } = useChartTotalOrders();

    return (
        <ChartContainer
            header={(
                <Typography
                    variant="h5"
                    fontWeight={600}
                    lineHeight={1.5}
                    letterSpacing={0.15}
                >
                    {t('analytics:charts.total_loads.title')}
                </Typography>
            )}
            isLoading={isLoading}
            styleContent={!items.length ? { height: '100%' } : undefined}
        >
            {items.length ? (
                <TotalLoadsChartContent
                    items={items}
                    loadCount={total}
                />
            ) : (
                <AnalyticsEmptyScreen type="total_loads" />
            )}
        </ChartContainer>
    );
};

export default memo(TotalLoadsChart);
