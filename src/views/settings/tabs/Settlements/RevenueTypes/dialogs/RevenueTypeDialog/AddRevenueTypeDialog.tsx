import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useActiveDocumentTypes } from '@/store/documents/hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { reset_config } from '@/configs/reset-from-config';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useRevenueTypes } from '@/store/accounting/settlements/hooks/revenue_type';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import RevenueTypesGrpcService from '@/@grpcServices/services/settlements-service/revenue-types.service';
import { DefaultValues, default_values, schema } from './helpers';
import RevenueTypeDialog from './RevenueTypeDialog';

export const useAddRevenueTypeDialog = hookFabric(AddRevenueTypeDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="500px"
    />
));

export default function AddRevenueTypeDialog() {
    const dialog = useAddRevenueTypeDialog(true);
    const { revenue_types } = useRevenueTypes();

    const [createRevenueType, { isLoading }] =
        RevenueTypesGrpcService.useCreateRevenueTypeMutation();

    const { documentTypes } = useActiveDocumentTypes();

    const chips_options: { id: string; title: string }[] = [...documentTypes]
        .filter((v) => v.entityType === DocumentModel_DocumentEntityType.LOAD)
        .map((el) => ({ title: el.title, id: el.documentTypeId }));

    const validationSchema = useMemo(
        () =>
            schema.shape({
                name: yup
                    .string()
                    .required()
                    .test('unique', 'Revenue type with this name already exists', (value) => {
                        const isNameExist = revenue_types.some((type) => type.name === value);
                        return !isNameExist;
                    })
            }),
        [revenue_types]
    );

    const methods = useForm<DefaultValues>({
        defaultValues: default_values,
        resolver     : yupResolver<DefaultValues>(validationSchema)
    });

    const submit = (body: DefaultValues) => {
        createRevenueType({
            name                 : body.name,
            deductFuel           : body.deduct_fuel,
            deductTolls          : body.deduct_tolls,
            attachDocumentTypeIds: body.attach_document_type_ids,
            default              : body.default
        })
            .unwrap()
            .then(() => {
                dialog.close();
                methods.reset(default_values, reset_config);
            });
    };

    return (
        <RevenueTypeDialog
            methods={methods}
            submit={submit}
            title="modals:settings.settlements.revenue_types.add.header.title"
            chips_options={chips_options}
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="create"
                submitDisabled={!methods.formState.isDirty}
            />
        </RevenueTypeDialog>
    );
}
