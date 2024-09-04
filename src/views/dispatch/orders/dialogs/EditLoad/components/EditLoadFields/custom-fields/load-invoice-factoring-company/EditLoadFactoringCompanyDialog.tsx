import React from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { FormControl, Typography } from '@mui/material';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FactoringCompanySelect from '@/@core/fields/select/FactoringCompanySelect';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const useEditLoadFactoringCompanyDialog = hookFabric(
    EditLoadFactoringCompanyDialog,
    (props) => (
        <DialogComponents.DialogWrapper
            maxWidth="346px"
            turnOffCloseButton
            {...props}
        />
    )
);

type DefaultValues = {
    invoiceFactoringCompanyId: string;
};

const schema: ObjectSchema<DefaultValues> = yup.object().shape({
    invoiceFactoringCompanyId: yup.string().defined()
});

type Props = {
    invoiceFactoringCompanyId: string;
    loadId: string;
};

export default function EditLoadFactoringCompanyDialog({
    invoiceFactoringCompanyId,
    loadId
}: Props) {
    const dialog = useEditLoadFactoringCompanyDialog(true);
    const [update, updateState] = LoadsGrpcService.useUpdateLoadInvoiceFactoringCompanyMutation();
    const { t } = useAppTranslation('modals');

    const {
        control,
        handleSubmit,
        formState: { isDirty }
    } = useForm<DefaultValues>({
        defaultValues: { invoiceFactoringCompanyId },
        values       : { invoiceFactoringCompanyId },
        resolver     : yupResolver(schema)
    });

    const onConfirmHandler = (data: DefaultValues) => {
        update({
            loadId,
            invoiceFactoringCompanyId: data.invoiceFactoringCompanyId
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
                {t('loads.edit_load.fields.dialog_titles.factoring_company')}
            </Typography>
            <FormControl style={{ width: '100%' }}>
                <FactoringCompanySelect
                    control={control}
                    name="invoiceFactoringCompanyId"
                    variant="filled"
                    width="100%"
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
