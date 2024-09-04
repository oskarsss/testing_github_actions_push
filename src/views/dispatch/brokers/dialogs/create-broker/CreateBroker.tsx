import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@/@core/fields/inputs/TextInput';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useEditBrokerDialog } from '@/views/dispatch/brokers/dialogs/EditBroker/EditBroker';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { TestIDs } from '@/configs/tests';
import type { Option } from '@/@core/fields/select/BrokerSelect/BrokerSelectOption';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';
import SaferLookupLink from './SaferLookupLink';
import createBrokerUtils, { type DefaultValues } from './create-broker-utils';
import BrokerMc from './BrokerMc';

type Props = {
    onAdded?: (broker: Pick<Option, 'id' | 'name' | 'mc'>) => void;
    broker?: Option;
};

export const useCreateBrokerDialog = hookFabric(CreateBroker, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="500px"
        turnOffCloseButton
        {...props}
    />
));

export default function CreateBroker({
    onAdded,
    broker
}: Props) {
    const [createBroker, { isLoading: isCreateBrokerLoading }] =
        BrokersGrpcService.useCreateBrokerMutation();
    const editBrokerDialog = useEditBrokerDialog();
    const createBrokerDialog = useCreateBrokerDialog(true);

    const onClose = () => {
        createBrokerDialog.close();
    };

    const dataValues: DefaultValues | undefined = useMemo(() => {
        if (!broker) return undefined;
        return {
            mc         : broker.mc,
            name       : broker.name,
            phoneNumber: broker.phoneNumber,
            email      : broker.email,
            address    : broker.address
        };
    }, [broker?.mc, broker?.name, broker?.phoneNumber, broker?.email, broker?.address]);

    const {
        setValue,
        control,
        watch,
        handleSubmit,
        clearErrors,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: createBrokerUtils.defaultValues,
        values       : dataValues,
        resolver     : yupResolver(createBrokerUtils.schema)
    });

    const submit = (payload: DefaultValues) => {
        createBroker(payload)
            .unwrap()
            .then((res) => {
                if (onAdded) {
                    onAdded({
                        id  : res.brokerId,
                        name: payload.name,
                        mc  : payload.mc || 0
                    });
                } else {
                    editBrokerDialog.open({ brokerId: res.brokerId });
                }
                onClose();
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="modals:brokers.add.title">
                <SaferLookupLink />
            </DialogComponents.Header>

            <DialogComponents.Fields rowSpacing={5}>
                <BrokerMc
                    control={control}
                    watch={watch}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />

                <DialogComponents.Field xs={12}>
                    <TextInput
                        required
                        control={control}
                        errors={errors}
                        name="name"
                        width="100%"
                        label="modals:brokers.add.fields.name.label"
                        placeholder="modals:brokers.add.fields.name.placeholder"
                        testID={TestIDs.pages.brokerDialog.fields.name}
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <PhoneInput
                        control={control}
                        errors={errors}
                        label="fields:phone_number.label"
                        name="phoneNumber"
                        placeholder="fields:phone_number.placeholder"
                        width="100%"
                        testID={TestIDs.pages.brokerDialog.fields.phone}
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="modals:brokers.add.fields.email.label"
                        name="email"
                        placeholder="modals:brokers.add.fields.email.placeholder"
                        width="100%"
                        type="email"
                        testID={TestIDs.pages.brokerDialog.fields.email}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        required
                        control={control}
                        errors={errors}
                        name="address"
                        width="100%"
                        label="fields:address.label"
                        placeholder="fields:address.placeholder"
                        testID={TestIDs.pages.brokerDialog.fields.address}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            <DialogComponents.DefaultActions
                onCancel={onClose}
                submitLoading={isCreateBrokerLoading}
                type="create"
                submitDisabled={!isDirty && !broker}
            />
        </DialogComponents.Form>
    );
}
