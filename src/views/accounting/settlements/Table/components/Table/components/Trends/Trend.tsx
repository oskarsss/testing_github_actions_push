/* eslint-disable no-nested-ternary */
import { Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { PAGE_ROW_HEIGHT_CONFIG } from '@/@core/components/table/TableEditor/components/TableView/components/PageRowHight/PageRowHeight';
import { useSettlementsSwitchFilters } from '@/store/accounting/settlements/hooks/settlements';
import { Settlements_Cycle_Period_Settlement_Trend_AmountTrend } from '@proto/models/model_settlement';
import UnchangedTrend from './TrendItems/UnchangedTrend';
import DownTrend from './TrendItems/DownTrend';
import UpTrend from './TrendItems/UpTrend';

const {
    SETTLEMENT_TREND_AMOUNT_UP,
    SETTLEMENT_TREND_AMOUNT_DOWN
} =
    Settlements_Cycle_Period_Settlement_Trend_AmountTrend;

export function RenderTrend(
    amountTrend: Settlements_Cycle_Period_Settlement_Trend_AmountTrend,
    percentage: string
) {
    if (amountTrend === SETTLEMENT_TREND_AMOUNT_UP) {
        return UpTrend({ percentage });
    }
    if (amountTrend === SETTLEMENT_TREND_AMOUNT_DOWN) {
        return DownTrend({ percentage });
    }
    return UnchangedTrend({ percentage });
}

type Props = {
    amount: string;
    amountTrend: Settlements_Cycle_Period_Settlement_Trend_AmountTrend;
    percent: string;
    info?: string;
    onClickCell?: () => void;
    rowHeight: number;
};

function Trend({
    amount = '',
    amountTrend,
    percent,
    info = '',
    onClickCell = () => {},
    rowHeight
}: Props) {
    const showPercentageChange = useSettlementsSwitchFilters()?.percentage;

    return (
        <Stack
            direction={rowHeight === PAGE_ROW_HEIGHT_CONFIG.small ? 'row' : 'column'}
            flexGrow={1}
            justifyContent={
                rowHeight === PAGE_ROW_HEIGHT_CONFIG.small ? 'space-between' : 'flex-start'
            }
            onClick={onClickCell}
            height="100%"
            paddingX="15px"
        >
            <Stack
                flex="1 1 100%"
                direction="row"
                justifyContent={
                    rowHeight === PAGE_ROW_HEIGHT_CONFIG.small ? 'space-between' : 'flex-start'
                }
                alignItems={
                    rowHeight === PAGE_ROW_HEIGHT_CONFIG.small
                        ? showPercentageChange
                            ? 'center'
                            : 'center'
                        : showPercentageChange
                            ? 'flex-end'
                            : 'center'
                }
                spacing={1}
            >
                <Typography
                    fontSize="14px"
                    fontWeight={500}
                    variant="body2"
                >
                    {amount}
                </Typography>
                <Typography
                    fontSize="12px"
                    fontWeight={500}
                    lineHeight="18px"
                    color="GrayText"
                >
                    {info}
                </Typography>
            </Stack>
            {showPercentageChange && (
                <Stack
                    direction="row"
                    justifyContent={
                        rowHeight === PAGE_ROW_HEIGHT_CONFIG.small ? 'flex-end' : 'flex-start'
                    }
                    flex="1 1 100%"
                    {...(rowHeight === PAGE_ROW_HEIGHT_CONFIG.small
                        ? { alignItems: 'center' }
                        : {})}
                >
                    {RenderTrend(amountTrend, percent)}
                </Stack>
            )}
        </Stack>
    );
}

export default memo(Trend);
