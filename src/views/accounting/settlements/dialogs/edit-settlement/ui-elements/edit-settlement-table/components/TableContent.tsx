import SettlementsTypes from '@/store/accounting/settlements/types';
import { MouseEvent, useMemo } from 'react';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import MiniTableNoItems from '@/@core/ui-kits/basic/mini-table/components/MiniTableNoItems';
import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import EditSettlementCustomRow from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/components/custom-rows/EditSettlementCustomRow';
import TableRow from '@mui/material/TableRow';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TableBody from '@mui/material/TableBody';
import { Column, ColumnsConfig } from '../types';
import { TableWrapper } from '../EditSettlementTable.styled';
import AssignInfoRow from './custom-rows/AssignInfoRow';
import ManifestRow from './custom-rows/manifest-row/ManifestRow';
import { useEditSettlementContext } from '../../../EditSettlement';

type TableContentProps = {
    assigned_array: any[];
    unassigned_array?: any[];
    columnsConfig: ColumnsConfig;
    onClickCell: (event: MouseEvent<HTMLTableCellElement>, column: Column, row: unknown) => void;
    executeAction: any;
    isDisabledEdit: boolean;
    totalsAssign?: Record<string, string>;
};

export namespace TypeGuards {
    export type PossibleRow =
        | SettlementsTypes.CycleSettlementDetails.Manifests
        | SettlementsTypes.CycleSettlementDetails.FuelTransaction
        | SettlementsTypes.CycleSettlementDetails.Transaction
        | SettlementsTypes.CycleSettlementDetails.RecurringTransaction
        | SettlementsTypes.CycleSettlementDetails.TollsTransaction;

    // | SettlementsTypes.CycleSettlementDetails.Load; // TODO: DELETE THIS

    export function isManifests(
        row: TypeGuards.PossibleRow
    ): row is SettlementsTypes.CycleSettlementDetails.Manifests {
        return 'manifestId' in row;
    }

    // // TODO: DELETE THIS
    // export function isLoads(
    //     row: TypeGuards.PossibleRow
    // ): row is SettlementsTypes.CycleSettlementDetails.Load {
    //     return 'loadId' in row;
    // }

    export function isRecurringTransactions(
        row: PossibleRow
    ): row is SettlementsTypes.CycleSettlementDetails.RecurringTransaction {
        return 'recurringTransactionId' in row;
    }

    export function isFuelTransactions(
        row: PossibleRow
    ): row is SettlementsTypes.CycleSettlementDetails.FuelTransaction {
        return 'fuelTransactionId' in row;
    }

    export function isTransactions(
        row: PossibleRow
    ): row is SettlementsTypes.CycleSettlementDetails.Transaction {
        return 'transactionId' in row;
    }

    export function isTollsTransactions(
        row: PossibleRow
    ): row is SettlementsTypes.CycleSettlementDetails.TollsTransaction {
        return 'tollTransactionId' in row;
    }
}

function getRowKey(row: TypeGuards.PossibleRow) {
    if (TypeGuards.isFuelTransactions(row)) return 'fuelTransactionId';
    if (TypeGuards.isTransactions(row)) return 'transactionId';
    if (TypeGuards.isRecurringTransactions(row)) return 'recurringTransactionId';
    if (TypeGuards.isTollsTransactions(row)) return 'tollTransactionId';

    // if (TypeGuards.isLoads(row)) return 'loadId'; // TODO: DELETE THIS
    return 'manifestId';
}

type TableContentRowProps = {
    row: TypeGuards.PossibleRow;
    columns: Column[];
    onClickCell: any;
    executeAction: any;
    isDisabledEdit: boolean;
};

const TableContentRow = ({
    row,
    columns,
    onClickCell,
    executeAction,
    isDisabledEdit = false
}: TableContentRowProps) => {
    if (TypeGuards.isManifests(row)) {
        return (
            <ManifestRow
                isDisabledEdit={isDisabledEdit}
                executeAction={executeAction}
                row={row}
                columns={columns}
                onClickCell={onClickCell}
            />
        );
    }

    return (
        <EditSettlementCustomRow
            isDisabledEdit={isDisabledEdit}
            columns={columns}
            executeAction={executeAction}
            onClickCell={onClickCell}
            row={row}
        />
    );
};

