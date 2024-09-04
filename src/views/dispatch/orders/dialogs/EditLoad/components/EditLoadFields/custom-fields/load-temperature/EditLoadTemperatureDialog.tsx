import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { Typography, InputAdornment } from '@mui/material';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TextInput from '@/@core/fields/inputs/TextInput';

export const useEditLoadTemperatureDialog = hookFabric(EditLoadTemperatureDialog, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="346px"
        turnOffCloseButton
        {...props}
    />
));

type DefaultValues = {
    temperature: string;
};

const schema: ObjectSchema<DefaultValues> = yup.object().shape({
    temperature: yup.string().required('Temperature is required')
});

type Props = {
    temperature: number;
    loadId: string;
};

export default function EditLoadTemperatureDialog({
    temperature,
    loadId
}: Props) {
    const { t } = useAppTranslation();
    const dialog = useEditLoadTemperatureDialog(true);
    const [update, updateState] = LoadsGrpcService.useUpdateLoadTemperatureMutation();

    const {
        control,
        handleSubmit,
        formState: {
            isDirty,
            errors
        }
    } = useForm<DefaultValues>({
        defaultValues: { temperature: temperature.toString() },
        values       : { temperature: temperature.toString() },
        resolver     : yupResolver(schema)
    });

    const onConfirmHandler = (data: DefaultValues) => {
        update({
            loadId,
            temperature: Number(data.temperature)
        })
            .unwrap()
            .then(dialog.close);
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
                {t('modals:loads.edit_load.fields.dialog_titles.temperature')}
            </Typography>

            <DialogComponents.Field xs={12}>
                <TextInput
                    required
                    autoFocus
                    control={control}
                    errors={errors}
                    name="temperature"
                    label="fields:temperature.label"
                    width="100%"
                    type="number"
                    placeholder="fields:temperature.placeholder"
                    inputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Typography
                                    height="100%"
                                    paddingBottom="6px"
                                    color="semantic.text.secondary"
                                >
                                    {t('fields:temperature.unit')}
                                </Typography>
                            </InputAdornment>
                        ),
                        autoComplete: 'off'
                    }}
                />
            </DialogComponents.Field>

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
