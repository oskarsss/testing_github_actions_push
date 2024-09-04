import { AppPalette } from '@/@core/theme/palette';
import { useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React, { useMemo, useRef } from 'react';

// type Props = {}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const series = [
    { value: 44, label: 'Fuel', id: 'fuel', estimated: true },
    { value: 55, label: 'Tolls', id: 'tolls', estimated: true },
    { value: 13, label: 'Driver Pay', id: 'driver_pay', estimated: false },
    { value: 43, label: 'Lumper', id: 'lumper', estimated: false },
    { value: 22, label: 'Storage Fee', id: 'storage_fee', estimated: false },
    { value: 60, label: 'Other', id: 'other', estimated: false }
] as const;

export const ColorsConfig = (theme: AppPalette) =>
    ({
        fuel       : theme.colors.brand[600],
        tolls      : theme.colors.brand[400],
        driver_pay : theme.colors.brand[200],
        lumper     : theme.colors.brand[100],
        storage_fee: theme.colors.brand[50],
        other      : theme.semantic.foreground.six
    } as const);

export default function DonutChart() {
    const chartRef = useRef<{ retry:() => void }>();

    const theme = useTheme();

    const {
        palette: {
            semantic: { text }
        }
    } = theme;

    const COLORS = ColorsConfig(theme.palette);

    const fillColors = useMemo(
        () =>
            series.map((item) => {
                const color = COLORS[item.id];
                if (!color) return '#333555';
                return color;
            }),
        [COLORS]
    );

    const DataChart: { series: number[]; options: ApexOptions } = useMemo(
        () => ({
            series : series.map((i) => i.value),
            options: {
                chart: {
                    type     : 'donut',
                    width    : '100%',
                    height   : '100%',
                    sparkline: {
                        enabled: true
                    },
                    redrawOnParentResize: true,
                    redrawOnWindowResize: true

                    // events: {
                    //     dataPointSelection(e, chart, options) {
                    //         setTimeout(() => {
                    //             setSelected(items[options.dataPointIndex].value as LoadStatus);
                    //         }, 100);
                    //     },
                    //     dataPointMouseEnter(event, chart, options) {
                    //         const item = items[options.dataPointIndex];
                    //         if (!item.count) return;
                    //         if (item.value === 'drafts') return;
                    //         // eslint-disable-next-line no-param-reassign
                    //         event.target.style.cursor = 'pointer';
                    //     }
                    // }
                },
                legend: { show: false },

                // labels: items.map((i) => i.label),
                states: {
                    hover: {
                        filter: {
                            type: 'none'
                        }
                    },
                    active: {
                        filter: {
                            type: 'none'
                        }
                    }
                },

                tooltip: {
                    enabled: false

                    // fillSeriesColor: false,
                    // custom({ seriesIndex }) {
                    //     const item = items[seriesIndex];
                    //     const color = COLORS[item.value];
                    //     return tooltip(item, total, color || 'grey');
                    // }
                },

                fill       : { colors: fillColors },
                stroke     : { width: 0 },
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                        donut        : {
                            size  : '50%',
                            labels: {
                                show: false,
                                name: {
                                    show      : true,
                                    fontSize  : '16px',
                                    fontFamily: 'Inter, Arial, sans-serif',
                                    fontWeight: 400,
                                    color     : text.secondary

                                    // formatter() {
                                    //     return 'Total';
                                    // }
                                },
                                total: {
                                    show      : true,
                                    fontSize  : '16px',
                                    fontFamily: 'Inter, Arial, sans-serif',
                                    fontWeight: 400,
                                    color     : text.secondary

                                    // formatter() {
                                    //     return `${total}`;
                                    // }
                                },
                                value: {
                                    show      : true,
                                    fontSize  : '32px',
                                    fontFamily: 'Inter, Arial, sans-serif',
                                    fontWeight: 500,
                                    color     : text.primary

                                    // formatter() {
                                    //     return `${total}`;
                                    // }
                                }
                            }
                        }
                    }
                }
            }
        }),
        [fillColors, text.secondary, text.primary]
    );

    return (
        <Chart
            type="donut"
            ref={chartRef}
            height="100%"
            width="100%"
            options={DataChart.options}
            series={DataChart.series}
        />
    );
}
