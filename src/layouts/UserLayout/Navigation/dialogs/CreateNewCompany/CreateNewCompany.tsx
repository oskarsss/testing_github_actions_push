import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import {
    createNewCompanyDefaultValues,
    CreateNewCompanyDefaultValues,
    schema
} from '@/layouts/UserLayout/Navigation/dialogs/CreateNewCompany/helpers';
import CreateNewCompanyFields from '@/layouts/UserLayout/Navigation/dialogs/CreateNewCompany/components/CreateNewCompanyFields';
import { Typography } from '@mui/material';
import CompaniesGrpcService from '@/@grpcServices/services/companies.service';
import { CompanyCreateReply } from '@proto/companies';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const useCreateNewCompanyDialog = hookFabric(CreateNewCompany, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="540px"
        {...props}
    />
));

type Props = {
    changeCompany: (data: CompanyCreateReply) => void;
};

function CreateNewCompany({ changeCompany }: Props) {
    const { t } = useAppTranslation();
    const dialog = useCreateNewCompanyDialog();

    const [createCompany, { isLoading }] = CompaniesGrpcService.useCreateCompanyMutation();

    const methods = useForm<CreateNewCompanyDefaultValues>({
        defaultValues: createNewCompanyDefaultValues,
        resolver     : yupResolver(schema)
    });

    const {
        handleSubmit,
        formState: { isDirty }
    } = methods;

    const submit = (data: CreateNewCompanyDefaultValues) => {
        createCompany({
            name             : data.company_name,
            dot              : data.dot,
            email            : data.email,
            phone            : data.phone_number,
            addressCity      : data.location_id_city,
            addressLine1     : data.location_id_line1,
            addressLine2     : data.location_id_line2,
            addressPostalCode: data.location_id_postal_code,
            addressState     : data.location_id_state
        })
            .unwrap()
            .then((response) => {
                dialog.close().then(() => {
                    changeCompany(response);
                });
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title={(
                    <Typography
                        fontSize="20px"
                        fontWeight={600}
                        lineHeight={1.3}
                    >
                        {t('navigation:menu.create.new_company.header.title')}
                    </Typography>
                )}
            />

            <CreateNewCompanyFields methods={methods} />

            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="create"
                submitDisabled={!isDirty}
            />
        </DialogComponents.Form>
    );
}
