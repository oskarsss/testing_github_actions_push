import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { useManageProviderVehicles } from '@/store/settings/integrations/hooks';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useConfirm } from '@/@core/components/confirm-dialog';
import Settings from '@/store/settings/types';
import { useAssignVehicleToProviderMenu } from '@/views/settings/tabs/Integrations/menus/AssignVehicleToProvider/AssignVehicleToProvider';
import ProviderDialogTable from '@/views/settings/tabs/Integrations/dialogs/components/ProviderDialogTable/ProviderDialogTable';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useMemo } from 'react';
import PROVIDER_VEHICLES_VIEW from './view';
import providerVehiclesColumns from './columns';

type Props = {
    provider_id: string;
};

export const useProviderVehiclesDialog = hookFabric(ProviderVehiclessDialog, FullDialog.Dialog);

type Vehicle = Settings.ProviderVehicleRow;

function ProviderVehiclessDialog({ provider_id }: Props) {
    const [unLinkVehicle] =
        IntegrationProviderGrpcService.useUnLinkVehicleIntegrationProviderMutation();

    const dialog = useProviderVehiclesDialog();

    const confirm = useConfirm();
    const { t } = useAppTranslation();
    const {
        provider,
        views,
        selected_view,
        filter_id,
        selected_filters,
        selectView,
        selected_view_id,
        isLoading
    } = useManageProviderVehicles(provider_id);

    const assignVehicleMenu = useAssignVehicleToProviderMenu();

    const executeAction = (
        name: string,
        row: Vehicle,
        event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        if (name === 'vehicle') {
            if (row.connected) {
                confirm({
                    title       : 'modals:settings.integrations.vehicles.dialog.confirm.unlink.title',
                    body        : 'modals:settings.integrations.vehicles.dialog.confirm.unlink.body',
                    confirm_text: 'common:button.unlink',
                    onConfirm   : () => {
                        unLinkVehicle({
                            vehicleReferenceId   : row.referenceId,
                            integrationProviderId: provider_id,
                            vektorEntityType     : '',
                            vektorEntityId       : ''
                        });
                    }
                });
                return;
            }

            if (!row.connected) {
                assignVehicleMenu.open({
                    row,
                    provider_id
                })(event);
            }
        }
    };

    const view = useMemo(() => PROVIDER_VEHICLES_VIEW(t), [t]);

    return (
        <ProviderDialogTable<Vehicle>
            view={view}
            tableName="eld_vehicles"
            title="modals:settings.integrations.vehicles.dialog.title"
            onClose={dialog.close}
            onRowClick={executeAction}
            columns={providerVehiclesColumns}
            views={views}
            selected_view={selected_view}
            filter_id={filter_id}
            selected_filters={selected_filters}
            selectView={selectView}
            selected_view_id={selected_view_id}
            isLoading={isLoading}
            isEmpty={!provider?.vehicles?.total}
            provider_name={provider?.name || ''}
        />
    );
}

export default ProviderVehiclessDialog;
