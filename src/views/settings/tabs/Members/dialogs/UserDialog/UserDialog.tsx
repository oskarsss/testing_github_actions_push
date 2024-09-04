import TextInput from '@/@core/fields/inputs/TextInput';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import Info from '@/@core/components/Info';
import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { statuses } from '@/views/settings/tabs/Members/dialogs/UserDialog/helpers';
import { Wrapper } from '@/views/settings/tabs/Members/dialogs/UserDialog/styled';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { UpdateUserRequest } from '@proto/users';
import RoleSelect from '@/@core/fields/select/RoleSelect';
import SYSTEM from '@/@system';
import { Stack } from '@mui/material';
import type { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    title: IntlMessageKey;
    method: UseFormReturn<UpdateUserRequest>;
    children: ReactNode;
    submit: (body: UpdateUserRequest) => void;
    topControllers?: ReactNode;
    isEdit?: boolean;
};

export default function UserDialog({
    method,
    submit,
    title,
    children,
    topControllers,
    isEdit
}: Props) {
    const { t } = useAppTranslation();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = method;
    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <Wrapper>
                <DialogComponents.Header title={title} />
                {topControllers}
            </Wrapper>
            <DialogComponents.SubHeader text="modals:settings.user.add_update.header.sub_title" />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={4}>
                    <TextInput
                        required
                        name="firstName"
                        label="fields:first_name.label"
                        control={control}
                        autoFocus={!isEdit}
                        errors={errors}
                        placeholder="fields:first_name.placeholder"
                        width="100%"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={4}>
                    <TextInput
                        name="lastName"
                        label="fields:last_name.label"
                        control={control}
                        errors={errors}
                        placeholder="fields:last_name.placeholder"
                        width="100%"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={4}>
                    <TextInput
                        name="title"
                        label="modals:settings.user.add_update.fields.title.label"
                        control={control}
                        errors={errors}
                        placeholder="modals:settings.user.add_update.fields.title.placeholder"
                        width="100%"
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={6}>
                    <PhoneInput
                        name="phone"
                        label="fields:phone_number.label"
                        control={control}
                        errors={errors}
                        placeholder="fields:phone_number.placeholder"
                        width="100%"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <TextInput
                        required
                        name="email"
                        label="fields:email.label"
                        control={control}
                        errors={errors}
                        placeholder=""
                        placeholderWithoutTranslate={SYSTEM.PLACEHOLDER_EMAIL}
                        width="100%"
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={isEdit ? 4 : 6}>
                    <TextInput
                        required={!isEdit}
                        name="password"
                        label="fields:password.label"
                        control={control}
                        errors={errors}
                        placeholder="fields:password.placeholder"
                        type="password"
                        inputProps={{ autoComplete: 'disabled' }}
                        width="100%"
                    />
                </DialogComponents.Field>

                {isEdit && (
                    <DialogComponents.Field xs={4}>
                        <SelectInput
                            required
                            control={control}
                            errors={errors}
                            label="fields:status.label"
                            name="status"
                            width="100%"
                            options={statuses(t)}
                        />
                    </DialogComponents.Field>
                )}

                <DialogComponents.Field xs={isEdit ? 4 : 6}>
                    <RoleSelect
                        required
                        control={control}
                        errors={errors}
                        name="roleId"
                    />
                </DialogComponents.Field>

                <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap="20px"
                    pl="20px"
                >
                    <DialogComponents.ActionsWrapper>
                        <CheckboxInput
                            name="secondStepAuthEnabled"
                            control={control}
                            errors={errors}
                            label="modals:settings.user.add_update.fields.second_step_auth_enabled.label"
                        />
                        <Info title="modals:settings.user.add_update.fields.second_step_auth_enabled.tooltip" />
                    </DialogComponents.ActionsWrapper>
                    <DialogComponents.ActionsWrapper>
                        <CheckboxInput
                            name="passwordChangeRequired"
                            control={control}
                            errors={errors}
                            label="modals:settings.user.add_update.fields.password_change_required.label"
                        />
                        <Info title="modals:settings.user.add_update.fields.password_change_required.tooltip" />
                    </DialogComponents.ActionsWrapper>
                </Stack>
            </DialogComponents.Fields>
            {children}
        </DialogComponents.Form>
    );
}
