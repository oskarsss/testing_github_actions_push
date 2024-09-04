/* eslint-disable max-len */
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useCategories } from '@/store/accounting/settlements/hooks/recurring-transactions';
import {
    SettlementTransactionCategoryModel_EntityType,
    SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency,
    SettlementTransactionCategoryModel_Type
} from '@proto/models/model_settlement.transaction_category';
import SettlementTransactionCategoriesGrpcService from '@/@grpcServices/services/settlements-service/settlement-transaction-catogories.service';
import { DefaultValues, schema } from './helpers';
import CategoryDialogForm from './CategoryDialogForm';

type Props = {
    type: SettlementTransactionCategoryModel_Type;
};

export const useAddCategoryDialog = hookFabric(AddCategoryDialog);

export default function AddCategoryDialog({ type }: Props) {
    const dialog = useAddCategoryDialog(true);
    const { categories } = useCategories(type);

    const [createCategory, { isLoading }] =
        SettlementTransactionCategoriesGrpcService.endpoints.createCategory.useMutation();

    const defaultValues: DefaultValues = {
        type,
        name       : '',
        entityType : SettlementTransactionCategoryModel_EntityType.DRIVER,
        driverTypes: [],
        required   : false,
        recurring  : false,
        recurringTransactionCyclePeriodFrequency:
            SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency.EVERY_PERIOD
    };

    const validationSchema = useMemo(
        () =>
            schema.shape({
                name: yup
                    .string()
                    .required()
                    .test('unique', 'Category with this name already exists', (value) => {
                        const isNameExist = categories.some(({ name }) => name === value);
                        return !isNameExist;
                    })
            }),
        [categories]
    );

    const methods = useForm<DefaultValues>({
        defaultValues,
        resolver: yupResolver<DefaultValues>(validationSchema)
    });

    const submit = (body: DefaultValues) => {
        createCategory({ ...body })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <CategoryDialogForm
            methods={methods}
            submit={submit}
            title={
                type === SettlementTransactionCategoryModel_Type.CREDIT
                    ? 'modals:settings.settlements.credit_categories.add.title'
                    : 'modals:settings.settlements.debit_categories.add.title'
            }
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="create"
                submitDisabled={!methods.formState.isDirty}
            />
        </CategoryDialogForm>
    );
}
