import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { InfoBlock } from '@/views/components/charts/styledComponents';
import { Stack } from '@mui/material';
import TotalLoadsChartStatusListItem from '@/views/components/charts/TotalLoadsChart/TotalLoadsChartStatusListItem';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useTheme } from '@mui/material/styles';
import { LoadInvoiceStatus } from '@/models/loads/load';
import { openNewWindowWithQueryParams } from '@/utils/open-new-window';
import { FilterIdMap } from '@/@core/components/filters/types';
import { FilterModel_FilterID } from '@proto/models/model_filter_type';
import { ApexOptions } from 'apexcharts';
import { LOAD_INVOICE_STATUS_COLORS } from '@/@core/theme/entities/load/invoice_status';
import { useLayoutSettings } from '@/hooks/useLayoutSettings';
import dynamic from 'next/dynamic';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';
import { ChartTotalOrdersGetReply_Item } from '@proto/chart';
import { LOAD_INVOICE_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';

type Props = {
    items: ChartTotalOrdersGetReply_Item[];
    loadCount?: number;
};

function TotalLoadsChartContent({
    items,
    loadCount
}: Props) {
    const Chart = useMemo(() => dynamic(() => import('react-apexcharts'), { ssr: false }), []);

    const { t } = useAppTranslation();
    const chartRef = useRef<{ retry:() => void }>();
    const {
        semantic: { text },
        utility
    } = useTheme().palette;
    const { navCollapsed } = useLayoutSettings().settings;

    useEffect(() => {
        if (chartRef.current) {
            const timer = setTimeout(() => {
                chartRef.current?.retry();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [navCollapsed]);

    const onClickStatus = useCallback((invoice_status: LoadInvoiceStatus) => {
        openNewWindowWithQueryParams('billing', {
            [FilterIdMap[FilterModel_FilterID.FILTER_LOAD_INVOICE_STATUS]]: [invoice_status]
        });
    }, []);

    const DataChart: { series: ApexOptions['series']; options: ApexOptions } = {
        series : [{ data: items.map((item) => item.count) }],
        options: {
            grid: {
                show   : false,
                padding: {
                    left  : 0,
                    right : 0,
                    top   : 0,
                    bottom: 0
                }
            },
            chart: {
                height   : '100%',
                type     : 'bar',
                toolbar  : { show: false },
                sparkline: {
                    enabled: true
                },
                events: {
                    dataPointSelection(e, chart, options) {
                        const invoiceStatus = items[options.dataPointIndex]?.invoiceStatus;
                        if (!invoiceStatus) return;
                        onClickStatus(LOAD_INVOICE_STATUS_GRPC_ENUM[invoiceStatus]);
                    },
                    dataPointMouseEnter(event, chart, options) {
                        const item = items[options.dataPointIndex];
                        if (!item) return;

                        // eslint-disable-next-line no-param-reassign
                        event.target.style.cursor = 'pointer';
                    }
                }
            },
            colors: [
                function ({ dataPointIndex }: { dataPointIndex: number }) {
                    const status =
                        LOAD_INVOICE_STATUS_GRPC_ENUM[items[dataPointIndex]?.invoiceStatus];
                    return utility.foreground?.[LOAD_INVOICE_STATUS_COLORS[status]]?.primary;
                }
            ],
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                    dataLabels : {
                        position: 'top'
                    }
                }
            },
            dataLabels: {
                enabled: true,
                offsetY: -30,
                style  : {
                    fontSize: '20px',
                    colors  : [text.primary]
                }
            },
            tooltip: { enabled: false },
            legend : { show: false },
            xaxis  : {
                categories: items.map(() => ''),
                labels    : { show: false },
                axisTicks : { show: false, height: 0 },
                axisBorder: {
                    show   : false,
                    color  : '#FFFFFF',
                    offsetX: 0,
                    offsetY: 0
                }
            },
            yaxis: {
                show      : false,
                max       : loadCount ? loadCount * 1.3 : 0,
                labels    : { show: false },
                axisBorder: { show: false },
                axisTicks : { show: false }
            }
        }
    };

    return (
        <>
            <InfoBlock>
                <div>{t('analytics:charts.total_loads.info.title')}</div>
                <span>{loadCount || ''}</span>
            </InfoBlock>

            <Stack
                width="100%"
                overflow="auto"
                sx={(theme) => ({
                    ...getScrollBarStyles(theme)
                })}
            >
                <Stack
                    width="100%"
                    minWidth="fit-content"
                >
                    <Chart
                        options={DataChart.options}
                        series={DataChart.series}
                        type="bar"
                        height={146}
                        ref={chartRef}
                    />

                    <Stack
                        width="100%"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-around"
                        marginTop="12px"
                        gap="5px"
                    >
                        {items.map((item) => (
                            <TotalLoadsChartStatusListItem
                                key={item.invoiceStatus}
                                item={item}
                                itemsLength={items.length}
                                onClick={onClickStatus}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}

export default memo(TotalLoadsChartContent);
