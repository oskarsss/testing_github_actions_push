import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useForm } from 'react-hook-form';
import PayoutsGrpcService from '@/@grpcServices/services/payouts.service';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    checkPayoutTypeForRequiredBankField,
    defaultValues,
    DefaultValues,
    schema
} from '@/views/accounting/payouts/dialogs/helpers';
import PayoutDialogFields from '@/views/accounting/payouts/dialogs/components/PayoutDialogFields';

export const useAddPayoutDialog = hookFabric(AddPayoutDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        paperStyle={{ overflow: 'hidden' }}
        maxWidth="400px"
    />
));

type Props = {
    entityType: string;
    entityId: string;
    settlementId: string;
};

function AddPayoutDialog({
    entityType,
    entityId,
    settlementId
}: Props) {
    const payoutDialog = useAddPayoutDialog(true);

    const [createPayout, { isLoading }] = PayoutsGrpcService.useCreatePayoutMutation();

    const methods = useForm<DefaultValues>({
        defaultValues,
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
        createPayout({
            ...data,
            entityId,
            entityType,
            settlementId,
            bankAccountId: checkPayoutTypeForRequiredBankField(data.type) ? data.bankAccountId : '',
            payoutBatchId: ''
        })
            .unwrap()
            .then(payoutDialog.close);
    };

    return (
        <DialogComponents.Form
            onSubmit={handleSubmit(submit)}
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
            <DialogComponents.Header title="modals:payouts.add.title" />
            <PayoutDialogFields methods={methods} />
            <DialogComponents.DefaultActions
                submitDisabled={!isDirty || !isValid}
                onCancel={payoutDialog.close}
                submitLoading={isLoading}
                submitText="common:button.add"
            />
        </DialogComponents.Form>
    );
}
