import React from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { FormControl, Typography } from '@mui/material';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import InvoicingCompanySelect from '@/@core/fields/select/InvoicingCompanySelect';

export const useEditLoadInvoicingCompanyDialog = hookFabric(
    EditLoadInvoicingCompanyDialog,
    (props) => (
        <DialogComponents.DialogWrapper
            maxWidth="346px"
            turnOffCloseButton
            {...props}
        />
    )
);

type DefaultValues = {
    invoicingCompanyId: string;
};

const schema: ObjectSchema<DefaultValues> = yup.object().shape({
    invoicingCompanyId: yup.string().required('This field is required')
});

type Props = {
    invoicingCompanyId: string;
    orderId: string;
};

function EditLoadInvoicingCompanyDialog({
    invoicingCompanyId,
    orderId
}: Props) {
    const dialog = useEditLoadInvoicingCompanyDialog(true);
    const [update, updateState] = LoadsGrpcService.useUpdateOrderInvoicingCompanyMutation();
    const { t } = useAppTranslation('modals');

    const {
        control,
        handleSubmit,
        formState: {
            isDirty,
            errors
        }
    } = useForm<DefaultValues>({
        defaultValues: { invoicingCompanyId },
        values       : { invoicingCompanyId },
        resolver     : yupResolver(schema)
    });

    const onConfirmHandler = (data: DefaultValues) => {
        update({
            orderId,
            invoicingCompanyId: data.invoicingCompanyId
        })
            .unwrap()
            .then(() => {
                dialog.close();
            });
    };

    return (
        <DialogComponents.Form
            onSubmit={handleSubmit(onConfirmHandler)}
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
                {t('loads.edit_load.fields.dialog_titles.invoicing_company')}
            </Typography>
            <FormControl style={{ width: '100%' }}>
                <InvoicingCompanySelect
                    control={control}
                    errors={errors}
                    name="invoicingCompanyId"
                    variant="filled"
                    width="100%"
                    required
                />
            </FormControl>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    disabled={!isDirty}
                    loading={updateState.isLoading}
                    text="common:button.confirm"
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
