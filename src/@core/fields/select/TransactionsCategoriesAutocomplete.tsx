import { useCategories } from '@/store/accounting/settlements/hooks/recurring-transactions';
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';
import { useMemo } from 'react';
import CustomAutocomplete from '@/@core/fields/select/components/CustomAutocomplete';
import { useAddRTCategoryDialog } from '@/views/accounting/recurring-transactions/menus/AddRTCategoryMenu';
import createMap from '@/utils/create-map';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';
import { TRANSACTION_CATEGORIES_TYPE_TO_ENUM } from '@/models/settlements/settlements-mappings';

type Props<TFieldValues extends FieldValues = FieldValues> = {
    control: Control<TFieldValues>;
    type?: 'debit' | 'credit';
    label: IntlMessageKey;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
};

export default function TransactionsCategoriesAutocomplete<
    TFieldValues extends FieldValues = FieldValues
>({
    control,
    label,
    type = 'debit',
    disabled = false,
    readOnly = false,
    required = false
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const {
        field: { onChange }
    } = useController({
        name: 'transaction_category_id' as Path<TFieldValues>,
        control
    });
    const { categories } = useCategories(TRANSACTION_CATEGORIES_TYPE_TO_ENUM[type]);

    const AddRTCategoryDialog = useAddRTCategoryDialog();

    const categories_options = useMemo(
        () =>
            categories
                .filter((transaction) => !transaction.deleted)
                .map((category) => ({
                    name: category.name,
                    id  : category.transactionCategoryId
                })),
        [categories]
    );

    const categories_by_id = useMemo(
        () => createMap(categories_options, 'id'),
        [categories_options]
    );

    const setCreatedCategory = (
        category_id: string,
        category_type: SettlementTransactionCategoryModel_Type
    ) => {
        if (category_type === TRANSACTION_CATEGORIES_TYPE_TO_ENUM[type]) {
            onChange(category_id);
        }
    };

    const openAddCategoryDialog = () => {
        AddRTCategoryDialog.open({
            onAdded      : setCreatedCategory,
            defaultValues: {
                type: TRANSACTION_CATEGORIES_TYPE_TO_ENUM[type]
            }
        });
    };

    return (
        <CustomAutocomplete
            control={control}
            name={'transaction_category_id' as Path<TFieldValues>}
            label={readOnly ? 'core:selects.transaction_category.read_only_label' : label}
            labelOption={readOnly ? { label: t(label) } : {}}
            readOnly={readOnly}
            options={categories_options}
            entities_by_id={categories_by_id}
            onAdd={openAddCategoryDialog}
            disabled={disabled}
            required={required}
        />
    );
}
