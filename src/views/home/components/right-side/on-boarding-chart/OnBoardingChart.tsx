/* eslint-disable no-nested-ternary */
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material/styles';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useGetOnBoardingSeries } from '@/store/home/hooks';
import RightSideComponents from '@/views/home/components/right-side/components/RightSideComponents';

export default function OnBoardingChart() {
    const { palette } = useTheme();
    const { t } = useAppTranslation('onboarding');
    const Chart = useMemo(() => dynamic(() => import('react-apexcharts'), { ssr: false }), []);
    const {
        series,
        isEmpty,
        isFull
    } = useGetOnBoardingSeries();

    const options: ApexOptions = useMemo(
        () => ({
            chart: {
                type     : 'radialBar',
                width    : '100%',
                offsetY  : -25,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    borderRadius: 10,
                    startAngle  : -90,
                    endAngle    : 90,
                    track       : {
                        background : palette.semantic.foreground.six,
                        strokeWidth: '100%'
                    },
                    states: {
                        normal: { filter: { type: 'none', value: 0 } },
                        hover : { filter: { type: 'none', value: 0 } },
                        active: { filter: { type: 'none', value: 0 } }
                    },
                    dataLabels: {
                        show: true,
                        name: {
                            show      : true,
                            fontSize  : '14px',
                            fontFamily: 'Inter, Arial, sans-serif',
                            fontWeight: 500,
                            color     : palette.semantic.text.secondary,
                            offsetY   : -36
                        },
                        value: {
                            show      : true,
                            fontSize  : '36px',
                            fontFamily: 'Inter, Arial, sans-serif',
                            fontWeight: 600,
                            color     : palette.semantic.text.primary,
                            offsetY   : -10
                        }
                    }
                }
            },
            stroke: {
                lineCap: 'round'
            },
            grid: {
                padding: {
                    top   : -10,
                    bottom: 30
                }
            },
            fill: {
                colors: [
                    isEmpty
                        ? palette.semantic.foreground.six
                        : isFull
                            ? palette.utility.foreground.success.primary
                            : palette.semantic.foreground.brand.primary
                ]
            },
            labels: [t('side.right.item.progress')]
        }),
        [
            palette.utility.foreground.success.primary,
            palette.semantic.foreground.brand.primary,
            palette.semantic.foreground.six,
            palette.semantic.text.primary,
            palette.semantic.text.secondary,
            isFull,
            isEmpty,
            t
        ]
    );

    return (
        <RightSideComponents.ChartContainer>
            <Chart
                options={options}
                series={series}
                type="radialBar"
                width="100%"
                height={330}
            />
        </RightSideComponents.ChartContainer>
    );
}
