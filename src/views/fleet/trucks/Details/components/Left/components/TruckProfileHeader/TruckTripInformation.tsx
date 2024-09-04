import { MouseEvent } from 'react';
import Typography from '@mui/material/Typography';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import Tooltip from '@mui/material/Tooltip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TrucksTypes from '@/store/fleet/trucks/types';
import { useTruckLoadsMenu } from '@/views/fleet/trucks/menus/TruckLoadsMenu';
import TripInformationStyled from '@/@core/ui-kits/profiles/components/trip-information/TripInformation.styled';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { TruckModel_Truck } from '@proto/models/model_truck';

type Props = {
    truck: TruckModel_Truck;
};

export default function TruckTripInformation({ truck }: Props) {
    const { data } = TrucksGrpcService.useRetrieveTruckStatsQuery({
        truckId: truck.truckId
    });

    const loadsMenu = useTruckLoadsMenu();
    const { t } = useAppTranslation();

    const openLoadsMenu = (event: MouseEvent<HTMLElement>) => {
        loadsMenu.open({
            truckId     : truck.truckId,
            reference_id: truck.referenceId
        })(event);
    };

    const hasCompletedOrders = !!data?.orders;
    return (
        <TripInformationStyled.Grid>
            <Tooltip
                title={t('trucks:profile.left.trip_information.title')}
                disableHoverListener={!hasCompletedOrders}
            >
                <TripInformationStyled.InformationWrapper>
                    <TripInformationStyled.InformationWrapperButton
                        disabled={!hasCompletedOrders}
                        clickable={hasCompletedOrders}
                        onClick={openLoadsMenu}
                    >
                        <div style={{ border: 'none', padding: 0 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: ({ palette }) =>
                                        `${palette.semantic.text.brand.primary} !important`
                                }}
                            >
                                {data?.orders || ''}
                            </Typography>
                            <Typography>
                                {t('trucks:profile.left.trip_information.loads')}
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
                <Typography
                    sx={{
                        color: ({ palette }) => `${palette.semantic.text.brand.primary} !important`
                    }}
                    variant="h5"
                >
                    {data?.miles || ''}
                </Typography>
                <Typography>{t('trucks:profile.left.trip_information.miles_driven')}</Typography>
            </TripInformationStyled.InformationWrapper>
        </TripInformationStyled.Grid>
    );
}
