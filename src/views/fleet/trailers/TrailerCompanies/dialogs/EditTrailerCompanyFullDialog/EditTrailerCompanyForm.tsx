import FullDialog from '@/@core/ui-kits/full-dialog';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Documents from '@/@core/components/documents/Documents';
import { useEditTrailerCompanyDialog } from '@/views/fleet/trailers/TrailerCompanies/dialogs/EditTrailerCompanyFullDialog/EditTrailerCompany';
import TrailersTypes from '@/store/fleet/trailers/types';
import {
    default_values,
    schema
} from '@/views/fleet/trailers/TrailerCompanies/dialogs/EditTrailerCompanyFullDialog/helpers';
import EditTrailerCompanyHeader from '@/views/fleet/trailers/TrailerCompanies/dialogs/EditTrailerCompanyFullDialog/components/EditTrailerCompanyHeader';
import { TestIDs } from '@/configs/tests';
import EditTrailerCompanyFields from '@/views/fleet/trailers/TrailerCompanies/dialogs/EditTrailerCompanyFullDialog/components/EditTrailerCompanyFields';
import { useCallback, useEffect, useMemo } from 'react';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import TrailerCompaniesGrpcService from '@/@grpcServices/services/trailer-companies.service';
import { DefaultValues } from '@/views/fleet/trailers/TrailerCompanies/dialogs/TrailerCompany/components/defaultValues';

type Props = {
    company: TrailersTypes.TrailerCompany;
    refetch: () => void;
};

export default function EditTrailerCompanyForm({
    company,
    refetch
}: Props) {
    const editTrailerCompanyDialog = useEditTrailerCompanyDialog(true);

    const [updateCompany, { isLoading }] =
        TrailerCompaniesGrpcService.useUpdateTrailerCompanyMutation();

    const data_values: DefaultValues = useMemo(
        () => ({
            name       : company.name,
            phoneNumber: company.phoneNumber,
            email      : company.email
        }),
        [company.email, company.name, company.phoneNumber]
    );

    const method = useForm<DefaultValues>({
        defaultValues: default_values,
        values       : data_values,
        resolver     : yupResolver(schema)
    });

    const submit = useCallback(
        (data: DefaultValues) =>
            updateCompany({
                trailerCompanyId: company.trailerCompanyId,
                ...data
            }),
        [company.trailerCompanyId, updateCompany]
    );

    useEffect(() => {
        editTrailerCompanyDialog.confirmDialog.setDirty(method.formState.isDirty, {
            confirm_text    : 'common:button.save_and_close',
            delete_text     : 'common:button.close',
            max_width_dialog: '500px',
            onConfirm       : method.handleSubmit(submit),
            onDelete        : () => {}
        });
    }, [method.formState.isDirty, editTrailerCompanyDialog.confirmDialog, submit]);

    return (
        <FullDialog.Form
            testID={TestIDs.pages.trailersCompanies.areas.addCompanyModal}
            methods={method}
            save={submit}
        >
            <EditTrailerCompanyHeader
                company={company}
                onClose={editTrailerCompanyDialog.close}
                isMutationLoading={isLoading}
                isDirty={method.formState.isDirty}
            />
            <FullDialog.RowContent>
                <FullDialog.ColumnContent>
                    <EditTrailerCompanyFields method={method} />
                </FullDialog.ColumnContent>
                <Documents
                    entityId={company.trailerCompanyId}
                    entityType={DocumentModel_DocumentEntityType.TRAILER_COMPANY}
                    title={company.name}

                    // documents={company.documents}
                    // refresh={refetch}
                    // location={`trailer_companies/${company.trailer_company_id}/documents`}
                />
            </FullDialog.RowContent>
        </FullDialog.Form>
    );
}
