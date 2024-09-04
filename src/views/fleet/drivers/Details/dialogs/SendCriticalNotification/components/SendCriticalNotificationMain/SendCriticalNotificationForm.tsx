import TextInput from '@/@core/fields/inputs/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import SendCriticalNotificationButton from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/components/SendCriticalNotificationButton';
import { useState, ChangeEvent } from 'react';
import { DriverActions } from '@/store/fleet/drivers/slice';
import { useAppDispatch } from '@/store/hooks';
import { PropsOnlyId } from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/SendCriticalNotification';
import CriticalNotificationGrpcService from '@/@grpcServices/services/critical-notifications.service';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import CriticalNotificationStyled from '../../styled';

type FieldValues = {
    body: string;
};

const schema_sms = yup.object().shape({
    body: yup
        .string()
        .transform((value) => value.trim())
        .min(10, 'Min 10 characters')
        .required()
});

const default_values = {
    body: ''
};

export default function SendCriticalNotificationForm({ id }: PropsOnlyId) {
    const dispatch = useAppDispatch();
    const [checked, setChecked] = useState(false);
    const { t } = useAppTranslation();
    const [sendMessage, {
        isLoading,
        isSuccess
    }] =
        CriticalNotificationGrpcService.useSendCriticalNotificationMutation();

    const {
        control,
        getValues,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        defaultValues: default_values,
        resolver     : yupResolver(schema_sms)
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const send: SubmitHandler<FieldValues> = (data) => {
        sendMessage({
            driverId: id,
            body    : data.body
        })
            .unwrap()
            .then((res) => {
                dispatch(
                    DriverActions.updateCriticalNotification({
                        step           : 1,
                        text           : getValues('body'),
                        notification_id: res.notificationId
                    })
                );
            });
    };

    const submit = () => {
        handleSubmit(send)();
    };

    const disabled_button = !isDirty || !checked || isSuccess;

    return (
        <CriticalNotificationStyled.Form>
            <CriticalNotificationStyled.Field>
                <TextInput
                    name="body"
                    label="modals:drivers.send_critical_notification.fields.message.label"
                    control={control}
                    errors={errors}
                    placeholder="modals:drivers.send_critical_notification.fields.message.placeholder"
                    width="100%"
                    required
                />
            </CriticalNotificationStyled.Field>

            <CriticalNotificationStyled.FormControlLabel
                control={(
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                    />
                )}
                label={t('modals:drivers.send_critical_notification.fields.checkbox.label')}
            />

            <SendCriticalNotificationButton
                submit={submit}
                isLoading={isLoading}
                disabled={disabled_button}
                text="modals:drivers.send_critical_notification.activate_button"
            />
        </CriticalNotificationStyled.Form>
    );
}
