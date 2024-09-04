import React from 'react';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import { TakeOutStop } from '@/views/dispatch/manifests/modals/take-out';
import type ManifestsTypes from '@/store/dispatch/manifests/types';
import TakeOutActions from '@/@core/ui-kits/loads/load-stop/actions/TakeOutAction';
import EditRouteActions from '@/@core/ui-kits/loads/load-stop/actions/EditRouteActions';
import ManifestsSubHeaderFleet from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestsSubHeaderFleet';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import ManifestHeaderStyled from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestHeaderStyled';

type Props = {
    tableMode: TableMode;
    setTableMode: (mode: TableMode) => void;
    manifestId: string;
    selectedStops: TakeOutStop[];
    preparedStops: ManifestsTypes.AnyPreparedStop[];
    setSelectedStops: React.Dispatch<React.SetStateAction<TakeOutStop[]>>;
    isEqualStopsSequence: boolean;
    cancelEditRoute: () => void;
    truckId: string;
    trailerId: string;
    driverIds: string[];
    manifestFriendlyId: number | string;
    stops: ManifestModel_Stop[];
    loadId: string;
};

export default function ManifestsSubHeader({
    tableMode,
    setTableMode,
    manifestId,
    selectedStops,
    preparedStops,
    setSelectedStops,
    isEqualStopsSequence,
    cancelEditRoute,
    truckId,
    trailerId,
    driverIds,
    manifestFriendlyId,
    stops,
    loadId
}: Props) {
    return (
        <ManifestHeaderStyled.BottomWrapper>
            {tableMode === TableMode.NONE && (
                <ManifestsSubHeaderFleet
                    truckId={truckId}
                    trailerId={trailerId}
                    driverIds={driverIds}
                    manifestId={manifestId}
                    manifestFriendlyId={manifestFriendlyId}
                    stops={stops}
                    loadId={loadId}
                />
            )}

            {tableMode === TableMode.TAKE_ROUTE && (
                <TakeOutActions
                    selectedStops={selectedStops}
                    manifestId={manifestId}
                    setTableMode={setTableMode}
                    setSelectedStops={setSelectedStops}
                    preparedStops={preparedStops}
                />
            )}

            {tableMode === TableMode.EDIT_ROUTE && (
                <EditRouteActions
                    cancelEditRoute={cancelEditRoute}
                    isEqualStopsSequence={isEqualStopsSequence}
                    preparedStops={preparedStops}
                    manifestId={manifestId}
                    setTableMode={setTableMode}
                />
            )}
        </ManifestHeaderStyled.BottomWrapper>
    );
}
