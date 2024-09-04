import { memo, useCallback } from 'react';
import { Stack } from '@mui/material';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';

type Props = {
    driverId: string;
    insuranceEndorsed: boolean;
};

function InsuranceEndorsed({
    driverId,
    insuranceEndorsed
}: Props) {
    const { t } = useAppTranslation();
    const [updateDriverInsuranceEndorsed, { isLoading }] =
        DriversGrpcService.useUpdateDriverInsuranceEndorsedMutation();

    const handleChange = useCallback(() => {
        updateDriverInsuranceEndorsed({
            driverId,
            insuranceEndorsed: !insuranceEndorsed
        }).unwrap();
    }, [driverId, insuranceEndorsed]);

    return (
        <Stack
            justifyContent="center"
            height="100%"
            pl="20px"
        >
            <FormControlLabel
                control={(
                    <Checkbox
                        size="medium"
                        checked={insuranceEndorsed}
                        onChange={handleChange}
                        disabled={isLoading}
                        aria-label="Insurance endorsed"
                    />
                )}
                label={t('common:insurance_endorsed')}
                style={{ margin: 0, gap: '6px' }}
            />
        </Stack>
    );
}

export default memo(InsuranceEndorsed);
