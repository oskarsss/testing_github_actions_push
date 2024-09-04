/* eslint-disable max-len */

import { Table, useTheme } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useMemo, useState } from 'react';
import { getSorting, stableSort } from '@/utils/sorting';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { SettlementGetReply_Settlement } from '@proto/settlements';
import settlementsHistoryColumns, { SettlementHistoryColumn } from './columns';
import {
    Wrapper,
    Header
} from '../../ui-elements/edit-settlement-table/EditSettlementTable.styled';

export type SelectSettlementType = (
    settlement_id: string,
    period_id: string,
    cycle_id: string
) => void;

type Props = {
    other_settlements: SettlementGetReply_Settlement[];
    selected_settlement_id?: string;
    onSelectSettlement: SelectSettlementType;
};

export default function SettlementsHistory({
    other_settlements,
    selected_settlement_id = '',
    onSelectSettlement
}: Props) {
    const [orderBy, setOrderBy] =
        useState<SettlementHistoryColumn['field']>('settlementFriendlyId');
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const { palette } = useTheme();
    const { t } = useAppTranslation();

    const dataSorting = useMemo(
        () => stableSort(other_settlements, getSorting(order, orderBy)),
        [orderBy, order, other_settlements]
    );

    const onClickHeaderCell =
        (fieldName: SettlementHistoryColumn['field']) => (event: React.MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            setOrderBy(fieldName);
            setOrder((prev) => {
                if (fieldName !== orderBy) {
                    return 'desc';
                }
                return prev === 'asc' ? 'desc' : 'asc';
            });
        };

    return (
        <Wrapper elevation={0}>
            <MiniTableStyled.Container
                sx={{
                    border  : `1px solid ${palette.semantic.border.secondary}`,
                    overflow: 'auto'
                }}
            >
                <Table
                    sx={{ width: '100%' }}
                    size="small"
                    stickyHeader
                >
                    <Header>
                        <TableRow>
                            {settlementsHistoryColumns.map((column) => (
                                <MiniTableStyled.HeaderCell
                                    key={`${column.field}-${column.headerName}`}
                                    size="small"
                                    padding="normal"
                                    width={column.width}
                                    height={23}
                                    sx={{
                                        textAlign : column.flex_end ? 'end' : 'start',
                                        whiteSpace: 'nowrap'
                                    }}
                                    flex_start={!column?.flex_end}
                                    onClick={onClickHeaderCell(column.field)}
                                    onContextMenu={onClickHeaderCell(column.field)}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.field}
                                        direction={orderBy === column.field ? order : 'desc'}
                                        sx={{
                                            flexDirection: column.flex_end ? 'row-reverse' : 'row',
                                            width        : '100%',

                                            '.MuiTableSortLabel-icon': {
                                                fontSize: '14px'
                                            }
                                        }}
                                    >
                                        {t(column.headerName)}
                                    </TableSortLabel>
                                </MiniTableStyled.HeaderCell>
                            ))}
                        </TableRow>
                    </Header>
                    {dataSorting.map((row) => (
                        <MiniTableStyled.Row
                            key={row.settlementId}
                            hover
                            {...(selected_settlement_id === row.settlementId && {
                                style: {
                                    background: palette.semantic.actions.foreground.gray.primary,
                                    boxShadow : ' 0px 0px 0px 4px #2970FF !important'
                                }
                            })}
                        >
                            {settlementsHistoryColumns.map((column) => (
                                <MiniTableStyled.Cell
                                    key={column.field}
                                    padding="none"
                                    flex_start={!column?.flex_end}
                                    sx={{
                                        whiteSpace: 'nowrap'
                                    }}
                                    onClick={() =>
                                        onSelectSettlement(
                                            row.settlementId,
                                            row.periodId,
                                            row.cycleId
                                        )}
                                    onContextMenu={() =>
                                        onSelectSettlement(
                                            row.settlementId,
                                            row.periodId,
                                            row.cycleId
                                        )}
                                >
                                    {column.renderCell(row)}
                                </MiniTableStyled.Cell>
                            ))}
                        </MiniTableStyled.Row>
                    ))}
                </Table>
            </MiniTableStyled.Container>
        </Wrapper>
    );
}
