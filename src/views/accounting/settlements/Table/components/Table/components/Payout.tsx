import { IconButton, Stack } from '@mui/material';
import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useCopyToClipboard from '@/utils/copy-to-clipboard';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { PAGE_ROW_HEIGHT_CONFIG } from '@/@core/components/table/TableEditor/components/TableView/components/PageRowHight/PageRowHeight';
import { useSettlementsSwitchFilters } from '@/store/accounting/settlements/hooks/settlements';
import { Settlements_Cycle_Period_Settlement_Trend_Entity } from '@proto/models/model_settlement';
import { RenderTrend } from './Trends/Trend';

type Props = {
    row: SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow;
    rowHeight: number;
};

export default function Payout({
    row,
    rowHeight
}: Props) {
    const showPercentageChange = useSettlementsSwitchFilters()?.percentage;
    const copy = useCopyToClipboard();
    const onClickCopy = () => copy(row.driverPayAmountFormatted);
    const isMediumRowHeight = rowHeight === PAGE_ROW_HEIGHT_CONFIG.medium;
    const isLargeRowHeight = rowHeight === PAGE_ROW_HEIGHT_CONFIG.large;
    const isSmallRowHeight = rowHeight === PAGE_ROW_HEIGHT_CONFIG.small;
    const trends =
        row.trends[
            Settlements_Cycle_Period_Settlement_Trend_Entity
                .SETTLEMENT_TREND_ENTITY_DRIVER_PAY_AMOUNT
        ];

    return (
        <Stack
            direction={isLargeRowHeight ? 'column' : 'row'}
            height="100%"
            width="100%"
            paddingX="15px"
            onClick={isSmallRowHeight ? onClickCopy : undefined}
        >
            <Stack
                direction="row"
                justifyContent={isLargeRowHeight ? ' space-between' : 'flex-start'}
                alignItems="center"
                flexGrow={1}
            >
                <div>{row.driverPayAmountFormatted}</div>
                {!isSmallRowHeight && (
                    <IconButton
                        size="small"
                        onClick={onClickCopy}
                        style={{
                            opacity: 0.4
                        }}
                    >
                        <ContentCopyIcon fontSize="small" />
                    </IconButton>
                )}
            </Stack>
            {showPercentageChange && (
                <Stack
                    direction="row"
                    paddingBottom={isLargeRowHeight ? '8px' : 0}
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    {RenderTrend(trends?.amountTrend, trends?.amountPercentage)}
                </Stack>
            )}
        </Stack>
    );
}
