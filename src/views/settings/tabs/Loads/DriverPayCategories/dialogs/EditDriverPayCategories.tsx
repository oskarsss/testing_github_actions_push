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
import LoadsTypes from '@/store/dispatch/loads/types';
import { reset_config } from '@/configs/reset-from-config';
import LoadDriverPayItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-driver-pay-item-categories.service';

export const useEditDriverPayCategoryDialog = hookFabric(EditDriverPayCategory);

type Props = {
    item: LoadsTypes.DriverPayItemCategory;
};
export default function EditDriverPayCategory({ item }: Props) {
    const dialog = useEditDriverPayCategoryDialog(true);

    const { data } = LoadDriverPayItemCategoriesGrpcService.useGetDriverPayItemCategoriesQuery({});

    const [updateCategory, { isLoading }] =
        LoadDriverPayItemCategoriesGrpcService.useUpdateDriverPayCategoryMutation();

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
                        return item.name === value || !isNameExist;
                    })
            }),
        [data, item.name]
    );

    const values = {
        name: item.name
    };

    const methods = useForm<DefaultValues>({
        values,
        resolver: yupResolver<DefaultValues>(validationSchema)
    });

    const submit = (body: DefaultValues) => {
        updateCategory({
            driverPayItemCategoryId: item.driverPayItemCategoryId,
            name                   : body.name
        })
            .unwrap()
            .then(() => {
                dialog.close();
                methods.reset(default_values, reset_config);
            });
    };

    return (
        <DriverPayCategoriesForm
            title="modals:settings.loads.driver_pay_categories.edit.title"
            methods={methods}
            submit={submit}
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="update"
                submitDisabled={!methods.formState.isDirty}
            />
        </DriverPayCategoriesForm>
    );
}
