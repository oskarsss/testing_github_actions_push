import ServiceProvidersGrpcService from '@/@grpcServices/services/maitenance-service/service-providers.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import serviceProvidersModalUtils, { type DefaultValues } from './service-providers-modals-utils';
import ServiceProviderModalForm from './Form';

export const useCreateServiceProvider = hookFabric(CreateServiceProvider, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="540px"
        {...props}
    />
));

type Props = {
    onSuccessfulCreate?: (serviceProviderId: string) => void;
};

function CreateServiceProvider({ onSuccessfulCreate }: Props) {
    const [createServiceProvider, { isLoading }] =
        ServiceProvidersGrpcService.useCreateServiceProviderMutation();
    const dialog = useCreateServiceProvider(true);

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: serviceProvidersModalUtils.defaultValues,
        resolver     : yupResolver(serviceProvidersModalUtils.schema)
    });

    const create = (payload: DefaultValues) => {
        createServiceProvider(payload)
            .unwrap()
            .then(({ serviceProviderId }) => {
                dialog.close().then(() => {
                    if (onSuccessfulCreate) {
                        onSuccessfulCreate(serviceProviderId);
                    }
                });
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(create)}>
            <DialogComponents.Header title="maintenance:service_providers.modals.create.header.title" />

            <ServiceProviderModalForm
                control={control}
                errors={errors}
            />

            <DialogComponents.DefaultActions
                type="create"
                onCancel={dialog.close}
                submitLoading={isLoading}
                submitDisabled={!isDirty}
            />
        </DialogComponents.Form>
    );
}
