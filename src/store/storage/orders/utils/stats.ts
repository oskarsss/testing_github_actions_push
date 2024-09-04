import { FilterModel_FilterID } from '@proto/models/model_filter_type';
import { LOAD_INVOICE_STATUS_GRPC_ENUM, LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import { LoadModel_InvoiceStatus, LoadModel_Status } from '@proto/models/model_load';
import { selectOrdersDataIndexes } from '../selectors';

export const makeStats = ({
    indexes,
    filteredIndexes
}: {
    indexes: ReturnType<typeof selectOrdersDataIndexes>;
    filteredIndexes: number[];
}) => [
    {
        amounts: {},
        counts : Object.keys(indexes.user).reduce((acc, key) => {
            acc[key] = filteredIndexes.filter((index) => indexes.user[key]?.includes(index)).length;
            return acc;
        }, {} as Record<string, number>),

        filterId: FilterModel_FilterID.FILTER_USER
    },
    {
        amounts: {},
        counts : Object.keys(indexes.driver).reduce((acc, key) => {
            acc[key] = filteredIndexes.filter((index) =>
                indexes.driver[key]?.includes(index)).length;
            return acc;
        }, {} as Record<string, number>),
        filterId: FilterModel_FilterID.FILTER_DRIVER
    },
    {
        amounts: {},
        counts : Object.keys(indexes.trailer).reduce((acc, key) => {
            acc[key] = filteredIndexes.filter((index) =>
                indexes.trailer[key]?.includes(index)).length;
            return acc;
        }, {} as Record<string, number>),
        filterId: FilterModel_FilterID.FILTER_TRAILER
    },
    {
        amounts: {},
        counts : Object.keys(indexes.truck).reduce((acc, key) => {
            acc[key] = filteredIndexes.filter((index) =>
                indexes.truck[key]?.includes(index)).length;
            return acc;
        }, {} as Record<string, number>),
        filterId: FilterModel_FilterID.FILTER_TRUCK
    },
    {
        amounts: {},
        counts : Object.keys(indexes.loadStatus).reduce((acc, key) => {
            acc[LOAD_STATUS_GRPC_ENUM[Number(key) as LoadModel_Status]] = filteredIndexes.filter(
                (index) => indexes.loadStatus[key]?.includes(index)
            ).length;
            return acc;
        }, {} as Record<string, number>),
        filterId: FilterModel_FilterID.FILTER_LOAD_STATUS
    },
    {
        amounts: {},
        counts : Object.keys(indexes.broker).reduce((acc, key) => {
            acc[key] = filteredIndexes.filter((index) =>
                indexes.broker[key]?.includes(index)).length;
            return acc;
        }, {} as Record<string, number>),
        filterId: FilterModel_FilterID.FILTER_BROKER
    },
    {
        amounts: {},
        counts : Object.keys(indexes.invoiceStatus).reduce((acc, key) => {
            acc[LOAD_INVOICE_STATUS_GRPC_ENUM[Number(key) as LoadModel_InvoiceStatus]] =
                filteredIndexes.filter((index) =>
                    indexes.invoiceStatus[key]?.includes(index)).length;
            return acc;
        }, {} as Record<string, number>),
        filterId: FilterModel_FilterID.FILTER_LOAD_INVOICE_STATUS
    }
];
