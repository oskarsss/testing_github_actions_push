import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material/styles';
import {
    getActiveLoadsColors,
    hexToSemiTransparentHex,
    Item
} from '@/views/dispatch/orders/main/analytics/utils';
import tooltip from '@/views/dispatch/orders/main/analytics/active-loads-stats/tooltip';
import { useCallback, useMemo, useRef, useEffect, memo } from 'react';
import { LoadStatus } from '@/models/loads/load';
import { useLayoutSettings } from '@/hooks/useLayoutSettings';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import { default_loads_filters } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';

type Props = {
    items: Item[];
    total: number;
    filter_id: string;
    selected_filters: typeof default_loads_filters;
};

const ChartPie = ({
    items,
    total,
    filter_id,
    selected_filters
}: Props) => {
    const theme = useTheme();
    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

    const COLORS = useMemo(() => getActiveLoadsColors(theme), [theme]);

    const {
        palette: {
            semantic: { text }
        }
    } = theme;

    const { navCollapsed } = useLayoutSettings().settings;
    const chartRef = useRef<{ retry:() => void }>();

    const updateFilter = useUpdateFilters({ filter_id });

    const setSelected = useCallback(
        (type: string) => {
            if (type === 'drafts') return;

            const isSelected = selected_filters.load_status.includes(type as LoadStatus);
            const updatedStatuses = isSelected
                ? selected_filters.load_status.filter((item) => item !== type)
                : [...selected_filters.load_status, type as LoadStatus];

            updateFilter({ load_status: updatedStatuses });
        },
        [selected_filters.load_status, updateFilter]
    );

    useEffect(() => {
        if (chartRef.current) {
            setTimeout(() => {
                chartRef.current?.retry();
            }, 500);
        }
    }, [navCollapsed]);

    const fillColors = useMemo(
        () =>
            items.map((item) => {
                const color = COLORS[item.value as LoadStatus] || '#333555';
                const isHighlighted =
                    selected_filters.load_status.length === 0 ||
                    selected_filters.load_status.includes(item.value as LoadStatus);
                return isHighlighted ? color : hexToSemiTransparentHex(color, 0.2);
            }),
        [COLORS, items, selected_filters.load_status]
    );

    const chartOptions: ApexOptions = useMemo(
        () => ({
            chart: {
                type                : 'donut',
                width               : '100%',
                height              : '100%',
                sparkline           : { enabled: true },
                redrawOnParentResize: true,
                redrawOnWindowResize: true,
                events              : {
                    dataPointSelection(e, chart, options) {
                        setTimeout(() => {
                            setSelected(items[options.dataPointIndex].value as LoadStatus);
                        }, 100);
                    },
                    dataPointMouseEnter(event, chart, options) {
                        const item = items[options.dataPointIndex];
                        if (item.count && item.value !== 'drafts') {
                            event.target.style.cursor = 'pointer';
                        }
                    }
                }
            },
            legend: { show: false },
            labels: items.map((i) => i.label),
            states: {
                hover : { filter: { type: 'none' } },
                active: { filter: { type: 'none' } }
            },
            tooltip: {
                enabled        : true,
                fillSeriesColor: false,
                custom({ seriesIndex }) {
                    const item = items[seriesIndex];
                    const color = COLORS[item.value];
                    return tooltip(item, total, color || 'grey');
                }
            },
            fill       : { colors: fillColors },
            stroke     : { width: 0 },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut        : {
                        size  : '75%',
                        labels: {
                            show: true,
                            name: {
                                show      : true,
                                fontSize  : '16px',
                                fontFamily: 'Inter, Arial, sans-serif',
                                fontWeight: 400,
                                color     : text.secondary,
                                formatter : () => 'Total'
                            },
                            total: {
                                show      : true,
                                fontSize  : '16px',
                                fontFamily: 'Inter, Arial, sans-serif',
                                fontWeight: 400,
                                color     : text.secondary,
                                formatter : () => `${total}`
                            },
                            value: {
                                show      : true,
                                fontSize  : '32px',
                                fontFamily: 'Inter, Arial, sans-serif',
                                fontWeight: 500,
                                color     : text.primary,
                                formatter : () => `${total}`
                            }
                        }
                    }
                }
            }
        }),
        [items, fillColors, text.secondary, text.primary, setSelected, COLORS, total]
    );

    const series = useMemo(() => items.map((i) => i.count), [items]);

    return (
        <Chart
            id="loads-chart-pie"
            ref={chartRef}
            options={chartOptions}
            series={series}
            type="donut"
        />
    );
};

export default memo(ChartPie);
