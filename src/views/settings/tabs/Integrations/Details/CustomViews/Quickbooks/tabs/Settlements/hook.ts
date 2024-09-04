/* eslint-disable max-len */
import { useMemo } from 'react';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { useStableArray } from '@/hooks/useStable';
import { SettlementTableProps } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Settlements/SettlementsTab';
import { useActiveRevenueTypes } from '@/store/accounting/settlements/hooks/revenue_type';
import { SettlementRevenueTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';
import { QuickBooksModel_Account_Type } from '@proto/models/model_quickbooks';
import { createMapQuickbooks } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/utils';
import SettlementTransactionCategoriesGrpcService from '@/@grpcServices/services/settlements-service/settlement-transaction-catogories.service';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';

export const get_accounts_quickbooks_default_query = {
    filterByType: QuickBooksModel_Account_Type.EXPENSE
};

export const useSettlementCategoriesQBItems = () => {
    const { revenue_types } = useActiveRevenueTypes();
    const stableArray = useStableArray();
    const {
        data: quickbooks_items,
        isLoading: loading_customers_quickbooks
    } =
        IntegrationQuickbooksGrpcService.useGetAccountsQuickbooksQuery(
            get_accounts_quickbooks_default_query
        );

    const {
        data: settlement_categories_system,
        isLoading
    } =
        SettlementTransactionCategoriesGrpcService.endpoints.getCategories.useQuery({});

    const data: SettlementTableProps = useMemo(() => {
        if (!settlement_categories_system?.settlementTransactionCategory?.length) {
            return {
                debit : stableArray,
                credit: stableArray
            } as SettlementTableProps;
        }

        const itemsQBMap = quickbooks_items?.accounts?.reduce((acc, item) => {
            item.systemRevenueTypes.forEach((revenue) => {
                acc[revenue.revenueTypeId] = {
                    ...acc[revenue.revenueTypeId],
                    ...(revenue.linkedToFuelAmount
                        ? {
                            linkedToFuelAmount: {
                                quickbooks_id  : item.quickbooksAccountId,
                                quickbooks_name: item.name
                            }
                        }
                        : {}),
                    ...(revenue.linkedToTollsAmount
                        ? {
                            linkedToTollsAmount: {
                                quickbooks_id  : item.quickbooksAccountId,
                                quickbooks_name: item.name
                            }
                        }
                        : {}),
                    ...(revenue.linkedToTotalLoadsAmount
                        ? {
                            linkedToTotalLoadsAmount: {
                                quickbooks_id  : item.quickbooksAccountId,
                                quickbooks_name: item.name
                            }
                        }
                        : {})
                };
            });
            return acc;
        }, {} as Record<string, Pick<SettlementRevenueTabData, 'linkedToTotalLoadsAmount' | 'linkedToFuelAmount' | 'linkedToTollsAmount'>>);

        const customerQBMap = createMapQuickbooks(
            quickbooks_items?.accounts,
            'systemSettlementTransactionCategoryIds'
        );

        const categories_debit = settlement_categories_system.settlementTransactionCategory.filter(
            (category) =>
                category.type === SettlementTransactionCategoryModel_Type.DEBIT && !category.deleted
        );
        const categories_credit = settlement_categories_system.settlementTransactionCategory.filter(
            (category) =>
                category.type === SettlementTransactionCategoryModel_Type.CREDIT &&
                !category.deleted
        );

        const revenue: SettlementRevenueTabData[] = revenue_types.map((revenue) => {
            const linked = itemsQBMap?.[revenue.revenueTypeId];
            return {
                ...revenue,
                linkedToTotalLoadsAmount: linked?.linkedToTotalLoadsAmount || null,
                linkedToFuelAmount      : linked?.linkedToFuelAmount || null,
                linkedToTollsAmount     : linked?.linkedToTollsAmount || null
            };
        });

        return {
            debit: categories_debit.map((category) => ({
                ...category,
                quickbooks_id:
                    customerQBMap[category.transactionCategoryId]?.quickbooksAccountId || '',
                quickbooks_name: customerQBMap[category.transactionCategoryId]?.name || ''
            })),
            credit: categories_credit.map((category) => ({
                ...category,
                quickbooks_id:
                    customerQBMap[category.transactionCategoryId]?.quickbooksAccountId || '',
                quickbooks_name: customerQBMap[category.transactionCategoryId]?.name || ''
            })),
            revenue
        };
    }, [quickbooks_items, settlement_categories_system, revenue_types]);

    const settlements_unnasigned = useMemo(() => {
        const debit_unnasigned = data.debit.filter((category) => !category.quickbooks_id).length;
        const credit_unnasigned = data.credit.filter((category) => !category.quickbooks_id).length;
        return debit_unnasigned + credit_unnasigned;
    }, [data.debit, data.credit, data.revenue]);

    return {
        data,
        settlements_unnasigned,
        loading: isLoading || loading_customers_quickbooks
    };
};
