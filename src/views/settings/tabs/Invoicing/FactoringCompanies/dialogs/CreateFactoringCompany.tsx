/* eslint-disable max-len */
import { hookFabric } from '@/utils/dialog-hook-fabric';
import FactoringCompaniesGrpcService from '@/@grpcServices/services/factoring-companies/factoring-companies.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import FactoringCompanyForm from './FactoringCompanyForm/FactoringCompanyForm';
import FACTORING_COMPANY_FORM_CONFIG, {
    FactoringCompanyDefaultValue
} from './FactoringCompanyForm/factoring-company-form-config';

export const useCreateFactoringCompanyDialog = hookFabric(CreateFactoringCompany, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="600px"
        {...props}
    />
));

type Props = {
    onSuccessfulCreate?: () => void;
};

function CreateFactoringCompany({ onSuccessfulCreate }: Props) {
    const dialog = useCreateFactoringCompanyDialog(true);
    const [createFactoringCompany, { isLoading }] =
        FactoringCompaniesGrpcService.useCreateFactoringCompanyMutation();

    const methods = useForm<FactoringCompanyDefaultValue>({
        defaultValues: FACTORING_COMPANY_FORM_CONFIG.defaultValues,
        resolver     : yupResolver<FactoringCompanyDefaultValue>(FACTORING_COMPANY_FORM_CONFIG.schema)
    });

    const create = (payload: FactoringCompanyDefaultValue) => {
        createFactoringCompany(payload)
            .unwrap()
            .then(() => {
                onSuccessfulCreate?.();
                dialog.close();
            });
    };

    return (
        <FactoringCompanyForm
            methods={methods}
            onSubmit={create}
            isLoading={isLoading}
            onClose={dialog.close}
        />
    );
}
