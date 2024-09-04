import { hookFabric } from '@/utils/dialog-hook-fabric';
import { Button, Stack } from '@mui/material';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { LoadingButton } from '@mui/lab';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useEditLoadDialog } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoad';
import { renderError } from '@/utils/render-error';
import Loading from '@/@core/components/page/Loading';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IP_TruFund_Invoices_CreateReply_Enum_Code_Code } from '@proto/integration_provider_trufund';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { api } from '@/store/api';
import IntegrationTruFundGrpcService, {
    IntegrationsTruFundService
} from '@/@grpcServices/services/integrations-trufund.service';
import TruFundDialogHeader from '@/views/billing/factoring/dialogs/tru-fund/components/TruFundDialogHeader';
import TruFundDialogTable from '@/views/billing/factoring/dialogs/tru-fund/components/trufund-dialog-table/TruFundDialogTable';
import { TruFundInvoice } from './helpers';

export const useTruFundDialog = hookFabric(TruFundDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="1260px"
    />
));

type Props = {
    providerName: string;
};

function TruFundDialog({ providerName }: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const dialog = useTruFundDialog();
    const editLoadDialog = useEditLoadDialog();
    const [submitLoading, setSubmitLoading] = useState(false);

    const {
        company_id,
        token
    } = useAppSelector((state) => state.app);

    const [selectedLoads, setSelectedLoads] = useState<TruFundInvoice[]>([]);

    const submitInvoiceStream = useCallback(
        (loadIds: string[]) =>
            new Promise((resolve, reject) => {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    ...(company_id ? { company_id } : {})
                };

                const stream = IntegrationsTruFundService.iPTruFundInvoicesCreate(
                    { loadIds },
                    { meta: headers }
                );

                stream.responses.onMessage((response) => {
                    const {
                        code,
                        message
                    } = response;

                    if (code === IP_TruFund_Invoices_CreateReply_Enum_Code_Code.SUCCESS) {
                        toast.success(message, {
                            position: 'top-right',
                            duration: 2500
                        });
                        return;
                    }

                    if (code === IP_TruFund_Invoices_CreateReply_Enum_Code_Code.WARN) {
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
        IntegrationTruFundGrpcService.usePreviewTruFundInvoiceQuery(
            {},
            {
                refetchOnMountOrArgChange: true
            }
        );

    useEffect(() => {
        setSelectedLoads([]);
    }, [data?.invoices?.length]);

    const executeAction: MiniTableExecuteActionType<TruFundInvoice> = (name, props) => {
        if (name === 'edit_load') {
            editLoadDialog.open({
                load_id: props.row.loadId
            });
        }
    };

    const onSubmitInvoices = () => {
        setSubmitLoading(true);

        submitInvoiceStream(selectedLoads.map((item) => item.loadId))
            .then(() => {
                setSubmitLoading(false);
                dispatch(
                    api.util?.invalidateTags([
                        'integration.trufund.preview',
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
                <TruFundDialogHeader providerName={providerName} />

                {isLoading ? (
                    <Loading />
                ) : (
                    <TruFundDialogTable
                        data={data}
                        selected={selectedLoads}
                        setSelected={setSelectedLoads}
                        executeAction={executeAction}
                        errorText={error ? renderError(error) : undefined}
                    />
                )}
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

                <LoadingButton
                    onClick={onSubmitInvoices}
                    disabled={selectedLoads.length === 0}
                    loading={submitLoading || isFetching}
                    variant="contained"
                    sx={{ fontWeight: 600, minWidth: 190 }}
                >
                    {t('billing:dialogs.submit_invoice', { count: selectedLoads.length })}
                </LoadingButton>
            </Stack>
        </Stack>
    );
}
