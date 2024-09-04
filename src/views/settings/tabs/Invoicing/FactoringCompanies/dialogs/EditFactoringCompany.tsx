import { useForm } from 'react-hook-form';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';
import FactoringCompaniesGrpcService from '@/@grpcServices/services/factoring-companies/factoring-companies.service';
import { yupResolver } from '@hookform/resolvers/yup';
import FACTORING_COMPANY_FORM_CONFIG, {
    FactoringCompanyDefaultValue
} from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/factoring-company-form-config';
import FactoringCompanyForm from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/FactoringCompanyForm';
import { useEffect } from 'react';

type Props = {
    company: FactoringCompanyModel;
};

export const useCompanyDialog = hookFabric(CompanyDialog, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="700px"
        {...props}
    />
));

export default function CompanyDialog({ company }: Props) {
    const dialog = useCompanyDialog(true);
    const [updateCompany, { isLoading }] =
        FactoringCompaniesGrpcService.endpoints.updateFactoringCompany.useMutation();

    const methods = useForm<FactoringCompanyDefaultValue>({
        values  : company,
        resolver: yupResolver<FactoringCompanyDefaultValue>(FACTORING_COMPANY_FORM_CONFIG.schema)
    });

    const {
        handleSubmit,
        formState: { isDirty }
    } = methods;

    const submit = (payload: FactoringCompanyDefaultValue) => {
        updateCompany({ factoringCompanyId: company.factoringCompanyId, ...payload })
            .unwrap()
            .then(dialog.forceClose);
    };

    useEffect(() => {
        dialog.confirmDialog.setDirty(isDirty, {
            confirm_text    : 'common:button.save_and_close',
            delete_text     : 'common:button.close',
            max_width_dialog: '500px',
            onConfirm       : handleSubmit(submit),
            onDelete        : () => {}
        });
    }, [isDirty, submit]);

    return (
        <FactoringCompanyForm
            methods={methods}
            onSubmit={submit}
            isLoading={isLoading}
            onClose={dialog.close}
            companyName={company.name}
            isEdit
        />
    );
}
