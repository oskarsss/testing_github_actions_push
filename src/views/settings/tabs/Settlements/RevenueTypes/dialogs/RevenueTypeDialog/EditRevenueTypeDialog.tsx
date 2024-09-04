import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useActiveDocumentTypes } from '@/store/documents/hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { reset_config } from '@/configs/reset-from-config';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import SettlementsTypes from '@/store/accounting/settlements/types';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useRevenueTypes } from '@/store/accounting/settlements/hooks/revenue_type';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import RevenueTypesGrpcService from '@/@grpcServices/services/settlements-service/revenue-types.service';
import { DefaultValues, default_values, schema } from './helpers';
import RevenueTypeDialog from './RevenueTypeDialog';

type Props = {
    type: SettlementsTypes.RevenueTypes.RevenueType;
};

export const useEditRevenueTypeDialog = hookFabric(EditRevenueTypeDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="500px"
    />
));

export default function EditRevenueTypeDialog({ type }: Props) {
    const { t } = useAppTranslation();
    const dialog = useEditRevenueTypeDialog(true);
    const { revenue_types } = useRevenueTypes();

    const [updateRevenueType, { isLoading }] =
        RevenueTypesGrpcService.useUpdateRevenueTypeMutation();

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
                        return type.name === value || !isNameExist;
                    })
            }),
        [revenue_types, type.name]
    );

    const attach_document_type_ids =
        chips_options
            .filter(({ id }) => type?.attachDocumentTypeIds.includes(id))
            .map(({ id }) => id) || [];

    const values: DefaultValues = {
        name        : type.name,
        deduct_fuel : type.deductFuel,
        deduct_tolls: type.deductTolls,
        default     : type.default,
        attach_document_type_ids
    };

    const methods = useForm<DefaultValues>({
        values,
        resolver: yupResolver(validationSchema)
    });

    const submit = (body: DefaultValues) => {
        updateRevenueType({
            revenueTypeId        : type?.revenueTypeId,
            name                 : body.name,
            deductFuel           : body.deduct_fuel,
            deductTolls          : body.deduct_tolls,
            default              : body.default,
            attachDocumentTypeIds: body.attach_document_type_ids
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
            title="modals:settings.settlements.revenue_types.edit.header.title"
            translationOptions={{ typeName: type.name }}
            chips_options={chips_options}
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="update"
                submitDisabled={!methods.formState.isDirty}
            />
        </RevenueTypeDialog>
    );
}
