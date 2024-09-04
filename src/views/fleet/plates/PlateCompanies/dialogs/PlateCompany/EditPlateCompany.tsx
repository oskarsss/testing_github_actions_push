import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import PlatesTypes from '@/store/fleet/plates/types';
import { default_values_edit } from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompany/components/defaultValues';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_edit } from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompany/components/schema';
import PlateCompanyForm from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompany/components/PlateCompanyForm';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import PlateCompaniesGrpcService from '@/@grpcServices/services/plate-companies.service';
import type { PlateCompanyCreateRequest } from '@proto/plate.company';

type Props = {
    company: PlatesTypes.PlateCompanyRow;
};

export const useEditPlateCompanyDialog = hookFabric(EditPlateCompany);

function EditPlateCompany({ company }: Props) {
    const editCompanyDialog = useEditPlateCompanyDialog(true);
    const [deleteCompany, { isLoading: loadingDelete }] =
        PlateCompaniesGrpcService.useDeletePlateCompanyMutation();
    const [updateCompany, { isLoading: loadingUpdate }] =
        PlateCompaniesGrpcService.useUpdatePlateCompanyMutation();

    const method = useForm<PlateCompanyCreateRequest>({
        defaultValues: default_values_edit,
        values       : company,
        resolver     : yupResolver(schema_edit)
    });
    const submit = (values: PlateCompanyCreateRequest) => {
        updateCompany({
            ...values,
            plateCompanyId: company.plateCompanyId
        })
            .unwrap()
            .then(editCompanyDialog.close);
    };

    const onDelete = () => {
        deleteCompany({
            plateCompanyId: company.plateCompanyId
        })
            .unwrap()
            .then(editCompanyDialog.close);
    };

    return (
        <PlateCompanyForm
            title="modals:plate_companies.edit.header.title"
            translateOptions={{ name: company.name }}
            method={method}
            submit={submit}
        >
            <DialogComponents.CancelButton onCancel={editCompanyDialog.close} />
            <DialogComponents.DeleteButton
                loading={loadingDelete}
                onClick={onDelete}
                disabled={loadingUpdate}
            />
            <DialogComponents.SubmitButton
                loading={loadingUpdate}
                type="update"
                disabled={loadingDelete}
            />
        </PlateCompanyForm>
    );
}
