import React, { MouseEvent } from 'react';
import LoadOverviewStyled from '@/views/dispatch/orders/Details/sections/load-overview/LoadOverview.styled';
import VectorIcons from '@/@core/icons/vector_icons';

import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAssignTruckToManifestMenu } from '@/@core/components/assign/modals/AssignTruckToManifest';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import { isEqual } from 'lodash';
import LoadOverviewButtons from './components/load-overview-buttons/LoadOverviewButtons';
import LoadOverviewClient from './components/load-overview-client/LoadOverviewClient';
import LoadOverviewTrailer from './components/load-overview-trailer/LoadOverviewTrailer';
import LoadOverviewTruck from './components/load-overview-truck/LoadOverviewTruck';
import LoadOverviewDriver from './components/load-overview-driver/LoadOverviewDriver';

type Props = {
    brokerId: string;
    customerId: string;
    referenceId: string;
    truckId: string;
    trailerId: string;
    driverId: string;
    driverIds: string[];
    activeManifestId: string;
    activeManifestFriendlyId: string;
    activeManifestStops: ManifestModel_Stop[];
    loadId: string;
    loadFriendlyId: string;
};

function LoadOverview({
    brokerId,
    customerId,
    referenceId,
    truckId,
    trailerId,
    driverId,
    driverIds,
    activeManifestId,
    activeManifestFriendlyId,
    activeManifestStops,
    loadId,
    loadFriendlyId
}: Props) {
    const assignTruckToManifestMenu = useAssignTruckToManifestMenu();
    const { t } = useAppTranslation('loads');

    const assignTruck = (event: MouseEvent<HTMLButtonElement>) => {
        assignTruckToManifestMenu.open({
            manifestFriendlyId      : activeManifestFriendlyId,
            manifestId              : activeManifestId,
            alertAssignTruckFromLoad: true,
            stops                   : activeManifestStops,
            loadId
        })(event);
    };

    return (
        <LoadOverviewStyled.Container>
            <LoadOverviewStyled.Wrapper
                sx={{
                    flex: '1 1 100%'
                }}
                style={{ flexGrow: 1 }}
                no_truck={!truckId}
            >
                {!truckId ? (
                    <HotKeyTooltip
                        title="common:manifests.assign_truck"
                        hot_keys="A"
                    >
                        <LoadOverviewStyled.ButtonAssignTruck
                            onClick={assignTruck}
                            startIcon={<VectorIcons.NavIcons.EmptyTruck />}
                        >
                            {t('details.overview.empty_state.no_truck')}
                        </LoadOverviewStyled.ButtonAssignTruck>
                    </HotKeyTooltip>
                ) : (
                    <>
                        <LoadOverviewDriver
                            manifestId={activeManifestId}
                            primaryDriverId={driverId}
                            driverIds={driverIds}
                        />
                        <LoadOverviewStyled.Divider />
                        <LoadOverviewTruck truckId={truckId} />
                        <LoadOverviewStyled.Divider />
                        <LoadOverviewTrailer trailerId={trailerId} />
                        <LoadOverviewStyled.Divider />
                        <LoadOverviewButtons
                            loadId={loadId}
                            truckId={truckId}
                            activeManifestId={activeManifestId}
                            activeManifestFriendlyId={activeManifestFriendlyId}
                        />
                    </>
                )}
            </LoadOverviewStyled.Wrapper>
            <LoadOverviewClient
                brokerId={brokerId}
                customerId={customerId}
                referenceId={referenceId}
                loadId={loadId}
                loadFriendlyId={loadFriendlyId}
            />
        </LoadOverviewStyled.Container>
    );
}

export default React.memo(LoadOverview, isEqual);
