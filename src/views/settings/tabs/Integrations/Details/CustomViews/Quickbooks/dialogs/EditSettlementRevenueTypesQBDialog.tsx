import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { get_accounts_quickbooks_default_query } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Settlements/hook';
import createMap from '@/utils/create-map';
import InactiveItem from './InactiveItem';

export const useEditSettlementRevenueTypesQBDialog = hookFabric(EditSettlementRevenueTypesQBDialog);

type Props = {
    revenueTypeName: string;
    revenueTypeId: string;
    linkedToTotalLoadsAmountQBId?: string;
    linkedToFuelAmountQBId?: string;
    linkedToTollsAmountQBId?: string;
};

type DefaultValues = {
    linkedToTotalLoadsAmount: string;
    linkedToFuelAmount: string;
    linkedToTollsAmount: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    linkedToTotalLoadsAmount: yup.string().required('This field is required'),
    linkedToFuelAmount      : yup.string().required('This field is required'),
    linkedToTollsAmount     : yup.string().required('This field is required')
});

function EditSettlementRevenueTypesQBDialog({
    revenueTypeId,
    revenueTypeName,
    linkedToTotalLoadsAmountQBId = '',
    linkedToFuelAmountQBId = '',
    linkedToTollsAmountQBId = ''
}: Props) {
    const dialog = useEditSettlementRevenueTypesQBDialog(true);

    const [updateSettlementRevenueTypeQuickbooks, { isLoading }] =
        // eslint-disable-next-line max-len
        IntegrationQuickbooksGrpcService.useUpdateAccountSettlementRevenueTypeQuickbooksMutation();

    const { data: quickbooksItems } =
        IntegrationQuickbooksGrpcService.useGetAccountsQuickbooksQuery(
            get_accounts_quickbooks_default_query
        );

    const {
        control,
        formState: { isDirty },
        handleSubmit
    } = useForm<DefaultValues>({
        values: {
            linkedToTotalLoadsAmount: linkedToTotalLoadsAmountQBId,
            linkedToFuelAmount      : linkedToFuelAmountQBId,
            linkedToTollsAmount     : linkedToTollsAmountQBId
        },
        resolver: yupResolver(schema)
    });

    const submit = (body: DefaultValues) => {
        updateSettlementRevenueTypeQuickbooks({
            revenueTypeId,
            fuelAmountQuickbooksExpenseAccountId      : body.linkedToFuelAmount,
            tollsAmountQuickbooksExpenseAccountId     : body.linkedToTollsAmount,
            totalLoadsAmountQuickbooksExpenseAccountId: body.linkedToTotalLoadsAmount
        })
            .unwrap()
            .then(dialog.close);
    };

    const options: Option[] =
        quickbooksItems?.accounts?.map((item) => ({
            name         : item.name,
            id           : item.quickbooksAccountId,
            optionContent: !item.active ? <InactiveItem displayName={item.name} /> : null
        })) || [];

    const entities_by_id = createMap(options, 'id');

    const onUnlink = () => {
        submit({
            linkedToTotalLoadsAmount: '',
            linkedToFuelAmount      : '',
            linkedToTollsAmount     : ''
        });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title="modals:settings.integrations.edit.header.title"
                translationOptions={{
                    name: revenueTypeName
                }}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <CustomAutocomplete<DefaultValues>
                        required
                        label="modals:settings.integrations.edit.fields.quickbooks.gross"
                        labelOption={{ name: 'QuickBooks' }}
                        control={control}
                        name="linkedToTotalLoadsAmount"
                        options={options}
                        entities_by_id={entities_by_id}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CustomAutocomplete<DefaultValues>
                        required
                        label="modals:settings.integrations.edit.fields.quickbooks.fuel"
                        labelOption={{ name: 'QuickBooks' }}
                        control={control}
                        name="linkedToFuelAmount"
                        options={options}
                        entities_by_id={entities_by_id}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CustomAutocomplete<DefaultValues>
                        required
                        label="modals:settings.integrations.edit.fields.quickbooks.tolls"
                        labelOption={{ name: 'QuickBooks' }}
                        control={control}
                        name="linkedToTollsAmount"
                        options={options}
                        entities_by_id={entities_by_id}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>
                {!!linkedToTotalLoadsAmountQBId && (
                    <DialogComponents.DeleteButton
                        onClick={onUnlink}
                        loading={false}
                        text="common:button.unlink"
                    />
                )}
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    loading={isLoading}
                    type="update"
                    disabled={!isDirty}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
