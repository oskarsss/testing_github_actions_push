import { hookFabric } from '@/utils/dialog-hook-fabric';
import PlateCompanyForm from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompany/components/PlateCompanyForm';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { default_values_add } from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompany/components/defaultValues';
import { schema_add } from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompany/components/schema';
import PlateCompaniesGrpcService from '@/@grpcServices/services/plate-companies.service';
import type { PlateCompanyCreateRequest } from '@proto/plate.company';

export const useAddPlateCompanyDialog = hookFabric(AddPlateCompany);

export function AddPlateCompany() {
    const addCompanyDialog = useAddPlateCompanyDialog(true);
    const [addCompany, { isLoading }] = PlateCompaniesGrpcService.useCreatePlateCompanyMutation();

    const method = useForm<PlateCompanyCreateRequest>({
        defaultValues: default_values_add,
        resolver     : yupResolver(schema_add)
    });

    const submit = (values: PlateCompanyCreateRequest) => {
        addCompany(values).unwrap().then(addCompanyDialog.close);
    };
    return (
        <PlateCompanyForm
            title="modals:plate_companies.add.header.title"
            method={method}
            submit={submit}
        >
            <DialogComponents.CancelButton onCancel={addCompanyDialog.close} />
            <DialogComponents.SubmitButton
                loading={isLoading}
                type="create"
            />
        </PlateCompanyForm>
    );
}
