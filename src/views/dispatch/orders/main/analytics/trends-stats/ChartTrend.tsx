import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import React, { memo } from 'react';
import { GetTrendsReply_Position } from '@proto/stats';
import { useTheme } from '@mui/material';

type DataChartType = {
    options: ApexOptions;
    series: ApexOptions['series'];
};

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type Props = {
    data: number[];
    position: GetTrendsReply_Position;
};

function ChartTrend({
    data,
    position
}: Props) {
    const { palette } = useTheme();
    const trend_up = position === GetTrendsReply_Position.UP;
    const empty = position === GetTrendsReply_Position.FLAT;
    const defaultColor = palette.semantic.foreground.brand.primary;
    const color = trend_up
        ? palette.utility.foreground.success.primary
        : palette.utility.foreground.error.primary;

    const dataChart: DataChartType = {
        series: [
            {
                name: 'trends',
                data
            }
        ],
        options: {
            chart: {
                parentHeightOffset: 0,
                toolbar           : { show: false },
                zoom              : { enabled: false }
            },
            tooltip   : { enabled: false },
            dataLabels: { enabled: false },
            stroke    : {
                width  : empty ? 2 : 1,
                curve  : 'smooth',
                lineCap: 'round'
            },
            grid: {
                show   : false,
                padding: {
                    left  : 2,
                    top   : -20,
                    right : 2,
                    bottom: empty ? 0 : -20
                }
            },
            fill: {
                type    : 'gradient',
                gradient: {
                    colorStops: [
                        [
                            {
                                offset : 0,
                                opacity: 0.3,
                                color  : empty ? defaultColor : color
                            },
                            {
                                offset : 100,
                                opacity: 0.1,
                                color  : trend_up
                                    ? palette.utility.foreground.success.secondary
                                    : palette.utility.foreground.error.secondary
                            }
                        ]
                    ]
                }
            },
            theme: {
                monochrome: {
                    enabled       : true,
                    shadeTo       : 'light',
                    shadeIntensity: 1,
                    color         : empty ? defaultColor : color
                }
            },
            xaxis: {
                type      : 'numeric',
                labels    : { show: false },
                axisTicks : { show: false },
                axisBorder: { show: false }
            },
            yaxis: { show: false }
        }
    };

    return (
        <Chart
            options={dataChart.options}
            series={dataChart.series}
            height={66}
            width={126}
            type="area"
        />
    );
}

export default memo(ChartTrend);
