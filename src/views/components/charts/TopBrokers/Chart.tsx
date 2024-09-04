import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material/styles';
import { memo } from 'react';

const COLORS_CHART = ['#2048B4', '#93D9F6', '#285FF6', '#58AEFE', '#CBEAFC'];
type dataChartType = {
    options: ApexOptions;
    series: ApexOptions['series'];
};
type Props = {
    categories: string[];
    series: { name: string; data: number[] }[];
};
const Chart = ({
    categories,
    series
}: Props) => {
    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
    const { palette } = useTheme();

    const dataChart: dataChartType = {
        series,
        options: {
            chart: {
                width  : '100%',
                type   : 'bar',
                stacked: true,
                toolbar: { show: false }
            },
            colors     : COLORS_CHART,
            dataLabels : { enabled: false },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight : '60%'
                }
            },
            grid: {
                borderColor: '#E7EEF6',
                xaxis      : {
                    lines: { show: true }
                },
                yaxis: {
                    lines: { show: false }
                }
            },
            xaxis: {
                categories
            },
            tooltip: { enabled: false },
            legend : {
                horizontalAlign: 'left',
                fontSize       : '12px',
                fontWeight     : 600,
                labels         : {
                    colors: palette.semantic.text.primary
                },
                markers: {
                    // width  : 16,
                    // height : 16,
                    // radius : 2,
                    offsetX: -4,
                    offsetY: 4
                },
                itemMargin: {
                    horizontal: 16,
                    vertical  : 6
                }
            },
            yaxis: {
                labels: {
                    show : true,
                    style: {
                        fontSize  : '14px',
                        fontWeight: 400,
                        colors    : palette.semantic.text.primary
                    }
                },
                axisBorder: { show: false }
            }
        }
    };

    return (
        <Chart
            options={dataChart.options}
            series={dataChart.series}
            height="100%"
            type="bar"
        />
    );
};

export default memo(Chart);
