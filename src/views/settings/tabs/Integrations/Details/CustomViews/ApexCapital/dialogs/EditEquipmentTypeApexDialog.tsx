import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import { EquipmentTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/types';
import IntegrationApexCapitalGrpcService from '@/@grpcServices/services/integrations-apexcapital.service';

export const useEditEquipmentTypeApexDialog = hookFabric(EditEquipmentTypeApexDialog);

type Props = {
    row: EquipmentTabData;
};

type DefaultValues = {
    apexCapitalId: string;
};

function EditEquipmentTypeApexDialog({ row }: Props) {
    const dialog = useEditEquipmentTypeApexDialog(true);
    const [UpdateApexCapitalEquipmentType, { isLoading }] =
        IntegrationApexCapitalGrpcService.useUpdateApexCapitalEquipmentTypeMutation();

    const { data: apexCapitalEquipments } =
        IntegrationApexCapitalGrpcService.useGetApexCapitalEquipmentsQuery({});

    const {
        control,
        formState: { isDirty },
        handleSubmit
    } = useForm<DefaultValues>({
        values: {
            apexCapitalId: row.apex_capital_id
        }
    });

    const submit = (body: DefaultValues) => {
        UpdateApexCapitalEquipmentType({
            apexEquipmentId      : body.apexCapitalId,
            systemEquipmentTypeId: row.equipmentTypeId
        }).then(dialog.close);
    };

    const options: Option[] =
        apexCapitalEquipments?.equipments?.map((item) => ({
            name: item.name,
            id  : item.apexEquipmentId
        })) || [];

    const entities_by_id =
        apexCapitalEquipments?.equipments?.reduce((acc, item) => {
            acc[item.apexEquipmentId] = { name: item.name, id: item.apexEquipmentId };
            return acc;
        }, {} as Record<string, Option>) || {};

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title="modals:settings.integrations.edit.header.title"
                translationOptions={{
                    name: row.name
                }}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <CustomAutocomplete<DefaultValues>
                        label="modals:settings.integrations.edit.fields.apexCapitalId.label"
                        control={control}
                        name="apexCapitalId"
                        options={options}
                        entities_by_id={entities_by_id}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="update"
                submitDisabled={!isDirty}
            />
        </DialogComponents.Form>
    );
}
