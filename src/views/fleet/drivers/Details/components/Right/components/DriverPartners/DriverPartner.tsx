import Typography from '@mui/material/Typography';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { latestActivity } from '@/@core/ui-kits/page-headers/components/AvatarGroup/utils';
import Fade from '@mui/material/Fade';
import navigateToPage from '@/utils/navigateToPage';
import { useLastDriverPing } from '@/store/streams/events/hooks';
import DriversTypes from '@/store/fleet/drivers/types';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import type { MouseEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TruckModel_Truck_Driver } from '@proto/models/model_truck';
import { useDriverById } from '@/store/storage/drivers/hooks/common';

type Props = {
    partner: TruckModel_Truck_Driver;
};

export default function DriverPartner({ partner }: Props) {
    const driver = useDriverById(partner.driverId);
    const { url } = usePrivateFileUrl(driver.selfieThumbUrl);
    const lastPing = useLastDriverPing(partner.driverId);
    const { t } = useAppTranslation();

    const moveToDriverDetails = (e: MouseEvent) => {
        navigateToPage(`/drivers/${partner.driverId}`, e);
    };

    const last_seen = lastPing
        ? latestActivity(lastPing.timestamp, t)
        : t('common:last_seen_not_available');

    return (
        <Fade in>
            <RightStyled.UserWrapper onClick={moveToDriverDetails}>
                <RightStyled.UserBlock>
                    <RightStyled.AvatarStyled
                        alt={driver.firstName + driver.lastName}
                        src={url}
                    />

                    <RightStyled.UserInfo>
                        <RightStyled.WrapperInfo>
                            <RightStyled.UserInfoContent>
                                <Typography variant="h6">
                                    {driver.firstName} {driver.lastName}
                                </Typography>

                                <Typography variant="body2">{last_seen}</Typography>
                            </RightStyled.UserInfoContent>
                        </RightStyled.WrapperInfo>
                    </RightStyled.UserInfo>
                </RightStyled.UserBlock>
            </RightStyled.UserWrapper>
        </Fade>
    );
}
