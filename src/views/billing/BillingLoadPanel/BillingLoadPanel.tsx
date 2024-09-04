import { Fade, Stack } from '@mui/material';
import { PerfectScrollbar } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import QuickbooksInvoices from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/QuickbooksInvoices';
import { LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import BillingLoadPanelDocuments from '@/views/billing/BillingLoadPanel/LoadPanelItems/BillingLoadPanelDocuments';
import { BillingSelectors, BillingStoreKey } from '@/store/billing/slice';
import { useAppSelector } from '@/store/hooks';
import React from 'react';
import BillingLoadPanelNotes from '@/views/billing/BillingLoadPanel/components/notes/BillingLoadPanelNotes';
import { selectSelectedBillingOrder } from '@/store/billing/selectors';
import Client from './LoadPanelItems/Client';
import Load from './LoadPanelItems/Load';
import Invoicing from './LoadPanelItems/Invoicing';
import InvoicingPayments from './LoadPanelItems/InvoicingPayments';
import BillingLoadPanelHeader from './BillingLoadPanelHeader';

type Props = {
    onClickEditLoad: (loadId?: string) => void;
    storeKey: BillingStoreKey;
};

function BillingLoadPanel({
    onClickEditLoad,
    storeKey
}: Props) {
    const load = useAppSelector(selectSelectedBillingOrder(storeKey));
    if (!load) return null;

    return (
        <Fade in>
            <Stack
                height="100%"
                width="100%"
                overflow="hidden"
            >
                <PerfectScrollbar
                    options={{
                        wheelSpeed      : 1,
                        wheelPropagation: false,
                        suppressScrollX : true
                    }}
                >
                    <Stack
                        paddingX={4}
                        paddingBottom={4}
                        direction="column"
                        flex="1 1 100%"
                        position="relative"
                        padding="0 1.3rem 1.3rem"
                        bgcolor="semantic.background.secondary"
                    >
                        <Stack
                            direction="column"
                            gap={2}
                            paddingTop={3}
                            paddingBottom={3}
                            position="sticky"
                            top={0}
                            zIndex={1000}
                            bgcolor="semantic.background.secondary"
                        >
                            <BillingLoadPanelHeader
                                loadId={load.loadId}
                                loadFriendlyId={load.friendlyId}
                                invoiceStatus={load.invoiceStatus}
                                onClickEditLoad={onClickEditLoad}
                            />

                            <Client
                                loadBrokerId={load.brokerId}
                                loadReferenceId={load.referenceId}
                                customerId={load.customerId}
                            />
                        </Stack>

                        <Stack
                            direction="column"
                            gap={2}
                        >
                            <Invoicing
                                loadId={load.loadId}
                                invoiceAmount={load.invoiceAmount}
                                invoiceFactoringCompanyId={load.invoiceFactoringCompanyId}
                            />

                            <InvoicingPayments loadId={load.loadId} />

                            <Load
                                loadId={load.loadId}
                                loadStatus={LOAD_STATUS_GRPC_ENUM[load.status]}
                                dispatcherId={load.dispatcherId}
                                commodity={load.commodity}
                                equipmentId={load.equipmentId}
                                loadTypeId={load.typeId}
                                weight={load.weightFormatted}
                                note={load.note}
                            />

                            <QuickbooksInvoices
                                load_id={load.loadId}
                                broker_id={load.brokerId}
                                customer_id={load.customerId}
                            />

                            <BillingLoadPanelDocuments
                                loadId={load.loadId}
                                loadFriendlyId={load.friendlyId}
                            />

                            <BillingLoadPanelNotes
                                loadId={load.loadId}
                                manifests={load.manifests}
                            />
                        </Stack>
                    </Stack>
                </PerfectScrollbar>
            </Stack>
        </Fade>
    );
}

export default React.memo(BillingLoadPanel);
