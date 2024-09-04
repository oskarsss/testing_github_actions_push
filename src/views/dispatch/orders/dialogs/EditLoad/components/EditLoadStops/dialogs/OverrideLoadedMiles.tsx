import NumberInput from '@/@core/fields/inputs/NumberInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type DefaultValues = {
    loadedMiles: number;
};

type Props = {
    defaultValue: number;
    loadId: string;
};

const schema = yup.object().shape({
    loadedMiles: yup
        .number()
        .moreThan(0, 'Must be greater than 0')
        .required('Loaded miles are required')
});

export const useOverrideLoadedMilesDialog = hookFabric(OverrideLoadedMiles, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="346px"
        turnOffCloseButton
        {...props}
    />
));
function OverrideLoadedMiles({
    defaultValue,
    loadId
}: Props) {
    const [trigger, { isLoading }] = LoadsGrpcService.useUpdateLoadedMilesMutation();
    const dialog = useOverrideLoadedMilesDialog(true);
    const { t } = useAppTranslation('modals');

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<DefaultValues>({
        defaultValues: {
            loadedMiles: defaultValue
        },
        mode    : 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: DefaultValues) => {
        trigger({
            loadedMiles: data.loadedMiles,
            loadId
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <Stack
                direction="column"
                gap={3}
            >
                <Typography
                    fontWeight={600}
                    fontSize="18px"
                >
                    {t('title', { defaultValue })}
                </Typography>
                <Typography color="text.secondary">
                    {t('loads.edit_load.stops.dialogs.override_loaded_miles.description')}
                </Typography>
                <NumberInput
                    control={control}
                    errors={errors}
                    label="modals:loads.edit_load.stops.labels.loaded_miles"
                    name="loadedMiles"
                    variant="outlined"
                    width="100%"
                    autoFocus
                />
                <DialogComponents.ActionsWrapper>
                    <DialogComponents.CancelButton onCancel={dialog.close} />
                    <DialogComponents.SubmitButton
                        loading={isLoading}
                        text="common:button.confirm"
                    />
                </DialogComponents.ActionsWrapper>
            </Stack>
        </DialogComponents.Form>
    );
}
