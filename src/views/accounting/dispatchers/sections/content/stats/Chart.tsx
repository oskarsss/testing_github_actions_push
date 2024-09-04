import { memo } from 'react';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { formatCurrency, useColorsRange } from './utils';

export enum NumbersAfterDot {
    ZERO = 0,
    TWO = 2
}

export enum ChartType {
    GROSS = 'gross',
    RPM = 'rpm'
}

type Props = {
    data: {
        amounts: number;
        names: string | null;
    }[];
    type?: ChartType;
};

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function DonutChart({
    data,
    type
}: Props) {
    const { t } = useAppTranslation();
    const theme = useTheme();
    const amounts = data.map((number) => number.amounts);
    const names = data.map((name) => name.names);
    const totalAmount = amounts.reduce((acc, current) => acc + current, 0);
    const average = totalAmount / amounts.length;
    const formattedAverage = formatCurrency(
        average,
        type === ChartType.RPM ? NumbersAfterDot.TWO : NumbersAfterDot.ZERO
    );
    const colors = useColorsRange(amounts.length, type === ChartType.GROSS ? 'brand' : 'indigo');

    const chartOptions: ApexOptions = {
        chart: {
            type: 'donut'
        },
        labels: names.map((name) => `${name}`),
        legend: {
            show: false
        },
        tooltip: {
            enabled: false // This will disable the tooltip
        },
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
        dataLabels: {
            enabled: true,
            formatter(val: number, opts) {
                if (opts.w.config.series[opts.seriesIndex] === totalAmount) {
                    return formattedAverage;
                }
                return val;
            },
            style: {
                fontSize  : '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                colors    : ['transparent']
            }
        },
        fill: {
            colors
        },
        stroke: {
            width: 0
        },
        plotOptions: {
            pie: {
                donut: {
                    size  : '80%',
                    labels: {
                        show: true,
                        name: {
                            show      : true,
                            fontSize  : '22px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color     : theme.palette.semantic.text.secondary
                        },
                        value: {
                            show      : true,
                            fontSize  : '20px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color     : theme.palette.semantic.text.primary,
                            formatter(val) {
                                return `$${val}`;
                            }
                        },
                        total: {
                            show      : true,
                            showAlways: true,
                            label     : t('common:average'),
                            color     : theme.palette.semantic.text.primary,
                            formatter() {
                                return formattedAverage;
                            }
                        }
                    }
                }
            }
        }
    };

    return (
        <Box padding="12px 0">
            <Chart
                options={chartOptions}
                series={amounts}
                type="donut"
                width="260"
            />
        </Box>
    );
}

export default memo(DonutChart);
