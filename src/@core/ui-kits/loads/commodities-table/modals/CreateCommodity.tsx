import React from 'react';
import { CommodityModel_PackagingUnit } from '@proto/models/model_commodity';
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
    loadId?: string;
};

export const useCreateCommodityDialog = hookFabric(CreateCommodity, (props) => (
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

export default function CreateCommodity({ loadId }: Props) {
    const [trigger, { isLoading }] = LoadCommoditiesGrpcService.useCreateCommodityMutation();
    const dialog = useCreateCommodityDialog(true);
    const methods = useForm<DefaultValues>({
        defaultValues: {
            description    : '',
            measurementUnit: MeasurementUnit.INCH,
            packagingUnit  : CommodityModel_PackagingUnit.BAG,
            quantity       : 0,
            length         : 0,
            weight         : 0,
            height         : 0,
            width          : 0,
            weightUnit     : WeightUnit.LB
        },
        resolver: yupResolver(schema)
    });

    const submit = async (data: DefaultValues) => {
        await trigger({
            description    : data.description,
            measurementUnit: data.measurementUnit,
            packagingUnit  : data.packagingUnit,
            quantity       : data.quantity,
            weightUnit     : data.weightUnit,
            loadId,
            weight         : data.weight,
            ...(data.width && {
                width: data.width
            }),
            ...(data.length && {
                length: data.length
            }),
            ...(data.height && {
                height: data.height
            })

            // width          : data.width

            // length         : data.length,
            // height         : data.height,
        });
        dialog.close();
    };

    return (
        <CommodityFields
            methods={methods}
            submit={submit}
        >
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    loading={isLoading}
                    disabled={!methods.formState.isValid || !methods.formState.isDirty}
                    type="create"
                />
            </DialogComponents.ActionsWrapper>
        </CommodityFields>
    );
}
