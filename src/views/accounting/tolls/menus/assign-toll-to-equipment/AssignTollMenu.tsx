import MenuComponents from '@/@core/ui-kits/menus';
import TollsGrpcService from '@/@grpcServices/services/tolls.service';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AssignTollToEquipmentFields from '@/views/accounting/tolls/menus/assign-toll-to-equipment/AssignTollToEquipmentFields';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    tollId: string;
};

export const useAssignTollMenu = menuHookFabric(AssignTollMenu);

type DefaultValues = {
    truck_id: string;
    trailer_id: string;
};

function AssignTollMenu({ tollId }: Props) {
    const { t } = useAppTranslation();
    const [assign, { isLoading }] = TollsGrpcService.useAssignEquipmentMutation();
    const [selectedEntity, setSelectedEntity] = useState<'truck' | 'trailer'>('truck');
    const assignMenu = useAssignTollMenu(true);
    const {
        control,
        formState: { isDirty },
        setValue,
        handleSubmit
    } = useForm<DefaultValues>({
        defaultValues: {
            truck_id  : '',
            trailer_id: ''
        }
    });

    const onSubmit = (data: DefaultValues) => {
        if (selectedEntity === 'truck') {
            return assign({
                equipment: {
                    oneofKind: 'truckID',
                    truckID  : data.truck_id
                },
                tollID: tollId
            })
                .unwrap()
                .then(assignMenu.close);
        }
        assign({
            equipment: {
                oneofKind: 'trailerID',
                trailerID: data.trailer_id
            },
            tollID: tollId
        })
            .unwrap()
            .then(assignMenu.close);
    };

    return (
        <MenuComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <MenuComponents.FormHeader
                text="modals:tolls.assign_fleet.title"
                translateOptions={{ selectedEntity: t(`entity:${selectedEntity}`) }}
            />
            <AssignTollToEquipmentFields
                control={control}
                setValue={setValue}
                selectedEntity={selectedEntity}
                onClose={assignMenu.close}
                setSelectedEntity={setSelectedEntity}
                submitLoading={isLoading}
                submitDisabled={!isDirty}
            />
        </MenuComponents.Form>
    );
}
