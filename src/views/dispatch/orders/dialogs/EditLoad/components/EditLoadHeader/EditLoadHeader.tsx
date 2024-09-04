import { useEditLoadForm } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoadForm';
import FullDialog from '@/@core/ui-kits/full-dialog';
import LoadsTypes from '@/store/dispatch/loads/types';
import DownloadButton from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadHeader/DownloadButton';
import LoadStatusChipSelect from '@/@core/fields/chip-select/LoadStatusChipSelect';
import LoadInvoiceStatusChipSelect from '@/@core/fields/chip-select/LoadInvoiceStatusChipSelect';
import { useRouter } from 'next/router';
import TabIcon from '@mui/icons-material/Tab';
import openNewWindow from '@/utils/open-new-window';
import { Button, Stack } from '@mui/material';
import ButtonShare from '@/views/dispatch/orders/Details/sections/load-header/components/ButtonShare';
import DeleteLoadButton from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadHeader/DeleteLoadButton';
import { LOAD_INVOICE_STATUS_GRPC_ENUM, LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import { checkLoadForDownloadInvoice } from '@/@grpcServices/services/loads-service/service-utils/utils';
import CloneLoadButton from '@/@core/ui-kits/loads/clone-load-button/CloneLoadButton';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { LoadModel_Status } from '@proto/models/model_load';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

type Props = {
    load: LoadsTypes.Load.Load;
    isMutationLoading: boolean;
    invalidateSettlement: () => void;
    onSuccessfulDelete?: () => void;
    onClose: () => void;
};

export default function EditLoadHeader({
    load,
    isMutationLoading,
    invalidateSettlement,
    onSuccessfulDelete,
    onClose
}: Props) {
    const { route } = useRouter();
    const { t } = useAppTranslation('common');

    const truckId =
        load.manifests.find((manifest) => manifest.manifestId === load.activeManifestId)?.truckId ||
        '';

    const {
        formState: { isDirty }
    } = useEditLoadForm();

    const openNewTab = () => {
        openNewWindow(APP_ROUTES_CONFIG.dispatch.orders.details(load.loadId));
    };

    return (
        <FullDialog.Header>
            <Stack
                direction="row"
                alignItems="center"
                spacing={3}
                flex={1}
                overflow="hidden"
            >
                <FullDialog.HeaderTitle title="modals:loads.edit_load.titles.main">
                    {' '}
                    <FullDialog.CopyText text={load.friendlyId?.toString() || ''} />
                    {load.referenceId ? <FullDialog.Slashed /> : ''}
                    <FullDialog.CopyText text={load.referenceId} />
                </FullDialog.HeaderTitle>

                <LoadStatusChipSelect
                    load_status={LOAD_STATUS_GRPC_ENUM[load.status]}
                    load_id={load.loadId}
                    invalidateFns={invalidateSettlement}
                />
                <LoadInvoiceStatusChipSelect
                    invalidateFns={invalidateSettlement}
                    invoice_status={LOAD_INVOICE_STATUS_GRPC_ENUM[load.invoiceStatus]}
                    load_id={load.loadId}
                />
            </Stack>

            <FullDialog.ActionsWrapper>
                {!route.includes('id') && (
                    <Button
                        variant="text"
                        onClick={openNewTab}
                        startIcon={<TabIcon />}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        {t('button.new_tab')}
                    </Button>
                )}
                <ButtonShare load_id={load.loadId} />

                <CloneLoadButton loadId={load.loadId} />

                {load.status !== LoadModel_Status.deleted && (
                    <DeleteLoadButton
                        load_id={load.loadId}
                        disabled={isMutationLoading}
                        onSuccessfulDelete={() => {
                            if (onSuccessfulDelete) {
                                onSuccessfulDelete();
                            }
                            invalidateSettlement();
                        }}
                    />
                )}
                <FullDialog.SaveButton
                    isDisabled={!isDirty}
                    isLoading={isMutationLoading}
                    type="update"
                />
                {checkLoadForDownloadInvoice(load.status, truckId) && (
                    <DownloadButton
                        loadId={load.loadId}
                        loadFriendlyId={load.friendlyId}
                    />
                )}
                <FullDialog.CloseButton onClose={onClose} />
            </FullDialog.ActionsWrapper>
        </FullDialog.Header>
    );
}
