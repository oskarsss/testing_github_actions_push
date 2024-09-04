import { FieldValues, Path, useController } from 'react-hook-form';
import { MouseEvent, useCallback, useMemo } from 'react';
import CustomAutocomplete, {
    Option,
    OptionObjects
} from '@/@core/fields/select/components/CustomAutocomplete';
import { useActiveInvoiceItemCategories } from '@/store/dispatch/loads/hooks';
import { CustomInputProps } from '@/@core/fields/select/ColorSelect';
import { useAddInvoiceItemCategoryDialog } from '@/views/settings/tabs/Loads/InvoiceItemCategories/dialogs/AddInvoiceItemCategory';
import { Stack } from '@mui/material';
import { useEditInvoiceItemCategoryDialog } from '@/views/settings/tabs/Loads/InvoiceItemCategories/dialogs/EditInvoiceItemCategory';
import { LoadInvoiceItemCategoriesGetReply_LoadInvoiceItemCategory } from '@proto/load_invoice_item_categories';
import { useLoadInvoiceCategoriesMap } from '@/store/hash_maps/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ControlledGrossLabel from './ControlledGrossLabel';
import GrossMarker from './GrossMarker';

export default function InvoiceItemsSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    required = false
}: CustomInputProps<TFieldValues>) {
    const { t } = useAppTranslation();
    const categories = useActiveInvoiceItemCategories();
    const addCategoryDialog = useAddInvoiceItemCategoryDialog();
    const invoiceItemCategoriesMap = useLoadInvoiceCategoriesMap();

    const {
        field: {
            onChange,
            value
        }
    } = useController({
        name: 'category_id' as Path<TFieldValues>,
        control
    });

    const editCategoryDialog = useEditInvoiceItemCategoryDialog();

    const openEditDialog = useCallback(
        (
            event: MouseEvent<HTMLButtonElement>,
            category: LoadInvoiceItemCategoriesGetReply_LoadInvoiceItemCategory
        ) => {
            event.stopPropagation();
            event.preventDefault();
            editCategoryDialog.open({
                item  : category,
                onEdit: () => onChange(category.invoiceItemCategoryId)
            });
        },
        [editCategoryDialog, onChange]
    );

    const categories_options: Option[] = useMemo(
        () =>
            categories.map((category) => ({
                id           : category.invoiceItemCategoryId,
                name         : category.name,
                optionContent: (
                    <GrossMarker
                        category={invoiceItemCategoriesMap[category.invoiceItemCategoryId]}
                        onClick={openEditDialog}
                    />
                )
            })),
        [categories, invoiceItemCategoriesMap, openEditDialog]
    );

    const categories_by_id = useMemo(() => {
        const categories_object: OptionObjects = {};

        categories_options.forEach((category) => {
            categories_object[category.id] = category;
        });

        return categories_object;
    }, [categories_options]);

    const setCreatedCategory = (id: string) => {
        onChange(id);
    };

    const onAdd = () => {
        addCategoryDialog.open({
            onAdd: setCreatedCategory
        });
    };

    const createCategory = (e: MouseEvent<HTMLDivElement>, value: string) => {
        addCategoryDialog.open({
            onAdd : setCreatedCategory,
            values: {
                name                   : value,
                required               : false,
                include_in_gross_amount: false
            }
        });
    };

    return (
        <Stack position="relative">
            <CustomAutocomplete
                control={control}
                required={required}
                name={'category_id' as Path<TFieldValues>}
                label="entity:category"
                options={categories_options}
                entities_by_id={categories_by_id}
                onAdd={onAdd}
                entity="category"
                onCreate={createCategory}
                CustomInfoComponent={<ControlledGrossLabel value={value} />}
            />
        </Stack>
    );
}
