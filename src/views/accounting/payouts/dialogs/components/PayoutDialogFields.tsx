import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import { UseFormReturn } from 'react-hook-form';
import { DefaultValues } from '@/views/accounting/payouts/dialogs/helpers';
import PayoutStatusSelect from '@/@core/fields/select/PayoutStatusSelect';
import PayoutTypeSelect from '@/@core/fields/select/PayoutTypeSelect';
import PayoutDialogBankAccounts from '@/views/accounting/payouts/dialogs/components/bank-accounts/PayoutDialogBankAccounts';
import NumericInput from '@/@core/fields/inputs/NumericInput';

type Props = {
    methods: UseFormReturn<DefaultValues>;
    disabledChange?: boolean;
};

export default function PayoutDialogFields({
    methods,
    disabledChange
}: Props) {
    const {
        control,
        formState: { errors }
    } = methods;
    return (
        <DialogComponents.Fields
            sx={{ overflow: 'hidden', flexDirection: 'column', flexWrap: 'nowrap' }}
        >
            <DialogComponents.Field xs={12}>
                <NumericInput
                    required
                    control={control}
                    name="amount"
                    label="fields:amount.label"
                    placeholder="fields:amount.placeholder"
                    disabled={disabledChange}
                    allowNegative={false}
                    startAdornment="$"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={12}>
                <TextInput
                    required
                    control={control}
                    errors={errors}
                    label="modals:payouts.field.referenceId.label"
                    name="referenceId"
                    width="100%"
                    placeholder="modals:payouts.field.referenceId.placeholder"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={12}>
                <PayoutStatusSelect
                    control={control}
                    name="status"
                    required
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={12}>
                <PayoutTypeSelect
                    control={control}
                    disabled={disabledChange}
                    name="type"
                    required
                />
            </DialogComponents.Field>

            <PayoutDialogBankAccounts
                control={control}
                disabledChange={disabledChange}
            />
        </DialogComponents.Fields>
    );
}
