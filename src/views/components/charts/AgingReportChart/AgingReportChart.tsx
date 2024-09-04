import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';
import { useChartAgingReport } from '@/store/charts/hooks';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import { AppPalette } from '@/@core/theme/palette';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ChartContainer from '../ChartContainer';
import styles from './AgingReportChart.module.scss';

const getColorsChart = (palette: AppPalette) => [
    palette.colors.brand[100],
    palette.colors.brand[200],
    palette.colors.brand[300],
    palette.colors.brand[400],
    palette.colors.brand[500]
];

const AgingReportChart = () => {
    const { t } = useAppTranslation();
    const {
        items,
        isLoading
    } = useChartAgingReport();

    const {
        mode,
        semantic: {
            text,
            background,
            border
        }
    } = useTheme().palette;
    const isDark = mode === 'dark';

    const COLORS_CHART = getColorsChart(useTheme().palette);

    const Chart = useMemo(() => dynamic(() => import('react-apexcharts'), { ssr: false }), []);

    const DataChart: { series: { data: number[] }[]; options: ApexOptions } = {
        series : items.map((item) => ({ data: [parseInt(item.ordersPercentage, 10)] })),
        options: {
            chart: {
                type     : 'bar',
                stacked  : true,
                stackType: '100%',
                toolbar  : { show: false }
            },
            colors     : COLORS_CHART,
            plotOptions: {
                bar: {
                    horizontal             : true,
                    borderRadius           : 4,
                    borderRadiusWhenStacked: 'all',
                    columnWidth            : '100%',
                    barHeight              : '100%'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width : 2,
                colors: [background.primary] as string[]
            },
            states: {
                normal: { filter: { type: 'none', value: 0 } },
                hover : { filter: { type: 'none', value: 0 } },
                active: { filter: { type: 'none', value: 0 } }
            },
            xaxis: {
                labels    : { show: false },
                axisBorder: { show: false },
                axisTicks : { show: false }
            },
            yaxis: {
                labels    : { show: false },
                axisBorder: {
                    show   : false,
                    offsetX: 0
                },
                axisTicks: { show: false }
            },
            grid: {
                show   : false,
                padding: {
                    left  : 100,
                    right : 0,
                    top   : 0,
                    bottom: 0
                }
            },
            tooltip: { enabled: false },
            fill   : {
                opacity: 1
            },
            legend: { show: false }
        }
    };

    const header = (
        <>
            <Typography sx={{ fontWeight: 600, fontSize: '24px', whiteSpace: 'nowrap' }}>
                {t('analytics:charts.aging_reports.title')}
            </Typography>
            <div className={styles.Chart}>
                <Chart
                    options={DataChart.options}
                    series={DataChart.series}
                    type="bar"
                    height={64}
                />
            </div>
        </>
    );

    return (
        <ChartContainer
            header={header}
            isLoading={isLoading}
        >
            <ul className={styles.List}>
                {items.map((item, index) => (
                    <li
                        style={{
                            backgroundColor: background.secondary,
                            borderColor    : border.primary
                        }}
                        key={item.label ?? index}
                        className={styles.Item}
                    >
                        <div
                            style={{
                                backgroundColor: background.primary,
                                color          : text.secondary
                            }}
                            className={styles.Header}
                        >
                            <div className={styles.Label}>{item.label}</div>
                            {parseInt(item.ordersPercentage, 10) > 0 && (
                                <div
                                    className={styles.Percentage}
                                    style={{
                                        background: COLORS_CHART[index],
                                        color     : text.white
                                    }}
                                >
                                    {item.ordersPercentage}
                                </div>
                            )}
                        </div>
                        <div className={styles.Column}>
                            {parseInt(item.ordersPercentage, 10) > 0 && (
                                <div
                                    className={styles.Indicator}
                                    style={{
                                        background: COLORS_CHART[index]
                                    }}
                                />
                            )}
                            <div
                                style={{ borderColor: border.primary, color: text.secondary }}
                                className={styles.Row}
                            >
                                <div className={styles.Title}>
                                    {t('analytics:charts.aging_reports.info.loads')}
                                </div>
                                <div
                                    style={{ color: text.primary }}
                                    className={styles.Value}
                                >
                                    {item.ordersPercentage}
                                </div>
                            </div>
                            <div
                                style={{ borderColor: border.primary, color: text.secondary }}
                                className={styles.Row}
                            >
                                <div className={styles.Title}>
                                    {t('analytics:charts.aging_reports.info.total')}
                                </div>
                                <div
                                    style={{ color: text.primary }}
                                    className={styles.Value}
                                >
                                    {item.totalCurrency}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </ChartContainer>
    );
};

export default memo(AgingReportChart);
