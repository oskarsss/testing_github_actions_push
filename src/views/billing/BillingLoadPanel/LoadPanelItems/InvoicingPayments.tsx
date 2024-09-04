import VectorIcons from '@/@core/icons/vector_icons';
import BillingLoadPanelComponents from '@/views/billing/BillingLoadPanel/BillingLoadPanelComponents';
import InvoicingPaymentsTable from '@/@core/ui-kits/loads/invoicing-payments-table/InvoicingPaymentsTable';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import React from 'react';

type Props = {
    loadId: string;
};

function InvoicingPayments({ loadId }: Props) {
    const { t } = useAppTranslation('billing');

    return (
        <BillingLoadPanelComponents.Card.Container>
            <BillingLoadPanelComponents.Card.Row>
                <BillingLoadPanelComponents.Card.Title
                    title={t('panel.title.invoicing_payments')}
                    icon={<VectorIcons.FullDialogIcons.Invoice />}
                />
            </BillingLoadPanelComponents.Card.Row>

            <InvoicingPaymentsTable loadId={loadId} />
        </BillingLoadPanelComponents.Card.Container>
    );
}

export default React.memo(InvoicingPayments);
