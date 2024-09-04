import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import {
    ERROR_CODES,
    ERROR_CONFIG
} from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/config';
import {
    useBrokersMap,
    useCustomersMap,
    useLoadInvoiceCategoriesMap
} from '@/store/hash_maps/hooks';
import { useEditBrokerDialog } from '@/views/dispatch/brokers/dialogs/EditBroker/EditBroker';
import { useEditCustomerDialog } from '@/views/dispatch/customers/dialogs/EditCustomer/EditCustomer';
import { useEditBrokerQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditBrokerQBDialog';
import { useEditCustomerQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditCustomerQBDialog';
import { useEditInvoiceItemCategoryQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditInvoiceItemCategoryQBDialog';
import { useEditLoadDialog } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoad';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    errorCode: ERROR_CODES;
    itemId?: string;
    loadId: string;
    brokerId: string;
    customerId: string;
};

export default function QuickbooksNotConfigure({
    errorCode,
    itemId,
    loadId,
    brokerId,
    customerId
}: Props) {
    const { palette } = useTheme();
    const { t } = useAppTranslation();
    const brokersMap = useBrokersMap();
    const customersMap = useCustomersMap();
    const loadInvoiceCategoriesMap = useLoadInvoiceCategoriesMap();

    const editLoadDialog = useEditLoadDialog();
    const editBrokerDialog = useEditBrokerDialog();
    const editCustomerDialog = useEditCustomerDialog();
    const editBrokerQBDialog = useEditBrokerQBDialog();
    const editCustomerQBDialog = useEditCustomerQBDialog();
    const editInvoiceItemCategoryQBDialog = useEditInvoiceItemCategoryQBDialog();

    const onClick = () => {
        switch (errorCode) {
        case ERROR_CODES.BROKER_NOT_CONNECTED:
            editBrokerQBDialog.open({
                brokerId,
                brokerName  : brokersMap[brokerId]?.name,
                quickbooksId: ''
            });
            break;
        case ERROR_CODES.BROKER_WITHOUT_BILLING_EMAIL:
            editBrokerDialog.open({ brokerId });
            break;
        case ERROR_CODES.CLIENT_NOT_CONNECTED:
            editLoadDialog.open({ load_id: loadId });
            break;
        case ERROR_CODES.CUSTOMER_WITHOUT_BILLING_EMAIL:
            editCustomerDialog.open({ customerId });
            break;
        case ERROR_CODES.CUSTOMER_NOT_CONNECTED:
            editCustomerQBDialog.open({
                customerId,
                customerName: customersMap[customerId]?.name,
                quickbooksId: ''
            });
            break;
        case ERROR_CODES.LOAD_WITHOUT_INVOICE:
            editLoadDialog.open({ load_id: loadId });
            break;
        case ERROR_CODES.INVOICE_ITEM_CATEGORY_DELETED:
            editLoadDialog.open({ load_id: loadId });
            break;
        case ERROR_CODES.INVOICE_ITEM_CATEGORY_NOT_CONNECTED:
            if (!itemId) break;
            editInvoiceItemCategoryQBDialog.open({
                invoiceItemCategoryId  : itemId,
                invoiceItemCategoryName: loadInvoiceCategoriesMap[itemId]?.name,
                quickbooksId           : ''
            });
            break;
        default:
        }
    };

    const config = ERROR_CONFIG[errorCode];

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
                {t(config.title)}
            </Typography>
            <Typography
                fontSize="12px"
                fontWeight={500}
                lineHeight={1.3}
                color="text.secondary"
            >
                {t(config.beforeLinkText)}
                <Typography
                    component="span"
                    color={palette.semantic.text.brand.primary}
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
                    {` ${t(config.linkText)} `}
                </Typography>
                {t(config.afterLinkText)}
            </Typography>
        </Stack>
    );
}
