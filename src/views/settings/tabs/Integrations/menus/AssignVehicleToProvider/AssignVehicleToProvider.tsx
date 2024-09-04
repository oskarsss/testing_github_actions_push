import MenuComponents from '@/@core/ui-kits/menus';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { IntegrationProvider_Vehicles_Vehicle } from '@proto/integrations';
import TrailersSelect from '@/@core/fields/select/trailer-select/TrailersSelect';
import { yupResolver } from '@hookform/resolvers/yup';
import CommonTabs from '@/@core/ui-kits/basic/common-tabs/CommonTabs';
import TruckSelect from './truck-select/TruckSelect';

// set upd Menu use MenuComponents and set up TruckSelect and TrailerSelect by entity_type

export const useAssignVehicleToProviderMenu = menuHookFabric(MenuVehicle, {
    cleanContentOnClose: true
});

enum EntityType {
    TRUCK = 'truck',
    TRAILER = 'trailer'
}

type Props = {
    row: IntegrationProvider_Vehicles_Vehicle;
    provider_id: string;
};

type DefaultValues = {
    truck_id?: string;
    trailer_id?: string;
    entityType: string;
    entityId?: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    truck_id: yup.string().test('truck_id_test', 'Please select a truck.', (value, context) => {
        if (context.parent.entityType === EntityType.TRUCK) {
            return value !== '';
        }
        return true;
    }),
    trailer_id: yup
        .string()
        .test('trailer_id_test', 'Please select a trailer.', (value, context) => {
            if (context.parent.entityType === EntityType.TRAILER) {
                return value !== '';
            }
            return true;
        }),
    entityType: yup.string().required('Entity type is required'),
    entityId  : yup.string().defined()
});

function MenuVehicle({
    row,
    provider_id
}: Props) {
    const vehicleMenu = useAssignVehicleToProviderMenu(true);
    const [assignVehicle, { isLoading }] =
        IntegrationProviderGrpcService.useLinkVehicleIntegrationProviderMutation();

    const {
        control,
        handleSubmit,
        watch,
        setValue
    } = useForm<DefaultValues>({
        defaultValues: {
            truck_id  : row.entityId,
            trailer_id: row.entityId,
            entityType: row.entityType || EntityType.TRUCK,
            entityId  : row.entityId
        },
        resolver: yupResolver<DefaultValues>(schema)
    });

    const onSubmit = (data: DefaultValues) => {
        const vector_entity_id =
            data.entityType === EntityType.TRUCK ? data.truck_id : data.trailer_id;
        if (!vector_entity_id) return;
        assignVehicle({
            integrationProviderId: provider_id,
            vehicleReferenceId   : row.referenceId,
            vektorEntityType     : data.entityType,
            vektorEntityId       : vector_entity_id
        })
            .unwrap()
            .then(vehicleMenu.close);
    };

    const formEntityType = watch('entityType');
    const truck_id = watch('truck_id');
    const trailer_id = watch('trailer_id');

    const disabled_btn = formEntityType === EntityType.TRUCK ? !truck_id : !trailer_id;

    return (
        <MenuComponents.Form
            width="500px"
            onSubmit={handleSubmit(onSubmit)}
        >
            <MenuComponents.FormHeader
                text="modals:settings.integrations.vehicles.menu.assign.title"
                translateOptions={{
                    entityType: row.entityType
                }}
            />
            <MenuComponents.Fields>
                {!row.entityType && (
                    <MenuComponents.Field xs={12}>
                        <CommonTabs
                            value={formEntityType}
                            options={[
                                {
                                    label: 'entity:truck',
                                    value: 'truck'
                                },
                                {
                                    label: 'entity:trailer',
                                    value: 'trailer'
                                }
                            ]}
                            aria-label="assign vehicle type"
                            onChange={(event, value) => setValue('entityType', value)}
                        />
                    </MenuComponents.Field>
                )}
                <MenuComponents.Field xs={12}>
                    {formEntityType === 'truck' && <TruckSelect control={control} />}
                    {formEntityType === 'trailer' && (
                        <TrailersSelect
                            name="trailer_id"
                            control={control}
                        />
                    )}
                </MenuComponents.Field>
                <MenuComponents.ActionsWrapper>
                    <MenuComponents.CancelButton onCancel={vehicleMenu.close} />
                    <MenuComponents.SubmitButton
                        text="common:button.assign"
                        loading={isLoading}
                        disabled={disabled_btn}
                    />
                </MenuComponents.ActionsWrapper>
            </MenuComponents.Fields>
        </MenuComponents.Form>
    );
}
