import { PayoutModel_Status, PayoutModel_Type } from '@proto/models/model_payout';
import * as yup from 'yup';

export type DefaultValues = {
    amount: number;
    referenceId: string;
    bankAccountId: string;
    type: PayoutModel_Type;
    status: PayoutModel_Status;
};

export const checkPayoutTypeForRequiredBankField = (type: PayoutModel_Type) =>
    [PayoutModel_Type.ACH, PayoutModel_Type.WIRE].includes(type);

export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    amount       : yup.number().min(0.01, 'Minimum amount 0.01').required('Amount is required'),
    referenceId  : yup.string().trim().required('Reference ID is required'),
    bankAccountId: yup.string().defined(),
    type         : yup
        .number<PayoutModel_Type>()
        .test('payout_type_test', 'You need to select a bank.', (value, context) => {
            if (!value) return true;
            return !(checkPayoutTypeForRequiredBankField(value) && !context.parent.bankAccountId);
        })
        .required('Type is required'),
    status: yup.number<PayoutModel_Status>().required('Status is required')
});

export const defaultValues: DefaultValues = {
    amount       : 0,
    referenceId  : '',
    bankAccountId: '',
    type         : PayoutModel_Type.ACH,
    status       : PayoutModel_Status.PENDING
};

export const checkPayoutStatusToDisableFields = (status: PayoutModel_Status) =>
    [PayoutModel_Status.SUCCEEDED, PayoutModel_Status.FAILED].includes(status);
