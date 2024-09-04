import { useAppSelector } from '@/store/hooks';
import { useEffect, useMemo } from 'react';
import { RootState } from '@/store/types';
import { showConfetti } from '@/utils/show-confetti';
import LoadOverview from '@/views/dispatch/orders/Details/sections/load-overview/LoadOverview';
import LoadHeader from '@/views/dispatch/orders/Details/sections/load-header/LoadHeader';
import { Stack, SxProps, Theme } from '@mui/material';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import { LoadData_Load } from '@proto/loads';
import useOrderActiveManifest from '@/store/storage/orders/hooks/useOrderActiveManifest';
import LoadCharacteristics from './sections/load-characteristics/LoadCharacteristics';
import LoadMap from './sections/load-map/LoadMap';
import LoadStopsProgressBar from './sections/load-stops-progress-bar/LoadStopsProgressBar';
import LoadDetailsViewStyled from './LoadDetailsView.styled';
import LoadTabs from './sections/load-tabs/LoadTabs';
import LoadNotes from './sections/load-notes/LoadsDetailsNotes';

type Props = {
    sxContainer?: SxProps<Theme>;
    load: LoadData_Load;
};

export default function LoadDetailsView({
    sxContainer,
    load
}: Props) {
    const {
        driverId,
        manifest,
        trailerId,
        truckId,
        driverIds
    } = useOrderActiveManifest(load);

    const isShowConfetti = useAppSelector(
        (state: RootState) => state.loads.isNewLoadCreated === true
    );

    const count = load && load.companyNet ? Number(load.companyNet) / 100 : 10;
    const src =
        'https://www.uscurrency.gov/sites/default/files/styles/bill_version/public/denominations/100-front-2013-present.webp?itok=pNWp6Fci';

    useEffect(() => {
        if (isShowConfetti) {
            setTimeout(() => {
                showConfetti(count, src);
            }, 1000);
        }
    }, [isShowConfetti]);

    const stops: ManifestModel_Stop[] = useMemo(() => {
        if (!load?.loadId) return [];
        return load.manifests.reduce((acc, manifest) => {
            manifest.stops.forEach((stop) => {
                if (stop.loadId === load.loadId) {
                    acc.push(stop);
                }
            });
            return acc;
        }, [] as ManifestModel_Stop[]);
    }, [load?.manifests, load?.loadId]);

    if (!load) return null;

    return (
        <Stack
            width="100%"
            gap="16px"
            overflow="auto"
            padding="20px 20px 0 20px"
            sx={sxContainer}
        >
            <LoadHeader
                loadFriendlyId={load.friendlyId}
                loadId={load.loadId}
                loadStatus={load.status}
                loadInvoiceStatus={load.invoiceStatus}
                truckId={truckId}
            />

            <LoadOverview
                loadId={load.loadId}
                brokerId={load.brokerId}
                customerId={load.customerId}
                referenceId={load.referenceId}
                truckId={truckId}
                trailerId={trailerId}
                driverId={driverId}
                driverIds={driverIds}
                activeManifestId={load.activeManifestId}
                loadFriendlyId={load.friendlyId}
                activeManifestFriendlyId={manifest?.friendlyId.toString() || ''}
                activeManifestStops={manifest?.stops || []}
            />

            <LoadDetailsViewStyled.MiddleContainer>
                <LoadCharacteristics
                    loadedMiles={load.loadedMiles}
                    emptyMiles={load.emptyMiles}
                    invoiceAmount={load.invoiceAmount}
                    ratePerMileFormatted={load.ratePerMileFormatted}
                    commodity={load.commodity}
                    temperatureFormatted={load.temperatureFormatted}
                    weightFormatted={load.weightFormatted}
                    dispatcherId={load.dispatcherId}
                    equipmentId={load.equipmentId}
                />
                <LoadMap order={load} />
            </LoadDetailsViewStyled.MiddleContainer>

            <LoadStopsProgressBar
                stops={stops}
                loadId={load.loadId}
                truckId={truckId}
                activeManifestId={load.activeManifestId}
            />

            <LoadDetailsViewStyled.BottomContainer>
                <LoadTabs load={load} />
                <LoadNotes
                    loadId={load.loadId}
                    manifests={load.manifests}
                />
            </LoadDetailsViewStyled.BottomContainer>
        </Stack>
    );
}
