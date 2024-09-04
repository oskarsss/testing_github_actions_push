import { MouseEvent, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import Tooltip from '@mui/material/Tooltip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriverLoadsMenu } from '@/views/fleet/drivers/Details/menus/DriverLoadsMenu';
import DriversTypes from '@/store/fleet/drivers/types';
import TripInformationStyled from '@/@core/ui-kits/profiles/components/trip-information/TripInformation.styled';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { DriverStatsRetrieveReply_Stats } from '@proto/drivers';
import { DriverModel_Driver } from '@proto/models/model_driver';

type Props = {
    driver: DriverModel_Driver;
};

export default function DriverTripInformation({ driver }: Props) {
    const loadsMenu = useDriverLoadsMenu();
    const { t } = useAppTranslation();
    const { data } = DriversGrpcService.useGetDriverStatsQuery({
        driverId: driver.driverId
    });

    const stats = useMemo(
        (): DriverStatsRetrieveReply_Stats =>
            data?.stats || {
                totalCount: 0,
                totalMiles: 0
            },
        [data]
    );

    const openLoadsMenu = (event: MouseEvent<HTMLElement>) => {
        loadsMenu.open({
            driverId  : driver.driverId,
            driverName: `${driver.firstName}`
        })(event);
    };

    const hasCompletedLoads = !!stats?.totalCount;
    return (
        <TripInformationStyled.Grid>
            <Tooltip
                title={t('drivers:profile.left.header.trip_information.tooltip')}
                disableHoverListener={!hasCompletedLoads}
            >
                <TripInformationStyled.InformationWrapper>
                    <TripInformationStyled.InformationWrapperButton
                        disabled={!hasCompletedLoads}
                        clickable={hasCompletedLoads}
                        onClick={openLoadsMenu}
                    >
                        <div style={{ border: 'none', padding: 0 }}>
                            <Typography variant="h5">{stats.totalCount}</Typography>
                            <Typography>
                                {t('drivers:profile.left.header.trip_information.loads')}
                            </Typography>
                        </div>

                        <AdsClickIcon
                            sx={(theme) => ({
                                color: theme.palette.semantic.text.secondary
                            })}
                        />
                    </TripInformationStyled.InformationWrapperButton>
                </TripInformationStyled.InformationWrapper>
            </Tooltip>

            <TripInformationStyled.InformationWrapper>
                <Typography variant="h5">{stats.totalMiles}</Typography>
                <Typography>
                    {t('drivers:profile.left.header.trip_information.miles_driven')}
                </Typography>
            </TripInformationStyled.InformationWrapper>
        </TripInformationStyled.Grid>
    );
}
