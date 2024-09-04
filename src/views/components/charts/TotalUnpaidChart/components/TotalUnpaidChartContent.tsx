import { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TotalUnpaidChartListItem from '@/views/components/charts/TotalUnpaidChart/components/TotalUnpaidChartListItem';
import TotalUnpaidChartComponents from '@/views/components/charts/TotalUnpaidChart/components/TotalUnpaidChartComponents';
import { LoadInvoiceStatus } from '@/models/loads/load';
import { ChartTotalUnpaidRetrieveReply_Item } from '@proto/chart';
import { LOAD_INVOICE_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import { LOAD_INVOICE_STATUS_COLORS } from '@/@core/theme/entities/load/invoice_status';

type W = {
    config: {
        labels: string[];
        dataLabelsRects: string[];
        series: number[];
    };
};
interface CustomOptions {
    seriesIndex: number;
    w: W;
}

type Props = {
    items: ChartTotalUnpaidRetrieveReply_Item[];
    totalUnpaidCurrency?: string;
};

export default function TotalUnpaidChartContent({
    items,
    totalUnpaidCurrency
}: Props) {
    const {
        palette,
        breakpoints
    } = useTheme();
    const { t } = useAppTranslation();
    const Chart = useMemo(() => dynamic(() => import('react-apexcharts'), { ssr: false }), []);

    const seriesChart = useMemo(
        () => items.map((item) => parseInt(item.amountPercentage, 10)),
        [items]
    );

    const optionsChart: ApexOptions = useMemo(
        () => ({
            chart: {
                type     : 'donut',
                width    : '100%',
                height   : 366,
                sparkline: {
                    enabled: true
                },
                events: {
                    dataPointMouseEnter(e, chart) {
                        if (chart.el) {
                            const tooltip = chart.el.querySelector('.apexcharts-tooltip');
                            const chartEl = chart.el.querySelector('.apexcharts-canvas');
                            if (tooltip && chartEl) {
                                const position = chartEl.getBoundingClientRect();
                                tooltip.style.transform = `translate(${position.left + 10}px, ${
                                    position.top - 10
                                }px)`;
                            }
                        }
                    }
                }
            },
            legend         : { show: false },
            labels         : items.map((item) => LOAD_INVOICE_STATUS_GRPC_ENUM[item.invoiceStatus]),
            dataLabelsRects: items.map((item) => item.amountCurrency),
            tooltip        : {
                enabled        : true,
                fillSeriesColor: false,
                theme          : palette.mode,
                custom({
                    seriesIndex,
                    w
                }: CustomOptions) {
                    const invoice_status = w.config.labels[seriesIndex] as LoadInvoiceStatus;
                    return (
                        `<div class="chart-tooltip"><span class="chart-tooltip__title">${t(
                            `state_info:loads.invoice_status.${invoice_status}`
                        )}</span>` +
                        `<span class="chart-tooltip__amount">${w.config.dataLabelsRects[seriesIndex]}</span>` +
                        `<span class="chart-tooltip__percentage ${invoice_status}"` +
                        `>${w.config.series[seriesIndex].toFixed()}%</span>` +
                        '</div>'
                    );
                }
            },
            fill: {
                colors: items.map((item) => {
                    const status = LOAD_INVOICE_STATUS_GRPC_ENUM[item.invoiceStatus];
                    return palette.utility.foreground[LOAD_INVOICE_STATUS_COLORS[status]]?.primary;
                })
            },
            states: {
                normal: { filter: { type: 'none', value: 0 } },
                hover : { filter: { type: 'lighten', value: 0.5 } },
                active: { filter: { type: 'none', value: 0 } }
            },
            stroke     : { width: 0 },
            plotOptions: {
                pie: {
                    fontSize     : '32px',
                    expandOnClick: false,
                    donut        : {
                        size  : '75%',
                        labels: {
                            show: true,
                            name: {
                                show      : true,
                                fontSize  : '22px',
                                fontFamily: 'Inter, Arial, sans-serif',
                                fontWeight: 700,
                                color     : palette.semantic.text.primary,
                                formatter() {
                                    return t('analytics:charts.total_unpaid.title');
                                }
                            },
                            total: {
                                show      : true,
                                fontSize  : '26px',
                                fontFamily: 'Inter, Arial, sans-serif',
                                fontWeight: 700,
                                color     : palette.semantic.text.primary,
                                formatter() {
                                    if (!totalUnpaidCurrency) {
                                        return '';
                                    }
                                    return totalUnpaidCurrency;
                                }
                            },
                            value: {
                                show      : true,
                                fontSize  : '26px',
                                fontFamily: 'Inter, Arial, sans-serif',
                                fontWeight: 700,
                                color     : palette.semantic.text.primary,
                                formatter() {
                                    if (!totalUnpaidCurrency) {
                                        return '';
                                    }
                                    return totalUnpaidCurrency;
                                }
                            }
                        }
                    }
                }
            },
            responsive: [
                {
                    breakpoint: breakpoints.values.xl,
                    options   : {
                        plotOptions: {
                            pie: {
                                donut: {
                                    labels: {
                                        name: {
                                            fontSize: '18px'
                                        },
                                        value: {
                                            fontSize: '18px'
                                        },
                                        total: {
                                            fontSize: '18px'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        }),
        [
            breakpoints,
            items,
            palette.mode,
            palette.semantic.text.primary,
            palette.utility.foreground,
            t,
            totalUnpaidCurrency
        ]
    );

    return (
        <>
            <TotalUnpaidChartComponents.ChartContainer>
                <Chart
                    options={optionsChart}
                    series={seriesChart}
                    type="donut"
                    width="100%"
                    style={{
                        flexGrow  : 1,
                        display   : 'flex',
                        alignItems: 'center'
                    }}
                />
            </TotalUnpaidChartComponents.ChartContainer>
            <TotalUnpaidChartComponents.ListContainer>
                <TotalUnpaidChartComponents.ListItem>
                    <TotalUnpaidChartComponents.HeaderLabel>
                        {t('analytics:charts.total_unpaid.status')}
                    </TotalUnpaidChartComponents.HeaderLabel>
                    <TotalUnpaidChartComponents.HeaderLabel>
                        {t('analytics:charts.total_unpaid.amount')}
                    </TotalUnpaidChartComponents.HeaderLabel>
                </TotalUnpaidChartComponents.ListItem>
                {items.map((item) => (
                    <TotalUnpaidChartListItem
                        item={item}
                        key={item.invoiceStatus}
                    />
                ))}
            </TotalUnpaidChartComponents.ListContainer>
        </>
    );
}
