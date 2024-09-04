import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import InvoiceItemCategoryForm from '@/views/settings/tabs/Loads/InvoiceItemCategories/dialogs/InvoiceItemCategoryForm';
import LoadInvoiceItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-invoice-item-categories.service';
import { default_values, DefaultValues } from './helpers';

export const useAddInvoiceItemCategoryDialog = hookFabric(AddInvoiceItemCategory);

type Props = {
    onAdd?: (id: string) => void;
    values?: DefaultValues;
};

function AddInvoiceItemCategory({
    onAdd,
    values
}: Props) {
    const dialog = useAddInvoiceItemCategoryDialog(true);

    const { data } = LoadInvoiceItemCategoriesGrpcService.useGetInvoiceItemCategoriesQuery({});

    const [addCategory, { isLoading }] =
        LoadInvoiceItemCategoriesGrpcService.useAddInvoiceItemCategoryMutation();

    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                name: yup
                    .string()
                    .required()
                    .test('unique', 'Category with this name already exists', (value) => {
                        const isNameExist = data?.invoiceItemCategories.some(
                            ({ name }) => name === value
                        );
                        return !isNameExist;
                    }),
                required               : yup.boolean().defined(),
                include_in_gross_amount: yup.boolean().defined()
            }),
        [data]
    );

    const methods = useForm<DefaultValues>({
        defaultValues: default_values,
        resolver     : yupResolver<DefaultValues>(validationSchema)
    });

    useEffect(() => {
        if (values) {
            methods.setValue('name', values.name, { shouldValidate: true });
            methods.setValue('required', values.required, { shouldValidate: true });
        }
    }, [values]);

    const submit = (body: DefaultValues) => {
        addCategory({
            includeInGrossAmount: body.include_in_gross_amount,
            name                : body.name,
            required            : body.required
        })
            .unwrap()
            .then((res) => {
                if (onAdd) {
                    onAdd(res.invoiceItemCategoryId);
                }
                dialog.close();
                methods.reset(default_values);
            });
    };

    return (
        <InvoiceItemCategoryForm
            title="modals:settings.loads.invoice_item_categories.add.title"
            methods={methods}
            submit={submit}
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="create"
                submitDisabled={!methods.formState.isDirty}
            />
        </InvoiceItemCategoryForm>
    );
}
