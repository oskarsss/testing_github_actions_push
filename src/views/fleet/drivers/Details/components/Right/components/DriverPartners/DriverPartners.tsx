import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TruckModel_Truck_Driver } from '@proto/models/model_truck';
import DriverPartner from './DriverPartner';

type Props = {
    drivers: TruckModel_Truck_Driver[];
};

const DriverPartners = ({ drivers }: Props) => {
    const { t } = useAppTranslation('drivers');

    return (
        <RightStyled.IconBlock>
            <Box>
                <Typography>{t('profile.right.partners.title')}</Typography>
            </Box>
            {drivers && drivers.length > 0 ? (
                drivers.map((partner) => (
                    <DriverPartner
                        key={partner.driverId}
                        partner={partner}
                    />
                ))
            ) : (
                <RightStyled.EmptyElement variant="body2">
                    {t('profile.right.partners.no_partners')}
                </RightStyled.EmptyElement>
            )}
        </RightStyled.IconBlock>
    );
};

export default memo(DriverPartners);
