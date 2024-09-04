import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@/@core/fields/inputs/TextInput';
import LoadDriverPayItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-driver-pay-item-categories.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { LoadDriverPayItemCategoryAddRequest } from '@proto/load_driver_pay_item_categories';

const default_values: LoadDriverPayItemCategoryAddRequest = {
    name: ''
};

const schema: yup.ObjectSchema<LoadDriverPayItemCategoryAddRequest> = yup.object().shape({
    name: yup.string().required('Name is required')
});

type Category = {
    id: string;
    name: string;
};

type Props = {
    onAdded: (id: string) => void;
    categories: Category[];
};

export const useAddPayItemCategoryDialog = hookFabric(AddIPayItemCategory);

export default function AddIPayItemCategory({
    onAdded,
    categories
}: Props) {
    const dialog = useAddPayItemCategoryDialog(true);
    const [addCategory, { isLoading }] =
        LoadDriverPayItemCategoriesGrpcService.useAddDriverPayCategoryMutation();

    const {
        handleSubmit,
        setError,
        control,
        formState: {
            errors,
            isDirty
        }
    } = useForm<LoadDriverPayItemCategoryAddRequest>({
        defaultValues: default_values,
        resolver     : yupResolver<LoadDriverPayItemCategoryAddRequest>(schema)
    });

    const submit = (body: LoadDriverPayItemCategoryAddRequest) => {
        const isCategoryExist = categories.some(
            (category) => category.name.toLowerCase() === body.name.trim().toLowerCase()
        );

        if (isCategoryExist) {
            return setError('name', {
                type   : 'manual',
                message: 'Category with this name already exists'
            });
        }

        addCategory({ name: body.name })
            .unwrap()
            .then((res) => {
                onAdded(res.driverPayItemCategoryId);
                dialog.close();
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="core:selects.driver_pay_items.dialog.add.header.title" />

            <DialogComponents.Field xs={12}>
                <TextInput
                    label="core:selects.driver_pay_items.dialog.add.fields.name.label"
                    required
                    name="name"
                    control={control}
                    errors={errors}
                    width="100%"
                    placeholder="core:selects.driver_pay_items.dialog.add.fields.name.placeholder"
                    autoFocus
                />
            </DialogComponents.Field>

            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                submitText="common:button.add"
                submitDisabled={!isDirty}
            />
        </DialogComponents.Form>
    );
}