// generate random id for table
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function TableContent({
    assigned_array,
    unassigned_array,
    columnsConfig,
    onClickCell,
    executeAction,
    isDisabledEdit,
    totalsAssign
}: TableContentProps) {
    const { t } = useAppTranslation();
    const {
        settlement,
        driver,
        truck,
        trailer
    } = useEditSettlementContext();

    const { columns } = columnsConfig;

    const [assign_info_config, unassigned_info_config] = useMemo(() => {
        const assign_info_config = columnsConfig.assigned_columns(
            settlement,
            truck,
            driver,
            trailer
        );
        const unassigned_info_config = columnsConfig.unassigned_columns(
            settlement,
            truck,
            driver,
            trailer
        );
        return [assign_info_config, unassigned_info_config];
    }, [columnsConfig, settlement]);

    return (
        <TableWrapper>
            <MiniTableStyled.Container sx={{ overflow: 'initial' }}>
                <MiniTableStyled.CommonTable
                    size="small"
                    width="100%"
                    sx={{
                        '& tr:last-child': {
                            borderLeft  : 'none',
                            borderRight : 'none',
                            borderBottom: 'none'
                        }
                    }}
                >
                    {columnsConfig.withAssignRow && (
                        <AssignInfoRow
                            columns={columns}
                            info_config={assign_info_config ?? {}}
                            isAssign
                            is_recurring_transaction={columnsConfig.is_recurring_transaction}
                        />
                    )}

                    <MiniTableStyled.HeaderRow>
                        <TableRow>
                            {columnsConfig.columns.map((column) => (
                                <MiniTableStyled.HeaderCell
                                    key={`${column.field}-${column.headerName}-${generateId()}`}
                                    size="small"
                                    padding="normal"
                                    min_width={column.minWidth}
                                    max_width={column.maxWidth}
                                    is_text_align_left={column.flex_start}
                                    sx={{ ...(column.padding_right && { paddingRight: '45px' }) }}
                                >
                                    {t(column.headerName)}
                                </MiniTableStyled.HeaderCell>
                            ))}
                        </TableRow>
                    </MiniTableStyled.HeaderRow>

                    <TableBody>
                        {!assigned_array.length ? (
                            <MiniTableNoItems colSpan={columns.length} />
                        ) : (
                            assigned_array.map((row) => (
                                <TableContentRow
                                    key={row[getRowKey(row)]}
                                    row={row}
                                    columns={columns}
                                    onClickCell={onClickCell}
                                    executeAction={executeAction}
                                    isDisabledEdit={isDisabledEdit}
                                />
                            ))
                        )}

                        <TotalsRow
                            columns={columns}
                            info_config={totalsAssign || assign_info_config || {}}
                        />
                    </TableBody>
                </MiniTableStyled.CommonTable>
            </MiniTableStyled.Container>

            {unassigned_array && unassigned_array?.length > 0 && (
                <MiniTableStyled.Container sx={{ overflow: 'initial' }}>
                    <MiniTableStyled.CommonTable
                        size="small"
                        width="100%"
                        sx={{
                            '& tr:last-child': {
                                borderLeft  : 'none',
                                borderRight : 'none',
                                borderBottom: 'none'
                            }
                        }}
                    >
                        <AssignInfoRow
                            info_config={unassigned_info_config ?? {}}
                            columns={columns}
                            isAssign={false}
                        />

                        <MiniTableStyled.HeaderRow>
                            <TableRow>
                                {columnsConfig.columns.map((column) => (
                                    <MiniTableStyled.HeaderCell
                                        key={`${column.field}-${column.headerName}-${generateId()}`}
                                        size="small"
                                        padding="normal"
                                        min_width={column.minWidth}
                                        max_width={column.maxWidth}
                                        is_text_align_left={column.flex_start}
                                        sx={{
                                            ...(column.padding_right && { paddingRight: '45px' })
                                        }}
                                    >
                                        {t(column.headerName)}
                                    </MiniTableStyled.HeaderCell>
                                ))}
                            </TableRow>
                        </MiniTableStyled.HeaderRow>

                        <TableBody>
                            {unassigned_array.map((row) => (
                                <TableContentRow
                                    key={row[getRowKey(row)]}
                                    row={row}
                                    columns={columns}
                                    onClickCell={onClickCell}
                                    executeAction={executeAction}
                                    isDisabledEdit={isDisabledEdit}
                                />
                            ))}

                            <TotalsRow
                                without_border
                                columns={columns}
                                info_config={unassigned_info_config ?? {}}
                            />
                        </TableBody>
                    </MiniTableStyled.CommonTable>
                </MiniTableStyled.Container>
            )}
        </TableWrapper>
    );
}
