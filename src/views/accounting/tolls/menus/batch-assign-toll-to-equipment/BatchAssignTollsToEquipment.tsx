import MenuComponents from '@/@core/ui-kits/menus';
import TollsGrpcService from '@/@grpcServices/services/tolls.service';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AssignTollToEquipmentFields from '@/views/accounting/tolls/menus/assign-toll-to-equipment/AssignTollToEquipmentFields';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    tollIds: string[];
    onSuccesBatchAssign?: () => void;
};

export const useBatchAssignTollsToEquipmentMenu = menuHookFabric(BatchAssignTollsToEquipment);

type DefaultValues = {
    truck_id: string;
    trailer_id: string;
};

function BatchAssignTollsToEquipment({
    tollIds,
    onSuccesBatchAssign
}: Props) {
    const { t } = useAppTranslation();
    const [assign, { isLoading }] = TollsGrpcService.useBatchAssignTollsToEquipmentMutation();
    const [selectedEntity, setSelectedEntity] = useState<'truck' | 'trailer'>('truck');
    const assignMenu = useBatchAssignTollsToEquipmentMenu(true);
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
        assign({
            tollIds,
            equipment: {
                ...(selectedEntity === 'truck'
                    ? {
                        oneofKind: 'truckID',
                        truckID  : data.truck_id
                    }
                    : {
                        oneofKind: 'trailerID',
                        trailerID: data.trailer_id
                    })
            }
        })
            .unwrap()
            .then(() => {
                onSuccesBatchAssign?.();
                assignMenu.close();
            });
    };

    return (
        <MenuComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <MenuComponents.FormHeader
                text="modals:tolls.batch_assign.title"
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
