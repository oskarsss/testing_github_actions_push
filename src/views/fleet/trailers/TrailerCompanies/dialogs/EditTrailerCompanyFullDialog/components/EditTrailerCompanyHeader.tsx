import FullDialog from '@/@core/ui-kits/full-dialog';
import TrailersTypes from '@/store/fleet/trailers/types';
import TrailerCompaniesGrpcService from '@/@grpcServices/services/trailer-companies.service';

type Props = {
    company: TrailersTypes.TrailerCompany;
    onClose: () => void;
    isMutationLoading: boolean;
    isDirty: boolean;
};

export default function EditTrailerCompanyHeader({
    company,
    onClose,
    isMutationLoading,
    isDirty
}: Props) {
    const [deleteCompany, { isLoading: loadingDelete }] =
        TrailerCompaniesGrpcService.useDeleteTrailerCompanyMutation();

    const onDelete = () => {
        deleteCompany({
            trailerCompanyId: company.trailerCompanyId
        })
            .unwrap()
            .then(onClose);
    };
    return (
        <FullDialog.Header>
            <FullDialog.HeaderTitle
                title="modals:trailer_companies.edit.header.title"
                translationOptions={{ companyName: company.name }}
            />
            <FullDialog.ActionsWrapper>
                <FullDialog.DeleteButton
                    isLoading={loadingDelete}
                    onClick={onDelete}
                    disabled={isMutationLoading}
                />
                <FullDialog.SaveButton
                    isDisabled={!isDirty}
                    isLoading={isMutationLoading}
                />
                <FullDialog.CloseButton onClose={onClose} />
            </FullDialog.ActionsWrapper>
        </FullDialog.Header>
    );
}
