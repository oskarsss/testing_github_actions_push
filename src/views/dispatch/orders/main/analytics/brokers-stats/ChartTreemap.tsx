import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useTheme, Theme } from '@mui/material/styles';
import { memo, useMemo, useRef, useEffect } from 'react';
import { hexToSemiTransparentHex, Item } from '@/views/dispatch/orders/main/analytics/utils';
import tooltip from '@/views/dispatch/orders/main/analytics/brokers-stats/tooltip';
import { useLayoutSettings } from '@/hooks/useLayoutSettings';
import LoadsTypes from '@/store/dispatch/loads/types';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';
import { default_loads_filters } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';

type Props = {
    setSelected: (value: LoadsTypes.Loads.SearchOptions['broker'][0]) => void;
    items: Item[];
    total: number;
    is_selected_other: boolean;
    selected_filters: typeof default_loads_filters;
};

const getBrokersTreeColors = (theme: Theme) => [
    theme.palette.colors.brand[700],
    theme.palette.colors.brand[600],
    theme.palette.colors.brand[500],
    theme.palette.colors.brand[400],
    theme.palette.colors.brand[300],
    theme.palette.colors.brand[200]
];

const ChartTreemap = ({
    selected_filters,
    setSelected,
    items,
    total,
    is_selected_other
}: Props) => {
    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
    const theme = useTheme();
    const chartRef = useRef<{ retry:() => void }>(null);

    const { palette } = theme;
    const COLORS = useMemo(() => getBrokersTreeColors(theme), [theme]);
    const { navCollapsed } = useLayoutSettings().settings;

    const brokersState = BrokersGrpcService.useGetBrokersQuery({});
    const customerState = CustomersGrpcService.endpoints.getCustomers.useQuery({});
    const loadingClients = brokersState.isLoading || customerState.isLoading;

    useEffect(() => {
        if (chartRef.current) {
            setTimeout(() => chartRef.current?.retry(), 500);
        }
    }, [navCollapsed]);

    const colors = useMemo(
        () =>
            items.map((item, index) => {
                const isHighlighted =
                    selected_filters.broker.length === 0 ||
                    selected_filters.broker.includes(item.value);
                return isHighlighted || (item.value === 'other' && is_selected_other)
                    ? COLORS[index]
                    : hexToSemiTransparentHex(COLORS[index], 0.2);
            }),
        [items, COLORS, selected_filters.broker, is_selected_other]
    );

    const series = useMemo(
        () => [{ data: items.map((b) => ({ x: b.short_label, y: b.count })) }],
        [items]
    );

    const options: ApexOptions = useMemo(
        () => ({
            legend: { show: false },
            chart : {
                type                : 'treemap',
                toolbar             : { show: false },
                animations          : { enabled: false },
                redrawOnParentResize: true,
                redrawOnWindowResize: true,
                events              : {
                    dataPointSelection(_, __, options) {
                        const selectedBrokerId = items[options.dataPointIndex].value;
                        setSelected(selectedBrokerId);
                    }
                }
            },
            colors,
            stroke: {
                width : 2,
                colors: [palette.semantic.background.white as string]
            },
            states: {
                hover : { filter: { type: 'none' } },
                active: { filter: { type: 'none' } }
            },
            tooltip: {
                enabled        : !loadingClients,
                theme          : 'dark',
                fillSeriesColor: false,
                custom({ dataPointIndex }) {
                    const item = items[dataPointIndex];
                    const color = COLORS[dataPointIndex];
                    return tooltip(item, color, total);
                }
            },
            grid: {
                show   : false,
                padding: { left: 0, top: -20, right: -20, bottom: 0 }
            },
            plotOptions: {
                treemap: {
                    distributed : true,
                    enableShades: false
                }
            },
            dataLabels: {
                enabled: true,
                style  : { fontSize: '16px', fontWeight: 600 },
                formatter(text, { value }) {
                    return `${value} Orders\n${text}`;
                },
                offsetY: -4
            }
        }),
        [
            colors,
            palette.semantic.background.white,
            loadingClients,
            items,
            setSelected,
            COLORS,
            total
        ]
    );

    return (
        <Chart
            ref={chartRef}
            style={{ width: '100%', height: '100%', cursor: 'pointer' }}
            width="100%"
            height="70%"
            options={options}
            series={series}
            type="treemap"
        />
    );
};

export default memo(ChartTreemap);
