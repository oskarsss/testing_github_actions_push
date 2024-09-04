import React from 'react';
import MenuComponents from '@/@core/ui-kits/menus';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useForm } from 'react-hook-form';
import TruckSelect from '@/@core/fields/select/truck-select/TruckSelect';
import FuelGrpcService from '@/@grpcServices/services/fuel.service';

type Props = {
    fuelTransactionId: string;
};

export const useAssignFuelMenu = menuHookFabric(AssignFuelMenu);

type DefaultValues = {
    truck_id: string;
    trailer_id: string;
};

function AssignFuelMenu({ fuelTransactionId }: Props) {
    const assignMenu = useAssignFuelMenu(true);

    const [unassignTruck, { isLoading }] = FuelGrpcService.useAssignTruckMutation();
    const {
        control,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm<DefaultValues>({
        defaultValues: {
            truck_id: ''
        }
    });

    const onSubmit = (data: DefaultValues) => {
        unassignTruck({
            fuelTransactionId,
            truckId: data.truck_id
        }).then(() => {
            assignMenu.close();
        });
    };

    return (
        <MenuComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <MenuComponents.FormHeader text="modals:fuels.assign_truck.title" />
            <MenuComponents.Fields>
                <MenuComponents.Field xs={12}>
                    <TruckSelect
                        name="truck_id"
                        control={control}
                    />
                </MenuComponents.Field>
                <MenuComponents.ActionsWrapper>
                    <MenuComponents.CancelButton onCancel={assignMenu.close} />
                    <MenuComponents.SubmitButton
                        disabled={isLoading}
                        text="common:button.assign"
                        loading={isLoading}
                    />
                </MenuComponents.ActionsWrapper>
            </MenuComponents.Fields>
        </MenuComponents.Form>
    );
}
