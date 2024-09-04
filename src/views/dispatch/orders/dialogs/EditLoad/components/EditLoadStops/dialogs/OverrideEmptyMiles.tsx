import NumberInput from '@/@core/fields/inputs/NumberInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type DefaultValues = {
    emptyMiles: number;
};

type Props = {
    defaultValue: number;
    loadId: string;
};

export const useOverrideEmptyMilesDialog = hookFabric(OverrideEmptyMiles, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="346px"
        turnOffCloseButton
        {...props}
    />
));
function OverrideEmptyMiles({
    defaultValue,
    loadId
}: Props) {
    const [trigger, { isLoading }] = LoadsGrpcService.useUpdateEmptyMilesMutation();
    const dialog = useOverrideEmptyMilesDialog(true);
    const { t } = useAppTranslation('modals');

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<DefaultValues>({
        defaultValues: {
            emptyMiles: defaultValue
        }
    });

    const onSubmit = (data: DefaultValues) => {
        trigger({
            emptyMiles: data.emptyMiles,
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
                    {t('loads.edit_load.stops.dialogs.override_empty_miles.title', {
                        defaultValue
                    })}
                </Typography>
                <Typography color="text.secondary">
                    {t('loads.edit_load.stops.dialogs.override_empty_miles.description')}
                </Typography>
                <NumberInput
                    control={control}
                    errors={errors}
                    label="modals:loads.edit_load.stops.labels.empty_miles"
                    name="emptyMiles"
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
