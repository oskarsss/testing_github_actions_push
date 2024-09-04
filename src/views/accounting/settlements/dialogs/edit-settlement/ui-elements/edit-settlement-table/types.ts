import { MouseEvent, ReactNode } from 'react';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { IntlMessageKey } from '@/@types/next-intl';
import type { DriverModel_Driver } from '@proto/models/model_driver';

import { TruckModel_Truck } from '@proto/models/model_truck';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { SettlementRecurringTransactionModel_RecurringTransaction } from '@proto/models/model_settlement.recurring_transaction';

export interface PropsForAction<RowType extends object = any> {
    event: MouseEvent<HTMLElement>;
    id?: string;
    row: RowType;
    executeAction?: (name: string, row: RowType) => void;
    load?: { id: string };
    element_id?: EventTarget & HTMLTableCellElement;
}

export type Column<RowType extends object = any> = {
    field: string;
    headerName: IntlMessageKey;
    flex_start?: boolean;
    padding_right?: boolean;
    withEditButton: boolean;
    color?: 'secondary' | 'primary';
    minWidth: number;
    maxWidth?: number;
    colSpan?: number;
    hasMaxWidth?: boolean;
    cellStyles?: React.CSSProperties;
    onClick?: (
        row: RowType,
        props: {
            executeAction: (name: string, props: PropsForAction<RowType>) => void;
            event: MouseEvent<HTMLTableCellElement>;
        }
    ) => void;
    renderCell: (row: RowType) => ReactNode;
};

export type GetInfoColumns = (
    settlement: SettlementsTypes.CycleSettlementDetails.Settlement,
    truck: TruckModel_Truck | null,
    driver: DriverModel_Driver | null,
    trailer: TrailerModel_Trailer | null
) => Record<string, string>;

export type ColumnsConfig<RowType extends object = any> = {
    columns: Column<RowType>[];
    assigned_columns: GetInfoColumns;
    unassigned_columns: GetInfoColumns;
    withAssignRow?: boolean;
    is_recurring_transaction?: boolean;
    getItems: (
        settlement: SettlementsTypes.CycleSettlementDetails.Settlement,
        rt?: SettlementRecurringTransactionModel_RecurringTransaction[]
    ) => RowType[];
};
