import React from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { FormControl, Typography } from '@mui/material';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import DispatcherSelect from '@/@core/fields/select/dispatcher-select/DispatcherSelect';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const useEditLoadDispatcherDialog = hookFabric(EditLoadDispatcherDialog, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="346px"
        turnOffCloseButton
        {...props}
    />
));

type DefaultValues = {
    dispatcherId: string;
};

const schema: ObjectSchema<DefaultValues> = yup.object().shape({
    dispatcherId: yup.string().defined()
});

type Props = {
    dispatcherId: string;
    loadId: string;
};

export default function EditLoadDispatcherDialog({
    dispatcherId,
    loadId
}: Props) {
    const dialog = useEditLoadDispatcherDialog(true);
    const [update, updateState] = LoadsGrpcService.useUpdateLoadDispatcherMutation();
    const { t } = useAppTranslation('modals');

    const {
        control,
        handleSubmit,
        formState: { isDirty }
    } = useForm<DefaultValues>({
        defaultValues: { dispatcherId },
        values       : { dispatcherId },
        resolver     : yupResolver(schema)
    });

    const onConfirmHandler = (data: DefaultValues) => {
        update({
            loadId,
            dispatcherId: data.dispatcherId
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
                {t('loads.edit_load.fields.dialog_titles.booking_dispatcher')}
            </Typography>
            <FormControl style={{ width: '100%' }}>
                <DispatcherSelect
                    autoFocus
                    control={control}
                    name="dispatcherId"
                    label="modals:loads.edit_load.fields.titles.booking_dispatcher"
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
