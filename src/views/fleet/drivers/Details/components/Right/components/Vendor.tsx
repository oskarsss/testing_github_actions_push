import { memo, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Fade, Tooltip } from '@mui/material';
import { CompanyBlock } from '@/views/fleet/trailers/Details/components/Right/styled';
import AddIcon from '@mui/icons-material/Add';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { useSelectVendorDialog } from '@/views/fleet/drivers/Details/dialogs/SelectVendor/SelectVendor';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { applyTestId, TestIDs } from '@/configs/tests';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useEditVendorDialog } from '@/views/fleet/vendors/dialogs/EditVendor/EditVendor';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';

type Props = {
    id: string;
    vendor_id: string;
    name: string;
    disabledAssign?: boolean;
};

const Vendor = ({
    id,
    vendor_id,
    name,
    disabledAssign
}: Props) => {
    const { t } = useAppTranslation();
    const selectVendorDialog = useSelectVendorDialog();
    const editVendorDialog = useEditVendorDialog();
    const [removeVendor] = DriversGrpcService.useRemoveVendorFromDriverMutation();
    const confirm = useConfirm();

    const removeDriverVendor = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'drivers:profile.right.vendor.dialog.unassign.title',
            body              : 'drivers:profile.right.vendor.dialog.unassign.description',
            confirm_text      : 'common:button.unassign',
            max_width_dialog  : '500px',
            translationOptions: {
                title: { name }
            },
            onConfirm: () =>
                removeVendor({
                    driverId: id,
                    vendorId: vendor_id
                }).unwrap()
        });
    };

    const openVendorMenu = () => {
        selectVendorDialog.open({ id });
    };

    const openEditVendorDialog = () => {
        editVendorDialog.open({ vendor_id });
    };

    const remove = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        removeDriverVendor();
    };

    return (
        <RightStyled.IconBlock>
            <Box>
                <Typography>{t('drivers:profile.right.vendor.title')}</Typography>

                {!vendor_id && (
                    <Button
                        onClick={openVendorMenu}
                        startIcon={<AddIcon />}
                        disabled={disabledAssign}
                        {...applyTestId(TestIDs.pages.driverProfile.buttons.selectVendor)}
                    >
                        {t('common:button.select')}
                    </Button>
                )}
            </Box>
            {vendor_id ? (
                <Fade in>
                    <RightStyled.VendorWrap onClick={openEditVendorDialog}>
                        <CompanyBlock>
                            <VectorIcons.DetailsIcons.Company />
                            <Typography variant="body1">{name}</Typography>
                        </CompanyBlock>

                        <Tooltip title={t('drivers:profile.right.vendor.tooltip')}>
                            <RightStyled.IconButton
                                isUnassign
                                onClick={remove}
                                {...applyTestId(TestIDs.pages.driverProfile.buttons.removeVendor)}
                            >
                                <VectorIcons.Garbage />
                            </RightStyled.IconButton>
                        </Tooltip>
                    </RightStyled.VendorWrap>
                </Fade>
            ) : (
                <RightStyled.EmptyElement variant="body2">
                    {t('drivers:profile.right.vendor.no_vendor')}
                </RightStyled.EmptyElement>
            )}
        </RightStyled.IconBlock>
    );
};

export default memo(Vendor);
