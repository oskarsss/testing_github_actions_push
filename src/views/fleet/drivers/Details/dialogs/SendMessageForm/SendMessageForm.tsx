import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '@/@core/fields/inputs/TextInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { MutationDefinition } from '@reduxjs/toolkit/query';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from '@reduxjs/toolkit/dist/query';
import { UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TestIDs } from '@/configs/tests';
import Tooltip from '@mui/material/Tooltip';
import type { IntlMessageKey } from '@/@types/next-intl';

type FieldValues = {
    body: string;
};

const schema_sms = yup.object().shape({
    body: yup
        .string()
        .transform((value) => value.trim())
        .min(10)
        .required()
});

type MutationHook = UseMutation<
    MutationDefinition<
        any,
        BaseQueryFn<
            string | FetchArgs,
            unknown,
            FetchBaseQueryError,
            RetryOptions,
            FetchBaseQueryMeta
        >,
        string,
        any,
        'api'
    >
>;

type Props = {
    isLoading: boolean;
    title: IntlMessageKey;
    onSend: (body: string) => Promise<unknown>;
    body?: string;
    onClose: () => void;
    is_phone_exist: boolean;
};

export default function SendMessageForm({
    isLoading,
    title,
    onSend,
    body = '',
    onClose,
    is_phone_exist = false
}: Props) {
    const { t } = useAppTranslation();
    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isValid
        }
    } = useForm({
        defaultValues: { body },
        resolver     : yupResolver(schema_sms)
    });

    const send: SubmitHandler<FieldValues> = (data) => {
        onSend(data.body).then(onClose);
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(send)}>
            <DialogComponents.Header title={title} />

            <DialogComponents.Field xs={12}>
                <TextInput
                    name="body"
                    label="modals:drivers.send_critical_notification.error.feature_not_enabled.dialog.send_sms.fields.body.label"
                    control={control}
                    errors={errors}
                    placeholder="modals:drivers.send_critical_notification.error.feature_not_enabled.dialog.send_sms.fields.body.placeholder"
                    width="100%"
                    required
                    autoFocus
                    multiline
                    testID={TestIDs.pages.driverProfile.fields.message}
                />
            </DialogComponents.Field>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={onClose} />

                <Tooltip
                    title="modals:drivers.send_critical_notification.error.feature_not_enabled.dialog.send_sms.tooltip"
                    disableHoverListener={is_phone_exist}
                    placement="top"
                    arrow
                >
                    <div>
                        <DialogComponents.SubmitButton
                            loading={isLoading}
                            text="common:button.send"
                            disabled={!is_phone_exist || !isValid}
                        />
                    </div>
                </Tooltip>
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
