import { IntegrationProvider } from '@proto/integrations';
import EditSettlement from '@/views/accounting/settlements/dialogs/edit-settlement/styled';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { Stack, Divider } from '@mui/material';
import ProviderLogo from '@/views/settings/tabs/Integrations/components/ProviderLogo';
import QuickbooksBillCreateBtn from '@/views/accounting/settlements/dialogs/edit-settlement/components/quickbooks-bill/components/bill-buttons/QuickbooksBillCreateBtn';
import QuickbooksBillDeleteBtn from '@/views/accounting/settlements/dialogs/edit-settlement/components/quickbooks-bill/components/bill-buttons/QuickbooksBillDeleteBtn';
import QuickbooksBillAmountRow from '@/views/accounting/settlements/dialogs/edit-settlement/components/quickbooks-bill/components/bill-content/QuickbooksBillAmountRow';
import QuickbooksBillDueDateRow from '@/views/accounting/settlements/dialogs/edit-settlement/components/quickbooks-bill/components/bill-content/QuickbooksBillDueDateRow';
import { useMemo } from 'react';
import { createMapQuickbooks } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/utils';
import { useStableArray } from '@/hooks/useStable';
import { useSettlementCategoriesQBItems } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Settlements/hook';
import {
    SETTLEMENT_BILL_ERROR_CODES,
    generateError
} from '@/views/accounting/settlements/dialogs/edit-settlement/components/quickbooks-bill/components/bill-no-configure/settlementBillErrorConfig';
import QuickbooksBillNotConfigure from '@/views/accounting/settlements/dialogs/edit-settlement/components/quickbooks-bill/components/bill-no-configure/QuickbooksBillNotConfigure';
import createMap from '@/utils/create-map';
import {
    Settlements_Cycle_Period_Settlement_Status,
    Settlements_Cycle_Period_Settlement_Transaction_Type
} from '@proto/models/model_settlement';
import withIntegrationProvider from '@/views/settings/tabs/Integrations/components/withIntegrationProvider';
import QuickbooksBillDocNumberRow from '@/views/accounting/settlements/dialogs/edit-settlement/components/quickbooks-bill/components/bill-content/QuickbooksBillDocNumberRow';
import QuickbooksBillSyncBtn from '@/views/accounting/settlements/dialogs/edit-settlement/components/quickbooks-bill/components/bill-buttons/QuickbooksBillSyncBtn';

const {
    TRANSACTION_TYPE_CREDIT,
    TRANSACTION_TYPE_DEBIT
} =
    Settlements_Cycle_Period_Settlement_Transaction_Type;

const {
    SETTLEMENT_STATUS_OPEN,
    SETTLEMENT_STATUS_IN_REVIEW
} =
    Settlements_Cycle_Period_Settlement_Status;

const QuickbooksBill = withIntegrationProvider(QuickbooksBillContentComponent, 'QUICKBOOKS');

type Props = {
    provider: IntegrationProvider;
};

