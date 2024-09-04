import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useForm } from 'react-hook-form';
import IntegrationInfoFields from '@/views/settings/tabs/Integrations/dialogs/RequestIntegration/components/IntegrationInfoFields';
import ContactFields from '@/views/settings/tabs/Integrations/dialogs/RequestIntegration/components/ContactFields';
import RequestIntegrationDialogComponents from '@/views/settings/tabs/Integrations/dialogs/RequestIntegration/components/DialogComponents';
import {
    default_value,
    DefaultValue,
    schema
} from '@/views/settings/tabs/Integrations/dialogs/RequestIntegration/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import AccountGrpcService from '@/@grpcServices/services/account.service';
import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const useRequestIntegrationDialog = hookFabric(RequestIntegration, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        padding="20px 16px 16px 16px"
        maxWidth="410px"
    />
));

function RequestIntegration() {
    const { data: accountData } = AccountGrpcService.endpoints.getAccount.useQueryState({});
    const dialog = useRequestIntegrationDialog(true);
    const { t } = useAppTranslation('modals');

    const [requestIntegration, { isLoading }] =
        IntegrationProviderGrpcService.useRequestIntegrationMutation();

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValue>({
        defaultValues: {
            ...default_value,
            contact_name : accountData?.user?.firstName || '',
            contact_email: accountData?.user?.email || '',
            contact_phone: accountData?.user?.phoneNumber || ''
        },
        resolver: yupResolver(schema)
    });

    const submit = (data: DefaultValue) => {
        requestIntegration({
            contactEmail      : data.contact_email,
            contactName       : data.contact_name,
            contactPhone      : data.contact_phone,
            integrationName   : data.integration_name,
            integrationPurpose: data.integration_purpose,
            integrationWebsite: data.integration_website
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title={RequestIntegrationDialogComponents.title(
                    t('settings.integrations.request_integration.title')
                )}
            />
            <RequestIntegrationDialogComponents.Divider />
            <RequestIntegrationDialogComponents.Description>
                {t('settings.integrations.request_integration.description')}
            </RequestIntegrationDialogComponents.Description>

            <RequestIntegrationDialogComponents.SubTitle>
                {t('settings.integrations.request_integration.sub_title_1')}
            </RequestIntegrationDialogComponents.SubTitle>
            <IntegrationInfoFields
                control={control}
                errors={errors}
            />

            <RequestIntegrationDialogComponents.SubTitle>
                {t('settings.integrations.request_integration.sub_title_2')}
            </RequestIntegrationDialogComponents.SubTitle>
            <ContactFields
                control={control}
                errors={errors}
            />

            <DialogComponents.DefaultActions
                submitText="modals:settings.integrations.request_integration.submit"
                onCancel={dialog.close}
                submitDisabled={!isDirty}
                submitLoading={isLoading}
            />
        </DialogComponents.Form>
    );
}
