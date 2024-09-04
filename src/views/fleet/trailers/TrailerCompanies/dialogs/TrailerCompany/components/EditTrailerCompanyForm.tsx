import { useForm } from 'react-hook-form';
import {
    DefaultValues,
    defaultValues
} from '@/views/fleet/trailers/TrailerCompanies/dialogs/TrailerCompany/components/defaultValues';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/views/fleet/trailers/TrailerCompanies/dialogs/TrailerCompany/components/schema';
import TrailerCompany from '@/views/fleet/trailers/TrailerCompanies/dialogs/TrailerCompany/components/TrailerCompany';
import TrailersTypes from '@/store/fleet/trailers/types';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useEditTrailerCompanyDialog } from '@/views/fleet/trailers/TrailerCompanies/dialogs/TrailerCompany/EditTrailerCompany';
import { useEffect } from 'react';
import TrailerCompaniesGrpcService from '@/@grpcServices/services/trailer-companies.service';

type Props = {
    company: TrailersTypes.TrailerCompany;
};

export default function EditTrailerCompanyForm({ company }: Props) {
    const editCompanyDialog = useEditTrailerCompanyDialog(true);

    const [updateCompany, { isLoading }] =
        TrailerCompaniesGrpcService.useUpdateTrailerCompanyMutation();
    const [deleteCompany, { isLoading: loadingDelete }] =
        TrailerCompaniesGrpcService.useDeleteTrailerCompanyMutation();

    const method = useForm<DefaultValues>({
        defaultValues,
        values: {
            name       : company.name,
            phoneNumber: company.phoneNumber,
            email      : company.email
        },
        resolver: yupResolver(schema)
    });
    const submit = (data: DefaultValues) => {
        updateCompany({
            trailerCompanyId: company.trailerCompanyId,
            name            : data.name,
            phoneNumber     : data.phoneNumber,
            email           : data.email
        })
            .unwrap()
            .then(editCompanyDialog.forceClose);
    };

    const onDelete = () => {
        deleteCompany({
            trailerCompanyId: company.trailerCompanyId
        })
            .unwrap()
            .then(editCompanyDialog.forceClose);
    };

    useEffect(() => {
        editCompanyDialog.confirmDialog.setDirty(method.formState.isDirty);
    }, [editCompanyDialog, method.formState.isDirty]);

    return (
        <TrailerCompany
            title="modals:trailer_companies.edit.header.title"
            translationOptions={{ companyName: company.name }}
            method={method}
            submit={submit}
        >
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={editCompanyDialog.close} />
                <DialogComponents.DeleteButton
                    loading={loadingDelete}
                    onClick={onDelete}
                    disabled={isLoading}
                />
                <DialogComponents.SubmitButton
                    loading={isLoading}
                    type="update"
                    disabled={loadingDelete}
                />
            </DialogComponents.ActionsWrapper>
        </TrailerCompany>
    );
}
