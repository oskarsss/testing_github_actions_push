import { useAppTranslation } from '@/hooks/useAppTranslation';
import FullDialog from '@/@core/ui-kits/full-dialog';
import Typography from '@mui/material/Typography';
import { TestIDs } from '@/configs/tests';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import type { VendorModel_Vendor } from '@proto/models/model_vendor';
import VendorsGrpcService from '@/@grpcServices/services/vendors.service';
import { useEditVendorForm } from '../EditVendorForm';
import { useEditVendorDialog } from '../EditVendor';

type Props = {
    vendor: VendorModel_Vendor;
    isMutationLoading: boolean;
    onClose: () => void;
};

export default function EditTruckHeaderContent({
    vendor,
    isMutationLoading,
    onClose
}: Props) {
    const { t } = useAppTranslation();
    const editVendorDialog = useEditVendorDialog();
    const [deleteVendor, { isLoading }] = VendorsGrpcService.useDeleteVendorMutation();
    const confirm = useConfirm();

    const onDelete = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'modals:vendors.delete.title',
            body              : 'modals:vendors.delete.body',
            confirm_text      : 'common:button.delete',
            translationOptions: {
                title: {
                    name: vendor.name
                }
            },
            onConfirm: () =>
                deleteVendor({
                    vendorId: vendor.vendorId
                })
                    .unwrap()
                    .then(editVendorDialog.close)
        });
    };

    const {
        formState: { isDirty }
    } = useEditVendorForm();

    return (
        <FullDialog.Header>
            <FullDialog.HeaderTitle title="modals:vendors.edit.header.title">
                <Typography
                    variant="body2"
                    component="span"
                    sx={{ display: 'block' }}
                >
                    {t('modals:vendors.edit.header.sub_title')}
                </Typography>
            </FullDialog.HeaderTitle>

            <FullDialog.ActionsWrapper>
                <FullDialog.SaveButton
                    testId={TestIDs.pages.editVendor.buttons.updateVendor}
                    isDisabled={!isDirty}
                    isLoading={isMutationLoading}
                    type="update"
                />
                <FullDialog.DeleteButton
                    disabled={isLoading}
                    isLoading={isMutationLoading}
                    onClick={onDelete}
                />
                <FullDialog.CloseButton
                    onClose={onClose}
                    testId={TestIDs.pages.editVendor.buttons.closeEditVendor}
                />
            </FullDialog.ActionsWrapper>
        </FullDialog.Header>
    );
}
