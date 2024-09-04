import { memo, useCallback } from 'react';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import Checkbox from '@mui/material/Checkbox';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';

type Props = {
    driverId: string;
    insuranceEndorsed: boolean;
    driverName: string;
};

function InsuranceEndorsed({
    driverId,
    insuranceEndorsed,
    driverName
}: Props) {
    const confirm = useConfirm();
    const [updateDriverInsuranceEndorsed, { isLoading }] =
        DriversGrpcService.useUpdateDriverInsuranceEndorsedMutation();

    const handleChange = useCallback(() => {
        updateDriverInsuranceEndorsed({
            driverId,
            insuranceEndorsed: !insuranceEndorsed
        }).unwrap();
    }, [driverId, insuranceEndorsed, updateDriverInsuranceEndorsed]);

    const confirmChange = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'drivers:table.confirm_dialog.insurance_endorsed.title',
            body              : 'drivers:table.confirm_dialog.insurance_endorsed.description',
            confirm_text      : 'common:button.confirm',
            max_width_dialog  : '460px',
            translationOptions: {
                title: { driverName }
            },
            onConfirm: handleChange
        });
    };

    return (
        <Checkbox
            checked={insuranceEndorsed}
            onChange={confirmChange}
            disabled={false}
            aria-label="Insurance Endorsed"
            sx={{
                '&:hover': {
                    backgroundColor: 'transparent !important',
                    boxShadow      : 'none'
                }
            }}
        />
    );
}

export default memo(InsuranceEndorsed);
