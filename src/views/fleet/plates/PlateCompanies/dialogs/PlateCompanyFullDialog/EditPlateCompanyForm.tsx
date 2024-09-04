import FullDialog from '@/@core/ui-kits/full-dialog';
import PlatesTypes from '@/store/fleet/plates/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EditPlateCompanyHeader from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompanyFullDialog/components/EditPlateCompanyHeader';
import EditPlateCompanyFields from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompanyFullDialog/components/EditPlateCompanyFields';
import {
    default_values,
    EditPlateCompanyDefaultValue,
    schema
} from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompanyFullDialog/helpers';
import Documents from '@/@core/components/documents/Documents';
import { useCallback, useEffect, useMemo } from 'react';
import { useEditPlateCompanyDialog } from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompanyFullDialog/EditPlateCompany';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import PlateCompaniesGrpcService from '@/@grpcServices/services/plate-companies.service';

type Props = {
    company: PlatesTypes.PlateCompany;
    onClose: () => void;
    refetch: () => void;
};

export default function EditPlateCompanyForm({
    company,
    onClose,
    refetch
}: Props) {
    const editPlateCompanyDialog = useEditPlateCompanyDialog(true);

    const [updateCompany, { isLoading: loadingUpdate }] =
        PlateCompaniesGrpcService.useUpdatePlateCompanyMutation();

    const data_values: EditPlateCompanyDefaultValue = useMemo(
        () => ({
            name       : company.name,
            referenceId: company.referenceId,
            state      : company.state,
            deleted    : company.deleted
        }),
        [company.deleted, company.name, company.referenceId, company.state]
    );

    const method = useForm<EditPlateCompanyDefaultValue>({
        defaultValues: default_values,
        values       : data_values,
        resolver     : yupResolver(schema)
    });

    const submit = useCallback(
        (values: EditPlateCompanyDefaultValue) => {
            updateCompany({
                ...values,
                plateCompanyId: company.plateCompanyId
            });
        },
        [company.plateCompanyId, updateCompany]
    );

    useEffect(() => {
        editPlateCompanyDialog.confirmDialog.setDirty(method.formState.isDirty, {
            confirm_text    : 'common:button.save_and_close',
            delete_text     : 'common:button.close',
            max_width_dialog: '500px',
            onConfirm       : method.handleSubmit(submit),
            onDelete        : () => {}
        });
    }, [submit, method.formState.isDirty, editPlateCompanyDialog]);

    return (
        <FullDialog.Form
            methods={method}
            save={submit}
        >
            <EditPlateCompanyHeader
                company={company}
                onClose={onClose}
                isMutationLoading={loadingUpdate}
                isDirty={method.formState.isDirty}
            />
            <FullDialog.RowContent>
                <FullDialog.ColumnContent>
                    <EditPlateCompanyFields method={method} />
                </FullDialog.ColumnContent>
                <Documents
                    entityType={DocumentModel_DocumentEntityType.PLATE_COMPANY}
                    title={company.referenceId}
                    entityId={company.plateCompanyId}

                    // documents={company.documents}
                    // refresh={refetch}
                    // location={`plate_companies/${company.plate_company_id}/documents`}
                />
            </FullDialog.RowContent>
        </FullDialog.Form>
    );
}
