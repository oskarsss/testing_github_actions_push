import ServiceProvidersGrpcService from '@/@grpcServices/services/maitenance-service/service-providers.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { ServiceProviderModel_ServiceProvider } from '@proto/models/model_service_provider';
import { useMemo } from 'react';
import { Stack } from '@mui/material';
import { SelectServiceProviderAction } from '@/store/maitenance/service-providers/slice';
import { useAppDispatch } from '@/store/hooks';
import serviceProvidersModalUtils, { type DefaultValues } from './service-providers-modals-utils';
import ServiceProviderModalForm from './Form';

export const useUpdateServiceProvider = hookFabric(UpdateServiceProvider, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="540px"
        {...props}
    />
));

type Props = {
    serviceProvider: ServiceProviderModel_ServiceProvider;
};

function UpdateServiceProvider({ serviceProvider }: Props) {
    const dispatch = useAppDispatch();
    const [updateServiceProvider, { isLoading: isUpdateLoading }] =
        ServiceProvidersGrpcService.useUpdateServiceProviderMutation();
    const [deleteServiceProvider, { isLoading: isDeleteLoading }] =
        ServiceProvidersGrpcService.useDeleteServiceProviderMutation();
    const dialog = useUpdateServiceProvider(true);

    const values: DefaultValues = useMemo(
        () => ({
            name             : serviceProvider.name,
            contactName      : serviceProvider.contactName,
            phone            : serviceProvider.phone,
            email            : serviceProvider.email,
            fax              : serviceProvider.fax,
            addressLine1     : serviceProvider.addressLine1,
            addressLine2     : serviceProvider.addressLine2,
            addressCity      : serviceProvider.addressCity,
            addressState     : serviceProvider.addressState,
            addressPostalCode: serviceProvider.addressPostalCode
        }),
        [serviceProvider]
    );

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: serviceProvidersModalUtils.defaultValues,
        values,
        resolver     : yupResolver(serviceProvidersModalUtils.schema)
    });

    const handleCreate = (payload: DefaultValues) => {
        updateServiceProvider({
            serviceProviderId: serviceProvider.serviceProviderId,
            ...payload
        })
            .unwrap()
            .then(dialog.close);
    };

    const handleDelete = () => {
        deleteServiceProvider({
            serviceProviderId: serviceProvider.serviceProviderId
        })
            .unwrap()
            .then(() => {
                dialog.close();
                dispatch(SelectServiceProviderAction.selectServiceProviderId(''));
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(handleCreate)}>
            <DialogComponents.Header title="maintenance:service_providers.modals.edit.header.title" />

            <ServiceProviderModalForm
                control={control}
                errors={errors}
            />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
            >
                <DialogComponents.DeleteButton
                    onClick={handleDelete}
                    loading={false}
                    disabled={isDeleteLoading}
                />

                <DialogComponents.DefaultActions
                    type="update"
                    onCancel={dialog.close}
                    submitLoading={isUpdateLoading}
                    submitDisabled={!isDirty}
                />
            </Stack>
        </DialogComponents.Form>
    );
}
