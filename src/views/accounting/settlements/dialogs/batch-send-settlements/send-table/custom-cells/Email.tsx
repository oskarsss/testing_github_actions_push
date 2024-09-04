import { useWatch } from 'react-hook-form';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';
import { useEditVendorDialog } from '@/views/fleet/vendors/dialogs/EditVendor/EditVendor';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useBatchSendSettlementsForm } from '../../BatchSendSettlements';

type Props = {
    rowIndex: number;
    driverId: string;
    vendorId: string;
};

export default function Email({
    rowIndex,
    driverId,
    vendorId
}: Props) {
    const { control } = useBatchSendSettlementsForm();
    const { t } = useAppTranslation();
    const email = useWatch({ control, exact: true, name: `sends.${rowIndex}.email` });
    const phone = useWatch({ control, exact: true, name: `sends.${rowIndex}.phoneNumber` });
    const rec = useWatch({ control, exact: true, name: `sends.${rowIndex}.recipient` });
    const editDriverDialog = useEditDriverDialog();
    const editVendorDialog = useEditVendorDialog();

    const onClick = () => {
        if (rec === 'driver') {
            editDriverDialog.open({ driver_id: driverId });
        } else {
            editVendorDialog.open({ vendor_id: vendorId });
        }
    };

    const isValid = email || phone;
    return (
        <Stack
            direction="row"
            alignItems="content"
        >
            <Typography
                fontSize="14px"
                variant="body1"
                fontWeight={500}
                noWrap
                textOverflow="ellipsis"
                maxWidth={150}
            >
                {email}
            </Typography>
            {!isValid && (
                <Tooltip
                    title={t(
                        'modals:settlements.batch_send_settlements.table.tooltips.email_invalid'
                    )}
                    disableInteractive
                    placement="top"
                >
                    <Box
                        onClick={onClick}
                        sx={{
                            width     : '100%',
                            display   : 'flex',
                            alignItems: 'center',
                            svg       : {
                                fill: ({ palette }) => palette.utility.foreground.error.primary
                            }
                        }}
                    >
                        <ErrorIcon />
                    </Box>
                </Tooltip>
            )}
        </Stack>
    );
}
