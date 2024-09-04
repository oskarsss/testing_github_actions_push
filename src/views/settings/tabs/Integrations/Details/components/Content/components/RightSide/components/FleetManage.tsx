import ConnectedItem from '@/views/settings/tabs/Integrations/Details/components/Content/components/ConnectedItem/ConnectedItem';
import VectorIcons from '@/@core/icons/vector_icons';
import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import { useProviderVehiclesDialog } from '@/views/settings/tabs/Integrations/dialogs/ProviderVehicles/ProviderVehiclesDialog';
import { useProviderDriversDialog } from '@/views/settings/tabs/Integrations/dialogs/ProviderDrivers/ProviderDriversDialog';
import { IntegrationProvider } from '@proto/integrations';

type Props = {
    provider: IntegrationProvider;
};

export default function FleetManage({ provider }: Props) {
    const vehiclesDialog = useProviderVehiclesDialog();
    const driverDialog = useProviderDriversDialog();

    const percent = (type: 'drivers' | 'vehicles') =>
        ((provider[type]?.totalConnected || 0) / (provider[type]?.total || 0)) * 100 || 0;

    const openDialog = (type: 'drivers' | 'vehicles') => {
        if (type === 'drivers') {
            driverDialog.open({
                provider_id: provider.id
            });
        }
        if (type === 'vehicles') {
            vehiclesDialog.open({
                provider_id: provider.id
            });
        }
    };

    if (!provider.drivers?.supported && !provider.vehicles?.supported) {
        return null;
    }

    return (
        <IntegrationDetailsComponents.RowContent
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="stretch"
        >
            {provider.drivers?.supported && (
                <ConnectedItem
                    percent={percent('drivers')}
                    icon={<VectorIcons.NavIcons.Driver />}
                    name="settings:integrations.details.right_side.connected_drivers"
                    total_connected={provider.drivers?.totalConnected || 0}
                    total={provider.drivers?.total || 0}
                    onClick={() => openDialog('drivers')}
                    style={{
                        minHeight: '70px',
                        height   : '100%',
                        gap      : '4px'
                    }}
                />
            )}
            {provider.vehicles?.supported && (
                <ConnectedItem
                    percent={percent('vehicles')}
                    icon={<VectorIcons.NavIcons.EmptyTruck style={{ fill: '#C6D3E3' }} />}
                    name="settings:integrations.details.right_side.connected_vehicles"
                    total_connected={provider?.vehicles?.totalConnected || 0}
                    total={provider?.vehicles?.total || 0}
                    onClick={() => openDialog('vehicles')}
                    style={{
                        minHeight: '70px',
                        height   : '100%',
                        gap      : '4px'
                    }}
                />
            )}
        </IntegrationDetailsComponents.RowContent>
    );
}
