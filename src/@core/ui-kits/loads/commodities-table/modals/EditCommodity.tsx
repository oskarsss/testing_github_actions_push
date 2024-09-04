import React from 'react';
import { CommodityModel, CommodityModel_PackagingUnit } from '@proto/models/model_commodity';
import LoadCommoditiesGrpcService from '@/@grpcServices/services/loads-service/load-comodities.service';
import { MeasurementUnit } from '@proto/models/measurement_unit';
import { WeightUnit } from '@proto/models/weight_unit';
import { useForm } from 'react-hook-form';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CommodityFields, { DefaultValues } from './Fields';

type Props = {
    loadId: string;
    commodityId: string;
    item: CommodityModel;
};

export const useEditCommodityDialog = hookFabric(EditCommodity, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="570px"
        {...props}
    />
));
const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    description    : yup.string().required('common:validation.required'),
    measurementUnit: yup.number<MeasurementUnit>().required('common:validation.required'),
    packagingUnit  : yup
        .number<CommodityModel_PackagingUnit>()
        .required('common:validation.required'),
    quantity: yup
        .number()
        .min(1, 'common:validation.required')
        .required('common:validation.required'),
    weight: yup
        .number()
        .min(1, 'common:validation.required')
        .required('common:validation.required'),
    length    : yup.number().defined(),
    height    : yup.number().defined(),
    width     : yup.number().defined(),
    weightUnit: yup.number<WeightUnit>().required('common:validation.required')
});

export default function EditCommodity({
    loadId,
    commodityId,
    item
}: Props) {
    const [trigger, updateState] = LoadCommoditiesGrpcService.useUpdateCommodityMutation();
    const [deleteTrigger, deleteState] = LoadCommoditiesGrpcService.useDeleteCommodityMutation();

    const dialog = useEditCommodityDialog(true);
    const methods = useForm<DefaultValues>({
        defaultValues: {
            description    : item.description,
            measurementUnit: item.measurementUnit,
            packagingUnit  : item.packagingUnit,
            quantity       : item.quantity,
            length         : item.length || 0,
            weight         : item.weight,
            height         : item.height || 0,
            width          : item.width || 0,
            weightUnit     : item.weightUnit
        },
        resolver: yupResolver(schema)
    });

    const handleDelete = async () => {
        await deleteTrigger({ commodityId, loadId });
        dialog.close();
    };

    const submit = async (data: DefaultValues) => {
        await trigger({
            description    : data.description,
            measurementUnit: data.measurementUnit,
            packagingUnit  : data.packagingUnit,
            quantity       : data.quantity,
            weight         : data.weight,
            weightUnit     : data.weightUnit,

            // length         : data.length,

            // height         : data.height,
            // width          : data.width,
            commodityId,
            loadId,
            ...(data.width && {
                width: data.width
            }),
            ...(data.length && {
                length: data.length
            }),
            ...(data.height && {
                height: data.height
            })
        });
        dialog.close();
    };

    const {
        isValid,
        isDirty
    } = methods.formState;

    return (
        <CommodityFields
            methods={methods}
            submit={submit}
            commodityId={commodityId}
        >
            <DialogComponents.ActionsWrapper>
                <DialogComponents.DeleteButton
                    onClick={handleDelete}
                    loading={deleteState.isLoading}
                    disabled={updateState.isLoading}
                />
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    loading={updateState.isLoading}
                    type="update"
                    disabled={deleteState.isLoading || !isValid || !isDirty}
                />
            </DialogComponents.ActionsWrapper>
        </CommodityFields>
    );
}
