import { hookFabric } from '@/utils/dialog-hook-fabric';
import IntegrationApexCapitalGrpcService, {
    IntegrationsApexCapitalService
} from '@/@grpcServices/services/integrations-apexcapital.service';
import { Button, Stack } from '@mui/material';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { LoadingButton } from '@mui/lab';
import ApexCapitalDialogHeader from '@/views/billing/factoring/dialogs/apex-capital/components/ApexCapitalDialogHeader';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import NotConfigureApex from '@/views/billing/factoring/dialogs/apex-capital/components/NotConfigureApex';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInvoiceApexCapitalItems } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/tabs/Invoicing/hook';
import { useEquipmentsTypesApexCapital } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/tabs/equipments/hook';
import ApexCapitalDialogTable from '@/views/billing/factoring/dialogs/apex-capital/components/apex-capital-dialog-table/ApexCapitalDialogTable';
import toast from 'react-hot-toast';
import { useEditLoadDialog } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoad';
import { renderError } from '@/utils/render-error';
import Loading from '@/@core/components/page/Loading';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ApexCapitalInvoice } from '@/views/billing/factoring/dialogs/apex-capital/types';
import { IP_ApexCapital_Invoices_CreateReply_Enum_Code_Code } from '@proto/integration_provider_apexcapital';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { api } from '@/store/api';

export const useApexCapitalDialog = hookFabric(ApexCapitalDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="1260px"
    />
));

type Props = {
    providerName: string;
};

function ApexCapitalDialog({ providerName }: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const dialog = useApexCapitalDialog();
    const editLoadDialog = useEditLoadDialog();
    const [submitLoading, setSubmitLoading] = useState(false);

    const {
        company_id,
        token
    } = useAppSelector((state) => state.app);

    const [selectedLoads, setSelectedLoads] = useState<ApexCapitalInvoice[]>([]);

    const submitInvoiceStream = useCallback(
        (loadIds: string[]) =>
            new Promise((resolve, reject) => {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    ...(company_id ? { company_id } : {})
                };

                const stream = IntegrationsApexCapitalService.iPApexCapitalInvoicesCreate(
                    { loadIds },
                    { meta: headers }
                );

                stream.responses.onMessage((response) => {
                    const {
                        code,
                        message
                    } = response;

                    if (code === IP_ApexCapital_Invoices_CreateReply_Enum_Code_Code.SUCCESS) {
                        toast.success(message, {
                            position: 'top-right',
                            duration: 2500
                        });
                        return;
                    }

                    if (code === IP_ApexCapital_Invoices_CreateReply_Enum_Code_Code.WARN) {
                        toast.custom(message, {
                            position: 'top-right',
                            duration: 2500,
                            icon    : '⚠️'
                        });
                        return;
                    }

                    toast.error(message, {
                        position: 'top-right',
                        duration: 2500
                    });
                });

                stream.responses.onError((error) => {
                    toast.error(error.message, {
                        position: 'top-right',
                        duration: 2500
                    });
                    reject(error);
                });

                stream.responses.onComplete(() => {
                    resolve(true);
                });
            }),
        [company_id, token]
    );

    const {
        data,
        isLoading,
        isFetching,
        error
    } =
        IntegrationApexCapitalGrpcService.usePreviewApexCapitalInvoiceQuery(
            {},
            {
                refetchOnMountOrArgChange: true
            }
        );

    useEffect(() => {
        setSelectedLoads([]);
    }, [data?.invoices?.length]);

    const invoice_data = useInvoiceApexCapitalItems();
    const equipment_data = useEquipmentsTypesApexCapital();

    const validation = useMemo(() => {
        const entities: string[] = [];
        let isValid = true;

        const isAssignedAllApexEquipments =
            equipment_data.data.filter((item) => !item.apex_capital_id).length === 0;

        if (!isAssignedAllApexEquipments) {
            entities.push(t('billing:dialogs.apex.no_configure.equipments'));
            isValid = false;
        }

        const isAssignedAllApexItems =
            invoice_data.data.filter((item) => !item.apex_capital_id).length === 0;

        if (!isAssignedAllApexItems) {
            entities.push(t('billing:dialogs.apex.no_configure.line_items'));
            isValid = false;
        }

        const and = t('billing:dialogs.apex.no_configure.and');
        const notConnected = t('billing:dialogs.apex.no_configure.not_connected');

        return {
            isValid,
            title: `${providerName} ${entities.join(` ${and} `)} ${notConnected}`
        };
    }, [invoice_data.data, equipment_data.data]);

    const executeAction: MiniTableExecuteActionType<ApexCapitalInvoice> = (name, props) => {
        if (name === 'export') {
            return;
        }
        if (name === 'edit_load') {
            editLoadDialog.open({
                load_id: props.row.loadId
            });
        }
    };

    const onExportAll = () => {};

    const onSubmitInvoices = () => {
        if (selectedLoads.find((item) => !item.brokerId)) {
            toast.error(t('billing:dialogs.apex.toast.without_broker'), {
                position: 'top-right'
            });
            return;
        }

        setSubmitLoading(true);

        submitInvoiceStream(selectedLoads.map((item) => item.loadId))
            .then(() => {
                setSubmitLoading(false);
                dispatch(
                    api.util?.invalidateTags([
                        'integration.apexcapital.preview',
                        'billing.factoring',
                        'billing.factoring.stats',
                        'loads'
                    ])
                );
                dialog.close();
            })
            .catch(() => {
                setSubmitLoading(false);
            });
    };

    const loadings = isLoading || invoice_data.loading || equipment_data.loading;

    return (
        <Stack
            width="100%"
            overflow="hidden"
            gap="20px"
            minHeight="200px"
            justifyContent="space-between"
        >
            <Stack
                gap="inherit"
                width="100%"
                overflow="hidden"
            >
                <ApexCapitalDialogHeader providerName={providerName} />

                {validation.isValid && !loadings && (
                    <ApexCapitalDialogTable
                        data={data}
                        selected={selectedLoads}
                        setSelected={setSelectedLoads}
                        executeAction={executeAction}
                        errorText={error ? renderError(error) : undefined}
                    />
                )}

                {!validation.isValid && !loadings && <NotConfigureApex title={validation.title} />}

                {loadings && <Loading />}
            </Stack>

            <Stack
                width="100%"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
                gap="12px"
            >
                <Button
                    onClick={dialog.close}
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                >
                    {t('common:button.cancel')}
                </Button>

                {/* <LoadingButton */}
                {/*     onClick={onExportAll} */}
                {/*     variant="contained" */}
                {/*     disabled={!validation.isValid || selectedLoadIds.length === 0} */}
                {/*     sx={{ fontWeight: 600, minWidth: 190 }} */}
                {/* > */}
                {/*     {`Export ${selectedLoadIds.length || ''} ${ */}
                {/*         selectedLoadIds.length > 1 ? 'Invoices' : 'Invoice' */}
                {/*     }`} */}
                {/* </LoadingButton> */}

                <LoadingButton
                    onClick={onSubmitInvoices}
                    disabled={!validation.isValid || selectedLoads.length === 0}
                    loading={submitLoading || isFetching}
                    variant="contained"
                    sx={{ fontWeight: 600, minWidth: 190 }}
                >
                    {t('billing:dialogs.submit_invoice', { count: selectedLoads.length })}
                    {/* {selectedLoads.length > 1 */}
                    {/*     ? `${t('integration.submit_invoice.some')} ${selectedLoads.length}` */}
                    {/*     : t('integration.submit_invoice.one')} */}
                </LoadingButton>
            </Stack>
        </Stack>
    );
}
