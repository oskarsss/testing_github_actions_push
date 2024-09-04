import { Typography } from '@mui/material';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import DateInput from '@/@core/fields/inputs/DateInput';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import moment from 'moment-timezone';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const useEditSettlementPayDateDialog = hookFabric(EditSettlementPayDateDialog, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="346px"
        turnOffCloseButton
        {...props}
    />
));

type FormValues = {
    payDate: string;
};

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
    payDate: yup
        .string()
        .test('date_is_valid', 'Date is not valid', (value) => {
            if (!value) return true;
            return moment.utc(value).isValid();
        })
        .test('min_date_test', 'Date is too early', (value) => {
            if (!value) return true;
            const MIN_VALID_DATE = moment.utc('1960-01-01');
            return moment.utc(value).isSameOrAfter(MIN_VALID_DATE);
        })
        .required()
});

type Props = {
    cycleId: string;
    periodId: string;
    settlementId: string;
    payDate: string;
};

function EditSettlementPayDateDialog({
    cycleId,
    periodId,
    settlementId,
    payDate
}: Props) {
    const dialog = useEditSettlementPayDateDialog(true);
    const { t } = useAppTranslation();

    const [updateSettlement, { isLoading }] =
        SettlementsGrpcService.useUpdateSettlementPayDateMutation();

    const onUpdateDate = (data: FormValues) => {
        updateSettlement({
            cycleId,
            periodId,
            settlementId,
            payDate: moment(data.payDate).format('MM/DD/YYYY')
        })
            .unwrap()
            .then(dialog.close);
    };

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty,
            isValid
        }
    } = useForm<FormValues>({
        defaultValues: { payDate },
        resolver     : yupResolver(schema)
    });

    return (
        <DialogComponents.Form
            onSubmit={handleSubmit(onUpdateDate)}
            style={{
                display      : 'flex',
                flexDirection: 'column',
                gap          : '0.75rem'
            }}
        >
            <Typography
                fontWeight={600}
                fontSize="18px"
            >
                {t('modals:settlements.edit_pay_date.title')}
            </Typography>
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <DateInput
                        required
                        control={control}
                        errors={errors}
                        label="modals:settlements.edit_pay_date.label"
                        name="payDate"
                        width="100%"
                        type="date"
                        testID="editSettlementForm.pay_date"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    disabled={!isDirty || !isValid}
                    loading={isLoading}
                    text="common:button.confirm"
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