function QuickbooksBillContentComponent({ provider }: Props) {
    const {
        settlement,
        driver,
        quickBooksBill
    } = useEditSettlementContext();

    const vendorsQBResult = IntegrationQuickbooksGrpcService.useGetVendorsQuickbooksQuery({});
    const vendorsQB = useStableArray(vendorsQBResult.data?.vendors);
    const settlementData = useSettlementCategoriesQBItems();

    const validation = useMemo(() => {
        if (settlementData.loading || vendorsQBResult.isLoading) {
            return generateError('VALID');
        }

        if ([SETTLEMENT_STATUS_OPEN, SETTLEMENT_STATUS_IN_REVIEW].includes(settlement.status)) {
            return generateError('SETTLEMENT_STATUS');
        }

        if (settlement.vendorId) {
            const vendorsQBMap = createMapQuickbooks(vendorsQB, 'systemVendorId');
            const quickbooksVendor = vendorsQBMap[settlement.vendorId];

            if (vendorsQB.length && !quickbooksVendor?.quickbooksVendorId) {
                return generateError('VENDOR_NOT_CONNECTED', settlement.vendorId);
            }
        } else {
            const driversQBMap = createMapQuickbooks(vendorsQB, 'systemDriverId');
            const quickbooksVendor = driversQBMap[settlement.driverId];

            if (vendorsQB.length && !quickbooksVendor?.quickbooksVendorId) {
                return generateError('DRIVER_NOT_CONNECTED', settlement.driverId);
            }
        }

        if (driver) {
            if (!driver.settlementRevenueTypeId) {
                return generateError('DRIVER_HAS_NOT_REVENUE_TYPE', driver.driverId);
            }

            const driverRevenueType = settlementData.data.revenue.find(
                (r) => r.revenueTypeId === driver.settlementRevenueTypeId
            );

            if (!driverRevenueType) {
                return generateError('DRIVER_NOT_CORRECT_REVENUE_TYPE', driver.driverId);
            }

            if (
                settlementData.data.revenue?.length &&
                !driverRevenueType?.linkedToFuelAmount?.quickbooks_id
            ) {
                return generateError('REVENUE_TYPE_NOT_CONNECTED', driver.settlementRevenueTypeId);
            }
        }

        if (settlement.transactionsInfo?.transactions) {
            const debitQBMap = createMap(settlementData.data.debit, 'transactionCategoryId');
            const creditQBMap = createMap(settlementData.data.credit, 'transactionCategoryId');
            const transactions = settlement.transactionsInfo.transactions.filter(
                (t) => t.settlementId
            );

            const categoryNotConnected = transactions.find((t) => {
                if (t.type === TRANSACTION_TYPE_DEBIT && debitQBMap[t.categoryId]) {
                    return !debitQBMap[t.categoryId]?.quickbooks_id;
                }
                if (t.type === TRANSACTION_TYPE_CREDIT && creditQBMap[t.categoryId]) {
                    return !creditQBMap[t.categoryId]?.quickbooks_id;
                }
                return false;
            });

            if (categoryNotConnected) {
                return generateError(
                    'SETTLEMENT_CATEGORY_NOT_CONNECTED',
                    categoryNotConnected.categoryId
                );
            }
        }

        return generateError('VALID');
    }, [settlement, vendorsQB, settlementData, driver, vendorsQBResult.isLoading]);

    const isValid = validation.errorCode === SETTLEMENT_BILL_ERROR_CODES.VALID;
    return (
        <EditSettlement.Row
            grow={0}
            sx={{ flexShrink: 0, gap: '8px' }}
        >
            <Stack
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
            >
                <ProviderLogo
                    srcDarkMode={provider.lightLogoUrl}
                    srcLightMode={provider.darkLogoUrl}
                    height="24px"
                />
                {quickBooksBill ? (
                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        gap="8px"
                    >
                        <QuickbooksBillSyncBtn />
                        <QuickbooksBillDeleteBtn />
                    </Stack>
                ) : (
                    <QuickbooksBillCreateBtn disabled={!isValid} />
                )}
            </Stack>

            {quickBooksBill && (
                <>
                    <QuickbooksBillAmountRow
                        balance={quickBooksBill.balance}
                        amount={quickBooksBill.totalAmount}
                    />
                    <Divider
                        orientation="horizontal"
                        sx={{ margin: 0 }}
                    />
                    <QuickbooksBillDocNumberRow docNumber={quickBooksBill.docNumber} />
                    <QuickbooksBillDueDateRow dueDate={quickBooksBill.dueDate} />
                </>
            )}

            {!isValid && !quickBooksBill && (
                <QuickbooksBillNotConfigure
                    errorCode={validation.errorCode}
                    itemId={validation.itemId}
                />
            )}
        </EditSettlement.Row>
    );
}

export default QuickbooksBill;
