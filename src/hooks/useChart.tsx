/* eslint-disable no-case-declarations */
import ChartsTypes from '@/store/charts/types';
import TotalUnpaidChart from '../views/components/charts/TotalUnpaidChart/TotalUnpaidChart';
import TotalLoadsChart from '../views/components/charts/TotalLoadsChart/TotalLoadsChart';
import TopDebtorsChart from '../views/components/charts/TopDebtorsChart/TopDebtorsChart';
import AgingReportChart from '../views/components/charts/AgingReportChart/AgingReportChart';

export default function useChart(chart_id?: ChartsTypes.ChartIds) {
    switch (chart_id) {
    case ChartsTypes.ChartIds.TOTAL_UNPAID:
        return <TotalUnpaidChart />;
    case ChartsTypes.ChartIds.TOTAL_LOADS:
        return <TotalLoadsChart />;
    case ChartsTypes.ChartIds.TOP_DEBTORS:
        return <TopDebtorsChart />;
    case ChartsTypes.ChartIds.AGING_REPORT:
        return <AgingReportChart />;
    default:
        return null;
    }
}
