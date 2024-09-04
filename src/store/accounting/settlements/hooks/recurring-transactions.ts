/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { filterRows, getTotals } from '@/@core/components/filters/filter-button/hooks';
import { useCallback, useMemo } from 'react';
import {
    SwitchFilterFn,
    useAppliedFilters,
    useSelectedFilters
} from '@/@core/components/table/hooks/helpers';
import { pollingIntervalForTable } from '@/@core/components/table/configs';
import { $Filter } from '@/@core/components/filters/utils';
import { FILTER_SWITCH_KEY } from '@/@core/components/filters/constants';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import {
    useDriverTypesMap,
    useTrailersTypesMap,
    useSettlementTransactionCategoriesMap
} from '@/store/hash_maps/hooks';
import { useStableArray } from '@/hooks/useStable';
import SettlementTransactionCategoriesGrpcService from '@/@grpcServices/services/settlements-service/settlement-transaction-catogories.service';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';
import PagesGrpcService from '@/@grpcServices/services/pages.service';
import { RecurringTransactionPageRetrieveReply_Page } from '@proto/page';
import TableTypes from '@/@core/components/table/types';
import { PageModel_Header } from '@proto/models/model_page';
import { PAGE_ROW_HEIGHT_CONFIG } from '@/@core/components/table/TableEditor/components/TableView/components/PageRowHight/PageRowHeight';
import SettlementRecurringTransactionGrpcService from '@/@grpcServices/services/settlements-service/settlement-recurring-transactions.service';
import {
    SettlementRecurringTransactionModel_DriverDetails,
    SettlementRecurringTransactionModel_RecurringTransaction
} from '@proto/models/model_settlement.recurring_transaction';
import { PhpFilterTypeMap } from '@/@core/components/filters/types';
import { DRIVER_STATUS_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';
import { DriverStatuses } from '@/models/fleet/drivers/driver-status';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import SettlementsTypes from '../types';

// TODO: SERHII - DELETE THIS AFTER UPDATE COLUMNS BACKEND
export function getCategoryIdFromColumnId(columnId: string) {
    return columnId.replace(/(_amount|rt_)/g, '');
}

// TODO: SERHII - DELETE THIS AFTER UPDATE COLUMNS BACKEND
function createTransactionColumnId(categoryId: string) {
    return `rt_${categoryId}_amount`;
}

const default_recurring_transactions_filter =
    PAGES_FILTERS_CONFIG.ACCOUNTING.RECURRING_TRANSACTIONS.TRANSACTIONS.defaultFilters;

const transactionsFilterOrder = $Filter.order(default_recurring_transactions_filter)(
    'driver_status'
);

const default_drivers_filter =
    PAGES_FILTERS_CONFIG.ACCOUNTING.RECURRING_TRANSACTIONS.DRIVERS.defaultFilters;

const driverFilterOrder = $Filter.order(default_drivers_filter)('driver_status', 'driver_type');

type DefaultFiltersType = typeof default_drivers_filter;

const page = 'recurring_transactions';

const switchFilter: SwitchFilterFn<
    SettlementsTypes.RecurringTransactions.ConvertedDriverTransactionRow,
    DefaultFiltersType
> = (rows, selectedFilters) => {
    if (selectedFilters[FILTER_SWITCH_KEY].uninsured) {
        return rows.filter((row) => !row?.driverInsuranceEndorsed);
    }
    return rows;
};

type RecurringTransactionsConverterType = (
    row: SettlementRecurringTransactionModel_RecurringTransaction
) => SettlementsTypes.RecurringTransactions.ConvertedRecurringTransactionRow;

type DriverTransactionConverterType = (
    row: SettlementRecurringTransactionModel_DriverDetails
) => SettlementsTypes.RecurringTransactions.ConvertedDriverTransactionRow;

export const useConvertDriverTransaction = (transactionsNoteMap?: Record<string, string>) => {
    const trailersMap = useTrailersMap();
    const driversMap = useDriversMap();
    const driverTypesMap = useDriverTypesMap();
    const trucksMap = useTrucksMap();

    const converter: DriverTransactionConverterType = useCallback(
        (driverTransaction) => {
            const truck = trucksMap[driverTransaction.truckId];
            const driver = driversMap[driverTransaction.driverId];
            const trailer = trailersMap[truck?.trailerId || ''];
            const driverType = driverTypesMap[driver?.driverTypeId || ''];
            return {
                ...driverTransaction,
                unique_key                   : driverTransaction.driverId,
                entityId                     : driverTransaction.driverId,
                selfieThumbUrl               : driver?.selfieThumbUrl,
                fullName                     : driver ? `${driver.firstName} ${driver.lastName}` : '',
                firstName                    : driver?.firstName,
                lastName                     : driver?.lastName,
                driverInsuranceEndorsed      : driver?.insuranceEndorsed,
                driverTypeId                 : driver?.driverTypeId || '',
                driverType                   : driverType || null,
                truckReferenceId             : truck?.referenceId || '',
                truckType                    : truck?.type || null,
                trailerId                    : truck?.trailerId || '',
                trailerReferenceId           : trailer?.referenceId || '',
                trailerTypeId                : trailer?.trailerTypeId || '',
                type_id                      : driver?.driverTypeId || '',
                status                       : driver ? DRIVER_STATUS_GRPC_ENUM[driver.status] : DriverStatuses.TERMINATED,
                total_debit_amount           : driverTransaction.totalDebitAmount,
                total_debit_amount_formatted : driverTransaction.totalDebitAmountFormatted,
                total_credit_amount          : driverTransaction.totalCreditAmount,
                total_credit_amount_formatted: driverTransaction.totalCreditAmountFormatted,
                transactions                 : driverTransaction.transactions.reduce((acc, transaction) => {
                    acc[createTransactionColumnId(transaction.categoryId)] = {
                        ...transaction,
                        note: transactionsNoteMap?.[transaction.recurringTransactionId] || ''
                    };
                    return acc;
                }, {} as Record<string, (typeof driverTransaction.transactions)[0] & { note: string }>)
            };
        },
        [driversMap, trailersMap, trucksMap, driverTypesMap, transactionsNoteMap]
    );

    return { converter };
};

export const useConvertRecurringTransaction = () => {
    const trailersMap = useTrailersMap();
    const trailerTypesMap = useTrailersTypesMap();
    const driversMap = useDriversMap();
    const driverTypesMap = useDriverTypesMap();
    const trucksMap = useTrucksMap();
    const settlementTransactionCategoriesMap = useSettlementTransactionCategoriesMap();

    const converter: RecurringTransactionsConverterType = useCallback(
        (transaction) => {
            const driver = driversMap[transaction.entityId];
            const truck = trucksMap[transaction.truckId];
            const trailer = trailersMap[truck?.trailerId || ''];
            const driverType = driverTypesMap[driver?.driverTypeId || ''];
            const trailerType = trailerTypesMap[trailer?.trailerTypeId || ''];
            return {
                ...transaction,
                selfieThumbUrl    : driver?.selfieThumbUrl,
                fullName          : driver ? `${driver.firstName} ${driver.lastName}` : '',
                firstName         : driver?.firstName,
                lastName          : driver?.lastName,
                truckReferenceId  : truck?.referenceId || '',
                truckType         : truck?.type || null,
                trailerReferenceId: trailer?.referenceId || '',
                trailerTypeId     : trailer?.trailerTypeId || '',
                unique_key        : transaction.recurringTransactionId,
                driverType        : driverType || null,
                trailerType       : trailerType || null,
                driverStatus      : driver
                    ? DRIVER_STATUS_GRPC_ENUM[driver.status]
                    : DriverStatuses.TERMINATED,
                amount_formatted: transaction.amountFormatted,
                categoryName:
                    settlementTransactionCategoriesMap[transaction.categoryId]?.name || '',
                categoryType:
                    settlementTransactionCategoriesMap[transaction.categoryId]?.type ||
                    SettlementTransactionCategoryModel_Type.UNKNOWN
            };
        },
        [
            driversMap,
            trucksMap,
            trailersMap,
            driverTypesMap,
            trailerTypesMap,
            settlementTransactionCategoriesMap
        ]
    );

    return { converter };
};

const driversFilterIds = [PhpFilterTypeMap.DRIVER_STATUS, PhpFilterTypeMap.DRIVER_TYPE];
const driversFilterValues = ['status', 'driverTypeId'];

const useMemoizeDrivers = (
    drivers?: SettlementRecurringTransactionModel_DriverDetails[],
    driverPage?: RecurringTransactionPageRetrieveReply_Page,
    transactionsNoteMap?: Record<string, string>
) => {
    const { converter } = useConvertDriverTransaction(transactionsNoteMap);

    const {
        filter_id: drivers_filter_id,
        selected_filters: selected_drivers_filter
    } =
        useSelectedFilters(`${page}_drivers`, default_drivers_filter);

    const driverTransactionsList = useMemo(
        () => (drivers ? drivers.map(converter) : []),
        [drivers, converter]
    );

    const viewsAndHeaders = useMemo(() => {
        if (!driverPage) {
            return {
                drivers_view   : null,
                drivers_headers: [] as PageModel_Header[]
            };
        }

        return {
            drivers_headers: driverPage.headers,
            drivers_view   : {
                viewId   : 'drivers',
                name     : 'recurring_transactions:header.views.drivers',
                sequence : 1,
                rowHeight: PAGE_ROW_HEIGHT_CONFIG.small,
                columns  : driverPage.columns
            } as TableTypes.View
        };
    }, [driverPage]);

    const dataFilters = $Filter.getFiltersData(driversFilterIds, driversFilterValues);
    const counts = $Filter.calculateCounts(driverTransactionsList, dataFilters);
    const drivers_filters = useAppliedFilters(driverFilterOrder, counts);

    const hasData = !!drivers;

    const rowsData = useMemo(() => {
        const drivers_rows = hasData
            ? filterRows(driverTransactionsList, selected_drivers_filter)
            : { rows: [], total: 0 };

        return {
            drivers_rows      : switchFilter(drivers_rows.rows, selected_drivers_filter),
            drivers_rows_total: drivers_rows.total
        };
    }, [hasData, selected_drivers_filter, driverTransactionsList]);

    const drivers_totals: object | null = useMemo(() => {
        if (!hasData || !viewsAndHeaders.drivers_view) return null;

        const rows = rowsData.drivers_rows.map(
            ({
                totalDebitAmount,
                totalCreditAmount,
                transactions
            }) => {
                const transactionAmounts = Object.fromEntries(
                    Object.entries(transactions).map(([key, { amount }]) => [key, amount])
                );

                return {
                    total_debit_amount : totalDebitAmount,
                    total_credit_amount: totalCreditAmount,
                    ...transactionAmounts
                };
            }
        );

        return getTotals(rows, viewsAndHeaders.drivers_view.columns);
    }, [hasData, viewsAndHeaders.drivers_view, rowsData.drivers_rows]);

    return {
        ...viewsAndHeaders,
        ...rowsData,
        drivers_filters,
        drivers_totals,
        drivers_filter_id,
        selected_drivers_filter,
        default_drivers_filter,
        default_recurring_transactions_filter
    };
};

const transactionsFilterIds = [PhpFilterTypeMap.DRIVER_STATUS];
const transactionsFilterValues = ['driverStatus'];

const compareTransactions = $Filter.compareMap({
    driver_status: (
        target: SettlementsTypes.RecurringTransactions.ConvertedRecurringTransactionRow,
        filter: string[]
    ) => !filter.length || filter.includes(target.driverStatus)
});

const useMemoizeTransactions = (
    recurringTransactions?: SettlementRecurringTransactionModel_RecurringTransaction[],
    recurringTransactionPage?: RecurringTransactionPageRetrieveReply_Page
) => {
    const hasData = !!recurringTransactions;
    const { converter } = useConvertRecurringTransaction();

    const {
        filter_id: transaction_filter_id,
        selected_filters: selected_transaction_filter
    } =
        useSelectedFilters(`${page}_list`, default_recurring_transactions_filter);

    const recurringTransactionsList = useMemo(
        () => (recurringTransactions ? recurringTransactions.map(converter) : []),
        [recurringTransactions, converter]
    );

    const viewsAndHeaders = useMemo(() => {
        if (!recurringTransactionPage) {
            return {
                recurring_transactions_view   : null,
                drivers_view                  : null,
                recurring_transactions_headers: [] as PageModel_Header[],
                drivers_headers               : [] as PageModel_Header[]
            };
        }

        return {
            recurring_transactions_view: {
                viewId   : 'transactions',
                name     : 'recurring_transactions:header.views.transactions',
                sequence : 0,
                rowHeight: PAGE_ROW_HEIGHT_CONFIG.small,
                columns  : recurringTransactionPage.columns
            } as TableTypes.View,
            recurring_transactions_headers: recurringTransactionPage.headers
        };
    }, [recurringTransactionPage]);

    const dataFilters = $Filter.getFiltersData(transactionsFilterIds, transactionsFilterValues);
    const counts = $Filter.calculateCounts(recurringTransactionsList, dataFilters);
    const recurring_transactions_filters = useAppliedFilters(transactionsFilterOrder, counts);

    const rowsData = useMemo(() => {
        const recurring_transactions_rows = hasData
            ? filterRows(
                recurringTransactionsList,
                selected_transaction_filter,
                undefined,
                compareTransactions
            )
            : { rows: [], total: 0 };

        return {
            recurring_transactions_rows      : recurring_transactions_rows.rows,
            recurring_transactions_rows_total: recurring_transactions_rows.total
        };
    }, [hasData, selected_transaction_filter, recurringTransactionsList]);

    const rt_totals: object | null = useMemo(
        () =>
            hasData && viewsAndHeaders.recurring_transactions_view
                ? getTotals(
                    recurringTransactionsList,
                    viewsAndHeaders.recurring_transactions_view.columns
                )
                : null,
        [hasData, viewsAndHeaders.recurring_transactions_view, recurringTransactionsList]
    );

    return {
        ...viewsAndHeaders,
        ...rowsData,
        recurring_transactions_filters,
        rt_totals,
        transaction_filter_id,
        selected_transaction_filter,
        default_drivers_filter,
        default_recurring_transactions_filter
    };
};

export function useRecurringTransactions(isPollingInterval = true) {
    const {
        data,
        isError,
        isLoading
    } =
        SettlementRecurringTransactionGrpcService.useGetRecurringTransactionsQuery(
            {},
            {
                selectFromResult: ({
                    data,
                    isLoading,
                    isError
                }) => ({
                    isLoading,
                    isError,
                    data
                }),
                pollingInterval: isPollingInterval ? pollingIntervalForTable : undefined
            }
        );

    const pageState = PagesGrpcService.useRetrieveRecurringTransactionPageQuery({});

    const memoizedDTransactions = useMemoizeTransactions(
        data?.recurringTransactions,
        pageState.data?.recurringTransactionPage
    );

    const transactionsNoteMap = useMemo(() => {
        if (!data?.recurringTransactions) return {};
        return data.recurringTransactions.reduce((acc, {
            recurringTransactionId,
            note
        }) => {
            acc[recurringTransactionId] = note;
            return acc;
        }, {} as Record<string, string>);
    }, [data?.recurringTransactions]);

    const memoizedDrivers = useMemoizeDrivers(
        data?.drivers,
        pageState.data?.driverPage,
        transactionsNoteMap
    );

    return {
        isError,
        isLoading: pageState.isLoading || isLoading,
        ...memoizedDTransactions,
        ...memoizedDrivers
    };
}

export const useAllCategories = () => {
    const {
        data,
        isError,
        isLoading
    } =
        SettlementTransactionCategoriesGrpcService.endpoints.getCategories.useQueryState({});

    const categories = useStableArray(data?.settlementTransactionCategory);

    return {
        categories,
        isError,
        isLoading
    };
};

export const useActiveSettlementTransactionCategory = () => {
    const {
        data,
        isError,
        isLoading
    } =
        SettlementTransactionCategoriesGrpcService.endpoints.getCategories.useQueryState({});

    const categories = useMemo(() => {
        if (!data?.settlementTransactionCategory) return [];
        return data.settlementTransactionCategory.filter((category) => !category.deleted);
    }, [data]);

    return {
        categories,
        isError,
        isLoading
    };
};

export function useCategories(type: SettlementTransactionCategoryModel_Type) {
    const {
        categories,
        isError,
        isLoading
    } =
        SettlementTransactionCategoriesGrpcService.endpoints.getCategories.useQuery(
            {},
            {
                selectFromResult: ({
                    data,
                    isLoading,
                    isError
                }) => ({
                    isLoading,
                    isError,
                    categories: data
                        ? data.settlementTransactionCategory.filter(
                            (category) => category.type === type
                        )
                        : []
                })
            }
        );

    return {
        categories,
        isError,
        isLoading
    };
}

export function useGetCountTotalsRecurring() {
    const { t } = useAppTranslation('common');

    const formatFunction = new Intl.NumberFormat('en-US', {
        style   : 'currency',
        currency: 'USD'
    }).format;

    return useCallback(
        (transactions: { amount: number; chargedAmount: number }[]) => {
            const totals = transactions.reduce(
                (acc, transaction) => {
                    acc.amount += transaction.amount || 0;
                    acc.charged += transaction.chargedAmount || 0;
                    return acc;
                },
                { amount: 0, charged: 0 }
            );

            const totalCharged = `${capitalizeFirstLetter(t('charged'))} ${formatFunction(
                totals.charged
            )}`;
            const totalAmount = `${t('amount')} ${formatFunction(totals.amount)}`;

            return {
                amount: `${totalCharged}, ${totalAmount}`
            };
        },
        [t, formatFunction]
    );
}
