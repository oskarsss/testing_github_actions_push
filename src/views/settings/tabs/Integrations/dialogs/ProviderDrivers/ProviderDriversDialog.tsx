import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { useManageProviderDrivers } from '@/store/settings/integrations/hooks';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useConfirm } from '@/@core/components/confirm-dialog';
import Settings from '@/store/settings/types';
import { useAssignDriverToProviderMenu } from '@/views/settings/tabs/Integrations/menus/AssignDriverToProvider';
import ProviderDialogTable from '@/views/settings/tabs/Integrations/dialogs/components/ProviderDialogTable/ProviderDialogTable';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useMemo } from 'react';
import providerDriversColumns from './columns';
import PROVIDER_DRIVERS_VIEW from './view';

type Props = {
    provider_id: string;
};

export const useProviderDriversDialog = hookFabric(ProviderDriversDialog, FullDialog.Dialog);

type Driver = Settings.ProviderDriverRow;

function ProviderDriversDialog({ provider_id }: Props) {
    const [unLinkDriver] =
        IntegrationProviderGrpcService.useUnLinkDriverIntegrationProviderMutation();

    const dialog = useProviderDriversDialog();

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
    } = useManageProviderDrivers(provider_id);

    const assignDriverMenu = useAssignDriverToProviderMenu();

    const executeAction = (
        name: string,
        row: Driver,
        event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        if (name === 'driver') {
            if (row.connected) {
                confirm({
                    title       : 'modals:settings.integrations.drivers.confirm.unlink_driver.title',
                    body        : 'modals:settings.integrations.drivers.confirm.unlink_driver.body',
                    confirm_text: 'common:button.unlink',
                    onConfirm   : () => {
                        unLinkDriver({
                            driverReferenceId    : row.referenceId,
                            integrationProviderId: provider_id,
                            vektorDriverId       : ''
                        });
                    }
                });

                return;
            }

            if (!row.connected) {
                assignDriverMenu.open({
                    row,
                    provider_id
                })(event);
            }
        }
    };

    const view = useMemo(() => PROVIDER_DRIVERS_VIEW(t), [t]);

    return (
        <ProviderDialogTable<Driver>
            view={view}
            tableName="eld_drivers"
            title="modals:settings.integrations.drivers.title"
            onClose={dialog.close}
            onRowClick={executeAction}
            columns={providerDriversColumns}
            views={views}
            selected_view={selected_view}
            filter_id={filter_id}
            selected_filters={selected_filters}
            selectView={selectView}
            selected_view_id={selected_view_id}
            isLoading={isLoading}
            isEmpty={!provider?.drivers?.total}
            provider_name={provider?.name || ''}
        />
    );
}

export default ProviderDriversDialog;
