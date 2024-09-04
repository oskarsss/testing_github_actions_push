import type { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { ServiceProviderModel_ServiceProvider } from '@proto/models/model_service_provider';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { useServiceProviders } from '@/store/maitenance/service-providers/hooks';
import { useUpdateServiceProvider } from '@/views/maintenance/service-providers/modals/UpdateServiceProvider';
import ErrorScreen from '@/@core/ui-kits/error-screen/ErrorScreen';
import { ErrorScreenType } from '@/@core/ui-kits/error-screen/error-screen-config';
import { useCreateServiceProvider } from '@/views/maintenance/service-providers/modals/CreateServiceProvider';
import { Stack } from '@mui/material';
import { SelectServiceProviderAction } from '@/store/maitenance/service-providers/slice';
import { useAppDispatch } from '@/store/hooks';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import columns from './columns';

export default function Table() {
    const dispatch = useAppDispatch();
    const editServiceProviderDialog = useUpdateServiceProvider();
    const createServiceProviderDialog = useCreateServiceProvider();
    const {
        serviceProviders,
        isLoading
    } = useServiceProviders();

    const executeAction: MiniTableExecuteActionType<ServiceProviderModel_ServiceProvider> = (
        name,
        props
    ) => {
        switch (name) {
        case 'edit':
            editServiceProviderDialog.open({
                serviceProvider: props.row
            });
            break;
        case 'open_panel':
            dispatch(
                SelectServiceProviderAction.selectServiceProviderId(props.row.serviceProviderId)
            );
            break;
        default:
            break;
        }
    };

    const openCreateDialog = () => {
        createServiceProviderDialog.open({});
    };

    if (isLoading) {
        return <Preloader sx={{ width: '100%' }} />;
    }

    if (!serviceProviders.length) {
        return (
            <ErrorScreen
                configType={ErrorScreenType.SERVICE_PROVIDERS}
                onClick={openCreateDialog}
            />
        );
    }

    return (
        <Stack
            height="100%"
            padding="20px"
            width="100%"
            overflow="hidden"
        >
            <MiniTable
                turnOffBorder
                stickyHeader
                rows={serviceProviders}
                elementKey="serviceProviderId"
                columns={columns}
                executeAction={executeAction}
            />
        </Stack>
    );
}
