import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    default_values,
    DefaultValues
} from '@/views/settings/tabs/Loads/DriverPayCategories/dialogs/helpers';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import DriverPayCategoriesForm from '@/views/settings/tabs/Loads/DriverPayCategories/dialogs/DriverPayCategoriesForm';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { reset_config } from '@/configs/reset-from-config';
import LoadDriverPayItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-driver-pay-item-categories.service';

export const useAddDriverPayCategoryDialog = hookFabric(AddDriverPayCategory);

export default function AddDriverPayCategory() {
    const dialog = useAddDriverPayCategoryDialog(true);

    const { data } = LoadDriverPayItemCategoriesGrpcService.useGetDriverPayItemCategoriesQuery({});

    const [addCategory, { isLoading }] =
        LoadDriverPayItemCategoriesGrpcService.useAddDriverPayCategoryMutation();

    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                name: yup
                    .string()
                    .required()
                    .test('unique', 'Category with this name already exists', (value) => {
                        const isNameExist = data?.loadDriverPayItemCategories.some(
                            ({ name }) => name === value
                        );
                        return !isNameExist;
                    })
            }),
        [data]
    );

    const methods = useForm<DefaultValues>({
        defaultValues: default_values,
        resolver     : yupResolver<DefaultValues>(validationSchema)
    });

    const submit = (body: DefaultValues) => {
        addCategory(body)
            .unwrap()
            .then(() => {
                dialog.close();
                methods.reset(default_values, reset_config);
            });
    };

    return (
        <DriverPayCategoriesForm
            title="modals:settings.loads.driver_pay_categories.add.title"
            methods={methods}
            submit={submit}
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="create"
                submitDisabled={!methods.formState.isDirty}
            />
        </DriverPayCategoriesForm>
    );
}
