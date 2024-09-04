/* eslint-disable @typescript-eslint/ban-types */
import { IntlMessageKey, TFunction } from '@/@types/next-intl';
import React from 'react';
import type { ColumnType } from '@/models/table/column-type';
import Documents from '@/store/documents/types';
import type { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';
import { DocumentEntitiesGetReply_DocumentEntities_TypesByEntityID } from '@proto/documents';
import { SettlementGetReply_Settlement_Amount } from '@proto/settlements';
import {
    PageModel_Page,
    PageModel_View,
    PageModel_Header,
    PageModel_View_Column
} from '@proto/models/model_page';
import { FieldGetReply_Field, FieldGetReply_Field_FieldValue } from '@proto/field';
import { SettlementRecurringTransactionModel_DriverDetails_DriverRecurringTransaction } from '@proto/models/model_settlement.recurring_transaction';
import { UpdateWidthCallback } from './ColumnWidthAdjust/ColumnWidthAdjustProvider';
import { TableName } from './NotFound';
import { CustomOrderConfigType } from './TableHeadCell';

namespace TableTypes {
    export interface Field extends Omit<FieldGetReply_Field, 'values'> {
        valuesByEntity: Record<string, FieldGetReply_Field_FieldValue>;
    }

    export interface ViewColumn extends PageModel_View_Column {
        field?: Field;
        page?: PageModel_Page;
        sortable?: boolean;
    }

    export type ViewColumns = ViewColumn[];

    export type executeAction<RowType = {}, WithEvent extends boolean = false> = (
        action: string,
        options: { row: RowType; [key: string]: any[] | object | RowType } & (WithEvent extends true
            ? { event: React.MouseEvent<HTMLElement> }
            : { event?: React.MouseEvent<unknown, MouseEvent> }) & { col?: ViewColumn } & {
                document_id?: string;
            }
    ) => void;

    export type onClickProps<RowType = {}> = {
        event: React.MouseEvent<unknown>;
        executeAction: executeAction<RowType>;
        col: ViewColumn;
        t?: TFunction;
        copy_value?: string;
    };

    export type renderCellProps<RowType = {}> = {
        executeAction: executeAction<RowType>;
        selected: boolean;
        t: TFunction;
        rowHeight: number;
    };

    /// ROW
    export type RowDocument =
        DocumentEntitiesGetReply_DocumentEntities_TypesByEntityID['byEntityId'][0]['documents'][0];

    // {
    //     entity_id: string;
    //     entity_type: string;
    //     style: 'valid' | 'invalid';
    //     expires_at: string;
    //     number: string;
    //     url: string;
    // };
    export type Row<RowType extends object = {}> = {
        unique_key: string;
        entities?: Record<string, string>;
        recurringTransactions?: {
            [key: string]: SettlementGetReply_Settlement_Amount;
        };
        transactions?: {
            [
                key: string
            ]: SettlementRecurringTransactionModel_DriverDetails_DriverRecurringTransaction & {
                note: string;
            };
        };
        entityId: string;
    } & RowType;

    export type Rows<RowType extends object = {}> = Row<RowType>[];

    // TOTAL
    type Total = object;

    // CELL - Final Rendered Cell
    export type Cell<RowType extends object = {}> = {
        width: number;
        sortable?: boolean;
        minWidth?: number;
        renderCell: (
            row: Row<RowType>,
            {
                executeAction,
                selected,
                t,
                rowHeight
            }: renderCellProps<RowType>
        ) => React.ReactNode;
        id?: string;
        onClick?: (row: Row<RowType>, { executeAction }: onClickProps<RowType>) => void;
        getClassName?: (row: Row<RowType>) => any;
        getCellStyle?: (
            row: Row<RowType>,
            {
                selected,
                theme
            }: {
                selected: boolean;
                theme: Theme;
            }
        ) => any;
        style?: React.CSSProperties;
        sticky?: boolean;
        sticky_right?: boolean;
    };

    export type Totals = Record<string, string>;

    export type cellStyleProps = {
        selected: boolean;
    };

    export type CustomColumns<RowType extends object = {}> = Partial<{
        [key in keyof RowType]: Cell<RowType>;
    }>;

    export type FixedCustomColumns<RowType extends object = {}> = Record<string, Cell<RowType>>;

    export type Header = PageModel_Header;

    export type Headers = Header[];

    export type PageTitle = keyof typeof PageModel_Page;

    export interface View extends Omit<PageModel_View, 'columns'> {
        columns: ViewColumns;
    }

    export type Views = View[];

    export type TableSize = {
        total: number;
        left_sticky: number;
        regular: number;
    };

    export type Order = 'asc' | 'desc';

    export type HeadlineCell = {
        column_id: string;
        header_id: string;
        sticky: boolean;
        width: number;
        name: string;
        color: string;
        border_left: boolean;
        border_right: boolean;
    };

    export type TableActions = {
        totalSelected: number;
        customActions: {
            tooltip: IntlMessageKey | string;
            action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
            icon: React.ReactNode;
            label: IntlMessageKey | string;
            disabled?: boolean;
        }[];
    };

    export type TableHeaderActions = {
        tableName: string;
        idsList: string[];
    };

    export interface TableProps<RowType extends object = {}, WithEvent extends boolean = false> {
        columns: Partial<{ [key in keyof RowType]: Cell<RowType> }>;
        headers: Headers | null;
        orderBy: string | string[];
        order: Order | Order[];
        updateFilters: (filters: object) => void;
        view: View | null | undefined;
        rows: Rows<RowType>;
        totals?: Totals;
        executeAction: executeAction<RowType, WithEvent>;
        isLoading: boolean;
        pageType?: PageTitle;

        page: number;
        per_page: number;
        rows_total: number;
        pagination: boolean;

        disabledYScroll?: boolean;
        sticky_background_enabled?: boolean;

        onUpdateWidth?: UpdateWidthCallback;
        customRowHeight?: React.CSSProperties['height'];
        setCustomRowStyle?: SxProps<Theme>;
        isFetching?: boolean;

        /**
         * if you want to use the table as a multi select table
         * you need to set this prop to true and set up
         * to custom columns - "multi_select_checkbox" column
         */
        setMultiSelect?: boolean;
        tableActionsConfig?: TableActions;
        defaultFilters?: object;

        filter_id: string;
        onCreateItem: () => void;
        tableName: TableName;
        tableHeaderActionsConfig?: TableHeaderActions;

        /**
         * If table data have nested objects, you can pass
         * customOrderConfig for sorting by nested object.
         * Always use for sorting custom columns that use nested objects.
         *
         * Example:
         * {
         *   columnId: 'driver',
         *   order: 'driver.name'
         * }
         *
         */
        customOrderConfig?: CustomOrderConfigType[];
    }

    export type PageColumn = {
        type: ColumnType;
        column_id: string;
        name: string;
        width: number;
        unique_key: string;
    };

    export type Page = {
        columns: PageColumn[];
        entities: string[];
        fields: Field[];
        headers: Header[];
        page: string;
        views: View[];
    };

    export namespace Editor {

        // export type DATA_TYPE = (typeof COLUMN_DATA_TYPES)[keyof typeof COLUMN_DATA_TYPES];

        export type DocumentType = Documents.DocumentType;

        export type ViewsColumn = Pick<
            TableTypes.ViewColumn,
            'borderRight' | 'columnId' | 'footerTotal' | 'headerId' | 'type' | 'width' | 'sticky'

            // | 'friendlyName'
            // | 'borderLeft'
            // | 'sequence'
        >;

        // export interface AvailableColumn extends ViewsColumn {
        //     isChecked: boolean;
        //     data_type: DATA_TYPE;
        //     entity_type: FieldEntityType;
        //     field_type: string;
        //     select_values: TableTypes.Field['select_values'];
        // }

        export type ChangeType =
            | 'size'
            | 'border_left'
            | 'border_right'
            | 'header'
            | 'drag'
            | 'add_column'
            | 'remove_column'
            | 'type'
            | 'footer_total'
            | 'select_all_columns'
            | 'deselect_all_columns';
    }
}

export default TableTypes;
