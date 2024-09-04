import { Stack, styled, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Amount } from '@proto/models/amount';
import { Distance } from '@proto/models/distance';
import TrailerControlContent from '@/views/dispatch/manifests/components/controls/TrailerControlContent';
import TruckControl from '@/views/dispatch/manifests/details/sections/equipment/components/TruckControl';
import DriverControl from '@/views/dispatch/manifests/details/sections/equipment/components/DriverControl';
import RouteButton from '@/@core/components/route-button/RouteButton';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import { memo } from 'react';
import ManifestDetailsIcons from '../../icons';
import EquipmentOverview from './components/Overview';
import Miles from './components/Miles';
import AssignTruckControl from '../../../components/controls/AssignTruckControl';

const Header = styled('div')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    paddingBottom : '12px',
    justifyContent: 'space-between',
    borderBottom  : `1px solid ${theme.palette.semantic.border.secondary}`
}));

const ItemContainer = styled('div')(({ theme }) => ({
    display     : 'flex',
    alignItems  : 'center',
    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`,
    padding     : '8px 0px'
}));

const ItemInnerContainer = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    minHeight     : '40px',
    maxHeight     : '40px',
    width         : '100%'
});

type Props = {
    loadedDistance?: Distance;
    emptyDistance?: Distance;
    gross?: Amount;
    totalMiles: string;
    driverIds: string[];
    trailerId: string;
    truckId: string;
    manifestId: string;
    manifestFriendlyId: string;
    rpm?: Amount;
    stops: ManifestModel_Stop[];
};

function Equipment({
    loadedDistance,
    emptyDistance,
    gross,
    totalMiles,
    driverIds,
    trailerId,
    truckId,
    manifestFriendlyId,
    manifestId,
    rpm,
    stops
}: Props) {
    const { t } = useAppTranslation();
    return (
        <>
            <Header>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="4px"
                >
                    <ManifestDetailsIcons.Equipment color="primary" />
                    <Typography
                        fontWeight={600}
                        fontSize="16px"
                    >
                        {t('common:equipment')}
                    </Typography>
                </Stack>
            </Header>
            <Stack
                direction="column"
                flex="1 1 100%"
                paddingBottom="7px"
            >
                {truckId ? (
                    <>
                        <ItemContainer>
                            <ItemInnerContainer>
                                <TruckControl
                                    kind="text"
                                    showRouteButton
                                    truckId={truckId}
                                    manifestId={manifestId}
                                    manifestFriendlyId={manifestFriendlyId}
                                />
                            </ItemInnerContainer>
                        </ItemContainer>

                        <ItemContainer>
                            <ItemInnerContainer>
                                <TrailerControlContent trailerId={trailerId}>
                                    <RouteButton path={`/trailers/${trailerId}`} />
                                </TrailerControlContent>
                            </ItemInnerContainer>
                        </ItemContainer>

                        <ItemContainer>
                            <ItemInnerContainer>
                                <DriverControl
                                    showRouteButton
                                    manifestId={manifestId}
                                    driverIds={driverIds}
                                />
                            </ItemInnerContainer>
                        </ItemContainer>
                    </>
                ) : (
                    <AssignTruckControl
                        stops={stops}
                        manifestId={manifestId}
                        manifestFriendlyId={manifestFriendlyId}
                    />
                )}
            </Stack>

            <Miles
                manifestId={manifestId}
                loadedDistance={loadedDistance}
                emptyDistance={emptyDistance}
            />

            <EquipmentOverview
                manifestId={manifestId}
                gross={gross}
                totalMiles={totalMiles}
                rpm={rpm}
            />
        </>
    );
}

export default memo(Equipment);
