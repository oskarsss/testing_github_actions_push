/* eslint-disable max-len */
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useCategories } from '@/store/accounting/settlements/hooks/recurring-transactions';
import {
    SettlementTransactionCategoryModel_Category,
    SettlementTransactionCategoryModel_EntityType,
    SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency,
    SettlementTransactionCategoryModel_Type
} from '@proto/models/model_settlement.transaction_category';
import SettlementTransactionCategoriesGrpcService from '@/@grpcServices/services/settlements-service/settlement-transaction-catogories.service';
import CategoryDialogForm from './CategoryDialogForm';
import { DefaultValues, schema } from './helpers';

type Props = {
    type: SettlementTransactionCategoryModel_Type;
    category: SettlementTransactionCategoryModel_Category;
};

export const useEditCategoryDialog = hookFabric(EditCategoryDialog);

export default function EditCategoryDialog({
    type,
    category
}: Props) {
    const dialog = useEditCategoryDialog(true);
    const { categories } = useCategories(type);

    const [updateCategory, { isLoading }] =
        SettlementTransactionCategoriesGrpcService.endpoints.updateCategory.useMutation();

    const defaultValues: DefaultValues = {
        type,
        entityType : SettlementTransactionCategoryModel_EntityType.DRIVER,
        name       : '',
        driverTypes: [],
        required   : false,
        recurring  : false,
        recurringTransactionCyclePeriodFrequency:
            SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency.EVERY_PERIOD
    };

    const values: DefaultValues = useMemo(
        () => ({
            type,
            name       : category.name,
            entityType : category.entityType ?? '',
            driverTypes: category.driverTypes,
            required   : category.required,
            recurring  : category.recurring,

            recurringTransactionCyclePeriodFrequency:
                category.recurringTransactionCyclePeriodFrequency ?? ''
        }),
        [type, category]
    );

    const validationSchema = useMemo(
        () =>
            schema.shape({
                name: yup
                    .string()
                    .required()
                    .test('unique', 'Category with this name already exists', (value) => {
                        const isNameExist = categories.some(({ name }) => name === value);
                        return category.name === value || !isNameExist;
                    })
            }),
        [categories, category.name]
    );

    const methods = useForm<DefaultValues>({
        defaultValues,
        values,
        resolver: yupResolver<DefaultValues>(validationSchema)
    });

    const submit = (body: DefaultValues) => {
        updateCategory({
            settlementTransactionCategoryId: category.transactionCategoryId,
            ...body
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <CategoryDialogForm
            methods={methods}
            submit={submit}
            title={
                type === SettlementTransactionCategoryModel_Type.CREDIT
                    ? 'modals:settings.settlements.credit_categories.edit.title'
                    : 'modals:settings.settlements.debit_categories.edit.title'
            }
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="update"
                submitDisabled={!methods.formState.isDirty}
            />
        </CategoryDialogForm>
    );
}
