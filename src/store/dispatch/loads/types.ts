import { LoadInvoiceStatus, LoadStatus } from '@/models/loads/load';
import React, { CSSProperties } from 'react';
import TableTypes from '@/@core/components/table/types';
import { LoadData_Load } from '@proto/loads';
import { LoadDriverPayItemCategoriesGetReply_LoadDriverPayItemCategory } from '@proto/load_driver_pay_item_categories';
import { LoadInvoiceItemCategoriesGetReply_LoadInvoiceItemCategory } from '@proto/load_invoice_item_categories';
import { LoadTypesGetReply_LoadType } from '@proto/load_types';
import { IntlMessageKey } from '@/@types/next-intl';
import { LocationModel } from '@proto/models/model_location';
import { LoadInvoiceItemGetForLoadReply_InvoiceItem } from '@proto/load_invoice_items';
import { LoadInvoicePaymentItemGetForLoadReply_InvoicePaymentItem } from '@proto/load_invoice_payment_items';
import { ManifestModel_Stop } from '@proto/models/model_manifest';

namespace LoadsTypes {
    export namespace Loads {
        export type SearchOptions = {
            page: number;
            per_page: number;
            search: string;
            load_status: LoadStatus[];
            load_invoice_status: LoadInvoiceStatus[];
            broker: string[];
            user: string[];
            driver: string[];
            start_at: string;
            end_at: string;
            id: string;
            orderBy: string;
            order: TableTypes.Order;
            late_pickups: boolean;
            late_dropoffs: boolean;
            gps_inactive: boolean;
            truck: string[];
            sortBy: number;
        };

        export type LoadSearchOption = {
            id: string;
            label: string;
        };
    }
    export namespace Load {
        export type Load = LoadData_Load;
    }

    export type StopLocation = LocationModel;

    export type Stop = ManifestModel_Stop;

    export type InvoicePaymentItem = LoadInvoicePaymentItemGetForLoadReply_InvoicePaymentItem;

    export interface InvoiceItem extends LoadInvoiceItemGetForLoadReply_InvoiceItem {
        categoryName: string;
        includeInGrossAmount: boolean;
    }

    export type InvoiceItemCategory = LoadInvoiceItemCategoriesGetReply_LoadInvoiceItemCategory;

    export type DriverPayItemCategory =
        LoadDriverPayItemCategoriesGetReply_LoadDriverPayItemCategory;

    export type LoadType = LoadTypesGetReply_LoadType;

    export namespace Table {
        export type onClickType<Row> = (
            type: string,
            row: Row | LoadsTypes.Load.Load,
            event: React.SyntheticEvent
        ) => void;

        export interface ColumnLoad<RowType> {
            header_name: IntlMessageKey;
            width: React.CSSProperties['width'];
            minWidth?: React.CSSProperties['minWidth'];
            field_name?: string;
            style?: CSSProperties;
            headerStyle?: CSSProperties;
            flex_start?: boolean;
            isAmount?: boolean;
            align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
            sortable?: boolean;
            renderCell: (row: RowType, handleClick?: onClickType<RowType>) => React.ReactNode;
        }

        export interface sortStateType<Row extends object = object> {
            order: 'asc' | 'desc';
            orderBy: keyof Row;
        }

        export interface Props<Row extends object = object> {
            columns: ColumnLoad<Row>[];
            data: Row[];
            onClick?: onClickType<Row>;
            children?: JSX.Element | null | undefined;
            editRow?: (row: Row, event: React.MouseEvent) => void;
        }
    }
}

export default LoadsTypes;
