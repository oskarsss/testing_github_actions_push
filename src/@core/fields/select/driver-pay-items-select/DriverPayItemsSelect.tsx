import { type FieldValues, type Path, useController } from 'react-hook-form';
import { type MouseEvent, useMemo } from 'react';
import CustomAutocomplete from '@/@core/fields/select/components/CustomAutocomplete';
import { useDriverPayItemCategories } from '@/store/dispatch/loads/hooks';
import type { CustomInputProps } from '@/@core/fields/select/ColorSelect';
import LoadDriverPayItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-driver-pay-item-categories.service';
import { useAddPayItemCategoryDialog } from '@/@core/fields/select/driver-pay-items-select/dialogs/AddIPayItemCategory';
import createMap from '@/utils/create-map';

export default function DriverPayItemsSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    required = false
}: CustomInputProps<TFieldValues>) {
    const categories = useDriverPayItemCategories();

    const [createItem] = LoadDriverPayItemCategoriesGrpcService.useAddDriverPayCategoryMutation();
    const addPayItemCategoryDialog = useAddPayItemCategoryDialog();
    const {
        field: { onChange }
    } = useController({
        name: 'category_id' as Path<TFieldValues>,
        control
    });

    const categories_options = useMemo(
        () =>
            categories
                .filter((category) => !category.deleted)
                .map((category) => ({
                    id  : category.driverPayItemCategoryId,
                    name: category.name
                })),
        [categories]
    );

    const categories_by_id = useMemo(
        () => createMap(categories_options, 'id'),
        [categories_options]
    );

    const setCreatedCategory = (id: string) => {
        onChange(id);
    };

    const createCategory = (_: MouseEvent<HTMLDivElement>, value: string) => {
        createItem({
            name: value
        })
            .unwrap()
            .then((res) => {
                onChange(res.driverPayItemCategoryId);
            });
    };

    const handleAddPayItem = () =>
        addPayItemCategoryDialog.open({
            onAdded   : setCreatedCategory,
            categories: categories_options
        });

    return (
        <CustomAutocomplete
            control={control}
            name={'category_id' as Path<TFieldValues>}
            label="entity:categories"
            options={categories_options}
            entities_by_id={categories_by_id}
            onAdd={handleAddPayItem}
            entity="category"
            required={required}
            onCreate={createCategory}
        />
    );
}
