import MenuComponents from '@/@core/ui-kits/menus';
import { useForm } from 'react-hook-form';
import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { IntegrationProvider_Drivers_Driver } from '@proto/integrations';
import DriverSelect from '@/@core/fields/select/driver-select/DriverSelect';

export const useAssignDriverToProviderMenu = menuHookFabric(MenuVehicle);

type Props = {
    row: IntegrationProvider_Drivers_Driver;
    provider_id: string;
};

type DefaultValues = {
    driver_id: string;
    entityType: string;
};

function MenuVehicle({
    row,
    provider_id
}: Props) {
    const menu = useAssignDriverToProviderMenu(true);

    const [assignDriver, { isLoading }] =
        IntegrationProviderGrpcService.useLinkDriverIntegrationProviderMutation();

    const onSubmit = (data: DefaultValues) => {
        assignDriver({
            driverReferenceId    : row.referenceId,
            integrationProviderId: provider_id,
            vektorDriverId       : data.driver_id
        })
            .unwrap()
            .then(menu.close);
    };

    const {
        control,
        handleSubmit,
        formState: { isDirty }
    } = useForm<DefaultValues>({
        defaultValues: {
            driver_id: row.vektorDriverId
        }
    });

    return (
        <MenuComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <MenuComponents.FormHeader text="modals:settings.integrations.drivers.menu.assign.title" />
            <MenuComponents.Fields>
                <MenuComponents.Field xs={12}>
                    <DriverSelect control={control} />
                </MenuComponents.Field>
                <MenuComponents.ActionsWrapper>
                    <MenuComponents.CancelButton onCancel={menu.close} />
                    <MenuComponents.SubmitButton
                        text="common:button.assign"
                        loading={isLoading}
                        disabled={!isDirty}
                    />
                </MenuComponents.ActionsWrapper>
            </MenuComponents.Fields>
        </MenuComponents.Form>
    );
}
