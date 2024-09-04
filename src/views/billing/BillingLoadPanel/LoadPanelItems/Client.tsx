import { Typography } from '@mui/material';
import React from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import CopyText from '@/@core/components/copy-text/CopyText';
import BillingLoadPanelComponents from '@/views/billing/BillingLoadPanel/BillingLoadPanelComponents';
import { useBrokersMap, useCustomersMap } from '@/store/hash_maps/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import { useEditBrokerDialog } from '@/views/dispatch/brokers/dialogs/EditBroker/EditBroker';
import { useEditCustomerDialog } from '@/views/dispatch/customers/dialogs/EditCustomer/EditCustomer';

type Props = {
    loadBrokerId: string;
    loadReferenceId: string;
    customerId: string;
};

function Client({
    loadBrokerId = '',
    customerId = '',
    loadReferenceId
}: Props) {
    const { t } = useAppTranslation();
    const editBrokerDialog = useEditBrokerDialog();
    const editCustomerDialog = useEditCustomerDialog();

    const broker = useBrokersMap(loadBrokerId);
    const customer = useCustomersMap(customerId);

    const openClientNewTab = () => {
        if (broker) {
            editBrokerDialog.open({ brokerId: broker.brokerId });
        } else if (customer) {
            editCustomerDialog.open({ customerId: customer.customerId });
        }
    };

    return (
        <BillingLoadPanelComponents.Card.Container>
            <BillingLoadPanelComponents.Card.Row>
                <BillingLoadPanelComponents.Card.Title
                    title={(
                        <>
                            {broker && t('entity:broker')}
                            {customer && t('entity:customer')}
                            {!broker && !customer && t('billing:panel.no_client')}
                        </>
                    )}
                    icon={
                        broker ? (
                            <VectorIcons.FullDialogIcons.Briefcase />
                        ) : (
                            <VectorIcons.FullDialogIcons.Customer />
                        )
                    }
                />
                <CopyText text={loadReferenceId}>
                    <Typography
                        variant="body1"
                        component="span"
                        fontWeight={600}
                        fontSize="18px"
                    >
                        #{loadReferenceId || '-'}
                    </Typography>
                </CopyText>
            </BillingLoadPanelComponents.Card.Row>
            {(broker || customer) && (
                <BillingLoadPanelComponents.Card.Row
                    direction="column"
                    justifyContent="flex-start"
                    minHeight="50px"
                >
                    <Typography
                        variant="body1"
                        fontWeight={600}
                        fontSize="14px"
                    >
                        {broker && (broker.name || `${t('common:not_provided')} (${broker.mc})`)}
                        {customer && customer.name}
                    </Typography>
                    {(broker ? !broker.deleted : !customer?.deleted) && (
                        <IconButtonWithTooltip
                            padding="4px"
                            tooltip="common:tooltips.click_to_edit"
                            onClick={openClientNewTab}
                            icon={<VectorIcons.EditIcon sx={{ fontSize: '16px' }} />}
                        />
                    )}
                </BillingLoadPanelComponents.Card.Row>
            )}
        </BillingLoadPanelComponents.Card.Container>
    );
}

export default React.memo(Client);
