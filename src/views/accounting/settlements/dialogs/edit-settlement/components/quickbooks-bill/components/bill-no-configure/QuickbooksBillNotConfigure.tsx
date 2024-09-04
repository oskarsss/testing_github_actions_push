/* eslint-disable no-case-declarations */
import { Stack, Typography } from '@mui/material';
import React from 'react';
import {
    useRevenueTypesMap,
    useSettlementTransactionCategoriesMap,
    useVendorsMap
} from '@/store/hash_maps/hooks';
import { useEditSettlementsQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditSettlementsQBDialog';
import { useEditDriverQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditDriverQBDialog';
import { useEditVendorQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditVendorQBDialog';
import { useEditSettlementRevenueTypesQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditSettlementRevenueTypesQBDialog';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import {
    SETTLEMENT_BILL_ERROR_CODES,
    SETTLEMENT_BILL_ERROR_CONFIG
} from './settlementBillErrorConfig';

type Props = {
    errorCode: SETTLEMENT_BILL_ERROR_CODES;
    itemId?: string;
};

export default function QuickbooksBillNotConfigure({
    errorCode,
    itemId
}: Props) {
    const { t } = useAppTranslation();

    const driversMap = useDriversMap();
    const vendorsMap = useVendorsMap();
    const revenueTypesMap = useRevenueTypesMap();
    const settlementCategoriesMap = useSettlementTransactionCategoriesMap();

    const settlementCategoryQBDialog = useEditSettlementsQBDialog();
    const settlementRevenueTypesQBDialog = useEditSettlementRevenueTypesQBDialog();
    const driverQBDialog = useEditDriverQBDialog();
    const vendorQBDialog = useEditVendorQBDialog();
    const editDriverDialog = useEditDriverDialog();

    const onClick = () => {
        switch (errorCode) {
        case SETTLEMENT_BILL_ERROR_CODES.SETTLEMENT_CATEGORY_NOT_CONNECTED:
            if (!itemId) return;
            settlementCategoryQBDialog.open({
                quickbooksId           : '',
                transactionCategoryId  : itemId,
                transactionCategoryName: settlementCategoriesMap[itemId]?.name || ''
            });
            break;
        case SETTLEMENT_BILL_ERROR_CODES.DRIVER_NOT_CONNECTED:
            if (!itemId) return;
            const driverM = driversMap[itemId];
            driverQBDialog.open({
                quickbooksId  : '',
                driverId      : itemId,
                driverFullName: `${driverM?.firstName || ''} ${driverM?.lastName || ''}`
            });
            break;
        case SETTLEMENT_BILL_ERROR_CODES.VENDOR_NOT_CONNECTED:
            if (!itemId) return;
            vendorQBDialog.open({
                quickbooksId: '',
                vendorId    : itemId,
                vendorName  : vendorsMap[itemId]?.name || ''
            });
            break;
        case SETTLEMENT_BILL_ERROR_CODES.REVENUE_TYPE_NOT_CONNECTED:
            if (!itemId) return;
            settlementRevenueTypesQBDialog.open({
                revenueTypeId  : itemId,
                revenueTypeName: revenueTypesMap[itemId]?.name || ''
            });
            break;
        case SETTLEMENT_BILL_ERROR_CODES.DRIVER_HAS_NOT_REVENUE_TYPE:
            if (!itemId) return;
            editDriverDialog.open({
                driver_id: itemId
            });
            break;
        case SETTLEMENT_BILL_ERROR_CODES.DRIVER_NOT_CORRECT_REVENUE_TYPE:
            if (!itemId) return;
            editDriverDialog.open({
                driver_id: itemId
            });
            break;
        default:
        }
    };

    const translateConfig = SETTLEMENT_BILL_ERROR_CONFIG(t);
    const config = translateConfig[errorCode];

    return (
        <Stack
            alignItems="center"
            alignContent="center"
            paddingY="20px"
            gap="4px"
        >
            <Typography
                fontSize="14px"
                fontWeight={600}
                lineHeight={1.3}
            >
                {config.title}
            </Typography>
            <Typography
                fontSize="12px"
                fontWeight={500}
                lineHeight={1.3}
                color="text.secondary"
                textAlign="center"
            >
                {config.beforeLinkText}
                {config.linkText && (
                    <Typography
                        component="span"
                        color="semantic.text.brand.primary"
                        fontSize="inherit"
                        fontWeight="inherit"
                        lineHeight="inherit"
                        onClick={onClick}
                        sx={{
                            cursor   : 'pointer',
                            '&:hover': {
                                opacity: 0.8
                            }
                        }}
                    >
                        {` ${config.linkText} `}
                    </Typography>
                )}
                {config.afterLinkText}
            </Typography>
        </Stack>
    );
}
