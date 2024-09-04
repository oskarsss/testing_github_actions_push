import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import LoadsTypes from '@/store/dispatch/loads/types';
import { reset_config } from '@/configs/reset-from-config';
import InvoiceItemCategoryForm from '@/views/settings/tabs/Loads/InvoiceItemCategories/dialogs/InvoiceItemCategoryForm';
import LoadInvoiceItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-invoice-item-categories.service';
import { default_values, DefaultValues } from './helpers';

export const useEditInvoiceItemCategoryDialog = hookFabric(EditInvoiceItemCategory);

type Props = {
    item: LoadsTypes.InvoiceItemCategory;
    onEdit?: () => void;
};

function EditInvoiceItemCategory({
    item,
    onEdit
}: Props) {
    const dialog = useEditInvoiceItemCategoryDialog(true);

    const { data } = LoadInvoiceItemCategoriesGrpcService.useGetInvoiceItemCategoriesQuery({});

    const [updateCategory, { isLoading }] =
        LoadInvoiceItemCategoriesGrpcService.useUpdateInvoiceItemCategoryMutation();

    const validationSchema: yup.ObjectSchema<DefaultValues> = useMemo(
        () =>
            yup.object().shape({
                name: yup
                    .string()
                    .required()
                    .test('unique', 'Category with this name already exists', (value) => {
                        const isNameExist = data?.invoiceItemCategories.some(
                            ({ name }) => name === value
                        );
                        return item.name === value || !isNameExist;
                    }),
                required               : yup.boolean().defined(),
                include_in_gross_amount: yup.boolean().defined()
            }),
        [data, item.name]
    );

    const values: DefaultValues = {
        name                   : item.name,
        required               : item.required,
        include_in_gross_amount: item.includeInGrossAmount
    };

    const methods = useForm<DefaultValues>({
        values,
        resolver: yupResolver<DefaultValues>(validationSchema)
    });

    const submit = (body: DefaultValues) => {
        updateCategory({
            includeInGrossAmount : body.include_in_gross_amount,
            name                 : body.name,
            required             : body.required,
            invoiceItemCategoryId: item.invoiceItemCategoryId
        })
            .unwrap()
            .then(() => {
                dialog.close();
                if (onEdit) onEdit();
                methods.reset(default_values, reset_config);
            });
    };

    return (
        <InvoiceItemCategoryForm
            categoryId={item.invoiceItemCategoryId}
            title="modals:settings.loads.invoice_item_categories.edit.title"
            methods={methods}
            submit={submit}
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="update"
                submitDisabled={!methods.formState.isDirty}
            />
        </InvoiceItemCategoryForm>
    );
}
