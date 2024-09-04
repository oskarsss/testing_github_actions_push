import FullDialog from '@/@core/ui-kits/full-dialog';
import PlatesTypes from '@/store/fleet/plates/types';
import PlateCompaniesGrpcService from '@/@grpcServices/services/plate-companies.service';

type Props = {
    company: PlatesTypes.PlateCompany;
    onClose: () => void;
    isMutationLoading: boolean;
    isDirty: boolean;
};

export default function EditPlateCompanyHeader({
    company,
    onClose,
    isMutationLoading,
    isDirty
}: Props) {
    const [deleteCompany, { isLoading: loadingDelete }] =
        PlateCompaniesGrpcService.useDeletePlateCompanyMutation();

    const onDelete = () => {
        deleteCompany({
            plateCompanyId: company.plateCompanyId
        })
            .unwrap()
            .then(onClose);
    };
    return (
        <FullDialog.Header>
            <FullDialog.HeaderTitle
                title="modals:plate_companies.edit.header.title"
                translationOptions={{ name: company.name }}
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
