import React, { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoadsActions } from '@/store/dispatch/loads/slice';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import { useIsFirstOfPeriodOrdersRow } from '@/store/storage/orders/hooks/useIsFirstOfPeriodRow';
import { GetLoadsRequest_SortBy } from '@proto/loads';
import { LoadModel_Status } from '@proto/models/model_load';
import { OrdersTableCell, OrdersTableDaysLine, OrdersTableRow } from '@/@core/ui-kits/loads/table';
import { getMatchingKey } from '@/utils/get-matching-key';
import loadsTableColumns from './columns/columns';
import styles from './OrdersTable.module.scss';

type Props = {
    index: number;
    isFocused: boolean;
    setFocusedRowId: (index: number) => void;
    dynamicRowsIndexesByDay: Record<string, string[]>;
    sortBy: GetLoadsRequest_SortBy;
};

function LoadsTableBodyRow({
    index,
    isFocused,
    setFocusedRowId,
    dynamicRowsIndexesByDay,
    sortBy
}: Props) {
    const isSelected = useAppSelector((state) => state.loads.selectedOrderIndex === index);
    const row = useAppSelector((state) => OrdersDataSelectors.getOrdersRowByIndex(state, index));
    const dispatch = useAppDispatch();

    const {
        isFirstOfPeriod,
        firstStopAppointmentDate,
        countItems
    } = useIsFirstOfPeriodOrdersRow(
        row,
        index,
        dynamicRowsIndexesByDay,
        sortBy
    );

    const onClick = useCallback(() => {
        if (isSelected) return;
        dispatch(LoadsActions.SelectLoadIndex(index));
        setFocusedRowId(index);
    }, [dispatch, index, isSelected, setFocusedRowId]);

    return (
        <>
            <OrdersTableDaysLine
                appointmentStartAt={firstStopAppointmentDate}
                isFirstOfPeriod={isFirstOfPeriod}
                type="loads"
                countItems={countItems}
            />
            <OrdersTableRow
                className={styles.rowGridTemplate}
                color={getMatchingKey({
                    error   : row?.status === LoadModel_Status.canceled,
                    yellow  : row?.status === LoadModel_Status.pending,
                    success : row?.status === LoadModel_Status.delivered,
                    blueDark: row?.status === LoadModel_Status.in_progress,
                    gray    : row?.status === LoadModel_Status.deleted,
                    pink    : row?.status === LoadModel_Status.tonu,
                    warning : row?.status === LoadModel_Status.assigned
                })}
                focused={isFocused}
                selected={isSelected}
                onClick={onClick}
            >
                {loadsTableColumns.map((column) => (
                    <OrdersTableCell key={column.field_name}>
                        {column.renderCell(row, isSelected)}
                    </OrdersTableCell>
                ))}
            </OrdersTableRow>
        </>
    );
}

export default memo(LoadsTableBodyRow);
