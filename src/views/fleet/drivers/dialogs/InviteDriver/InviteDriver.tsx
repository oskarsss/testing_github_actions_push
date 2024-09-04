import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import { TestIDs } from '@/configs/tests';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { reset_config } from '@/configs/reset-from-config';
import {
    default_value,
    DefaultValues,
    schema
} from '@/views/fleet/drivers/dialogs/InviteDriver/helpers';
import Tabs from '@/views/fleet/drivers/dialogs/InviteDriver/components/Tabs';
import SYSTEM from '@/@system';
import { IntlMessageKey } from '@/@types/next-intl';

export const useInviteDriverDialog = hookFabric(InviteDriver);

type Props = {
    phone_number?: string;
    email?: string;
};

function InviteDriver({
    email = '',
    phone_number = ''
}: Props) {
    const dialog = useInviteDriverDialog(true);
    const [invite_type, setInviteType] = useState<1 | 2>(2);
    const [inviteDriver, { isLoading }] = DriversGrpcService.useInviteDriverMutation();

    const {
        control,
        setValue,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: { ...default_value, phone_number, email },
        resolver     : yupResolver(schema)
    });

    const hasNumber = !!watch('phone_number');
    const hasEmail = !!watch('email');

    const submit = (data: DefaultValues) => {
        const payload = {
            to  : invite_type === 2 ? data.phone_number : data.email,
            type: data.type
        };

        inviteDriver({
            to  : payload.to,
            type: payload.type
        })
            .unwrap()
            .then(() => {
                dialog.close().then(() => {
                    reset(default_value, reset_config);
                });
            });
    };

    const changeInviteType = (value: 1 | 2) => {
        setValue('type', value);
        setInviteType(value);
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="common:actions.invite_driver" />
            <Tabs
                value={invite_type}
                changeInviteType={changeInviteType}
            />
            <DialogComponents.SubHeader
                text={
                    invite_type === 2
                        ? 'modals:drivers.invite.header.sub_title_phone'
                        : 'modals:drivers.invite.header.sub_title_email'
                }
            />
            <DialogComponents.Fields>
                {invite_type === 2 ? (
                    <DialogComponents.Field xs={12}>
                        <PhoneInput
                            control={control}
                            errors={errors}
                            name="phone_number"
                            placeholder="fields:phone_number.placeholder"
                            label="fields:phone_number.label"
                            width="100%"
                        />
                    </DialogComponents.Field>
                ) : (
                    <DialogComponents.Field xs={12}>
                        <TextInput
                            control={control}
                            errors={errors}
                            name="email"
                            placeholder=""
                            placeholderWithoutTranslate={SYSTEM.PLACEHOLDER_EMAIL}
                            label="fields:email.label"
                            width="100%"
                        />
                    </DialogComponents.Field>
                )}
            </DialogComponents.Fields>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton
                    onCancel={dialog.close}
                    testID={TestIDs.pages.fleetDrivers.buttons.cancelAddingDriver}
                />
                <DialogComponents.SubmitButton
                    loading={isLoading}
                    disabled={invite_type === 2 ? !hasNumber : !hasEmail}
                    text="common:actions.invite"
                    testID={TestIDs.pages.fleetDrivers.buttons.confirmAddingDriver}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
