import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useForm } from 'react-hook-form';
import PayoutsGrpcService from '@/@grpcServices/services/payouts.service';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    checkPayoutStatusToDisableFields,
    checkPayoutTypeForRequiredBankField,
    defaultValues,
    DefaultValues,
    schema
} from '@/views/accounting/payouts/dialogs/helpers';
import PayoutDialogFields from '@/views/accounting/payouts/dialogs/components/PayoutDialogFields';

export const useEditPayoutDialog = hookFabric(EditPayoutDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        paperStyle={{ overflow: 'hidden' }}
        maxWidth="400px"
    />
));

type Props = {
    payoutId: string;
} & DefaultValues;

function EditPayoutDialog({
    payoutId,
    ...dataValues
}: Props) {
    const payoutDialog = useEditPayoutDialog(true);

    const [updatePayout, { isLoading }] = PayoutsGrpcService.useUpdatePayoutMutation();

    const methods = useForm<DefaultValues>({
        defaultValues,
        values  : dataValues,
        resolver: yupResolver<DefaultValues>(schema)
    });

    const {
        handleSubmit,
        formState: {
            isValid,
            isDirty
        }
    } = methods;

    const submit = (data: DefaultValues) => {
        updatePayout({
            payoutId,
            amount       : data.amount,
            referenceId  : data.referenceId,
            status       : data.status,
            type         : data.type,
            bankAccountId: checkPayoutTypeForRequiredBankField(data.type) ? data.bankAccountId : ''
        })
            .unwrap()
            .then(payoutDialog.close);
    };

    const disabledChange = checkPayoutStatusToDisableFields(dataValues.status);

    return (
        <DialogComponents.Form
            onSubmit={handleSubmit(submit)}
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
            <DialogComponents.Header title="modals:payouts.edit.title" />
            {disabledChange && <DialogComponents.SubHeader text="modals:payouts.edit.sub_header" />}
            <PayoutDialogFields
                methods={methods}
                disabledChange={disabledChange}
            />
            <DialogComponents.DefaultActions
                submitDisabled={!isDirty || !isValid}
                onCancel={payoutDialog.close}
                submitLoading={isLoading}
                submitText="common:button.add"
            />
        </DialogComponents.Form>
    );
}
