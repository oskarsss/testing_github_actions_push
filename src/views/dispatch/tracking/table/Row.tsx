import React, { memo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import { useIsFirstOfPeriodOrdersRow } from '@/store/storage/orders/hooks/useIsFirstOfPeriodRow';
import { GetLoadsRequest_SortBy } from '@proto/loads';
import { OrdersTableCell, OrdersTableDaysLine, OrdersTableRow } from '@/@core/ui-kits/loads/table';
import { getMatchingKey } from '@/utils/get-matching-key';
import { LoadModel_Status } from '@proto/models/model_load';
import { TRACKING_LOADS_COLUMNS } from './columns';
import styles from './TrackingTable.module.scss';

type Props = {
    onClickRow: (idx: number) => void;
    isFocused: boolean;
    index: number;
    dynamicIndexesByFirstDate: Record<string, string[]>;
    sortBy: GetLoadsRequest_SortBy;
};

function Row({
    onClickRow,
    isFocused,
    index,
    dynamicIndexesByFirstDate,
    sortBy
}: Props) {
    const isSelected = useAppSelector((state) => state.tracking.selectedLoadIndex === index);
    const row = useAppSelector((state) => OrdersDataSelectors.getOrdersRowByIndex(state, index));
    const {
        countItems,
        firstStopAppointmentDate,
        isFirstOfPeriod
    } = useIsFirstOfPeriodOrdersRow(
        row,
        index,
        dynamicIndexesByFirstDate,
        sortBy
    );
    if (!row) return null;
    return (
        <>
            <OrdersTableDaysLine
                appointmentStartAt={firstStopAppointmentDate}
                isFirstOfPeriod={isFirstOfPeriod}
                type="tracking"
                countItems={countItems}
            />
            <OrdersTableRow
                onClick={() => onClickRow(index)}
                className={styles.row}
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
            >
                {TRACKING_LOADS_COLUMNS.map((column) => (
                    <OrdersTableCell key={column.field_name}>
                        {column.renderCell(row, isSelected)}
                    </OrdersTableCell>
                ))}
            </OrdersTableRow>
        </>
    );
}

export default memo(Row);
