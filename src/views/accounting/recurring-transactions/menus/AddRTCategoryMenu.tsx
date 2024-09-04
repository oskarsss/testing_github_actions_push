/* eslint-disable max-len */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMemo } from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DriverTypeTagsSelect from '@/@core/fields/select/DriverTypeTagsSelect';
import SettlementTransactionCategoriesGrpcService from '@/@grpcServices/services/settlements-service/settlement-transaction-catogories.service';
import {
    SettlementTransactionCategoryModel_EntityType,
    SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency,
    SettlementTransactionCategoryModel_Type
} from '@proto/models/model_settlement.transaction_category';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import SelectInput from '../../../../@core/fields/inputs/SelectInput';
import TextInput from '../../../../@core/fields/inputs/TextInput';
import CheckboxInput from '../../../../@core/fields/checkbox/CheckboxInput';

type DefaultValues = {
    name: string;
    required: boolean;
    recurring: boolean;
    driverTypes: string[];
    entityType: SettlementTransactionCategoryModel_EntityType;
    type: SettlementTransactionCategoryModel_Type;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    required   : yup.boolean().required(),
    recurring  : yup.boolean().required(),
    driverTypes: yup.array().of(yup.string().defined()).defined(),
    entityType : yup
        .number<SettlementTransactionCategoryModel_EntityType>()
        .min(1, 'Should be chosen at least 1')
        .required(),
    type: yup.number<SettlementTransactionCategoryModel_Type>().required(),
    name: yup.string().required('Should not be empty')
});

export const useAddRTCategoryDialog = hookFabric(AddRTCategoryDialog);

type Props = {
    onAdded?: (category_id: string, category_type: SettlementTransactionCategoryModel_Type) => void;
    defaultValues?: Partial<DefaultValues>;
};

function AddRTCategoryDialog({
    onAdded,
    defaultValues = {}
}: Props) {
    const { t } = useAppTranslation();
    const [createCategory, { isLoading }] =
        SettlementTransactionCategoriesGrpcService.endpoints.createCategory.useMutation();
    const dialog = useAddRTCategoryDialog(true);

    const {
        reset,
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: {
            name       : '',
            type       : SettlementTransactionCategoryModel_Type.DEBIT,
            entityType : SettlementTransactionCategoryModel_EntityType.DRIVER,
            driverTypes: [],
            required   : false,
            recurring  : false,
            ...defaultValues
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (body: DefaultValues) => {
        createCategory({
            recurringTransactionCyclePeriodFrequency:
                SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency.EVERY_PERIOD,
            ...body
        })
            .unwrap()
            .then((res) => {
                if (onAdded && res.settlementTransactionCategory) {
                    onAdded(
                        res.settlementTransactionCategory.transactionCategoryId,
                        res.settlementTransactionCategory.type
                    );
                }
                dialog.close().then(() => {
                    reset();
                });
            });
    };

    const {
        categoryTypesOptions,
        entityTypesOptions
    } = useMemo(() => {
        const entityTypesOptions = [
            {
                value: SettlementTransactionCategoryModel_EntityType.DRIVER,
                label: t('entity:driver')
            },
            {
                value: SettlementTransactionCategoryModel_EntityType.TRUCK,
                label: t('entity:truck')
            },
            {
                value: SettlementTransactionCategoryModel_EntityType.TRAILER,
                label: t('entity:trailer')
            }
        ];

        const categoryTypesOptions = [
            {
                value: SettlementTransactionCategoryModel_Type.DEBIT,
                label: t('common:transaction_type.debit')
            },
            {
                value: SettlementTransactionCategoryModel_Type.CREDIT,
                label: t('common:transaction_type.credit')
            }
        ];

        return { entityTypesOptions, categoryTypesOptions };
    }, [t]);

    return (
        <DialogComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <DialogComponents.Header title="modals:recurring_transactions.add_recurring_transactions.header.title" />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        name="name"
                        label="fields:name.label"
                        control={control}
                        errors={errors}
                        type="text"
                        placeholder="fields:name.placeholder"
                        width="100%"
                        autoFocus
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <SelectInput
                        name="type"
                        label="fields:type.label"
                        control={control}
                        errors={errors}
                        options={categoryTypesOptions}
                        width="100%"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <SelectInput
                        name="entityType"
                        label="modals:recurring_transactions.add_recurring_transactions.fields.entity_type.label"
                        control={control}
                        errors={errors}
                        options={entityTypesOptions}
                        width="100%"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <DriverTypeTagsSelect control={control} />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <CheckboxInput
                        name="required"
                        label="fields:required.label"
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <CheckboxInput
                        name="recurring"
                        label="modals:recurring_transactions.add_recurring_transactions.fields.recurring.label"
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.DefaultActions
                submitLoading={isLoading}
                type="create"
                onCancel={dialog.close}
                submitDisabled={!isDirty}
            />
        </DialogComponents.Form>
    );
}
