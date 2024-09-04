/* eslint-disable no-mixed-operators */
import CenterStyled from '@/views/fleet/drivers/Details/components/Center/styled';
import Header, { View } from '@/views/fleet/drivers/Details/components/Center/Header/Header';
import Notes from '@/@core/components/notes/Notes';
import { useEffect, useMemo } from 'react';
import Content from '@/views/fleet/drivers/Details/components/Center/tabs/Tabs';
import Documents from '@/views/fleet/drivers/Details/components/Center/tabs/Documents/Documents';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { countInvalidDocuments } from '@/@core/components/documents/utils';
import { TestIDs } from '@/configs/tests';
import { trucksActions } from '@/store/fleet/trucks/slice';
import MapWrapper from '@/views/fleet/drivers/Details/components/Center/tabs/Map/MapWrapper';
import {
    useDriverLocations,
    useTrailerLocation,
    useTruckLocation
} from '@/store/streams/events/hooks';
import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import Profiles from '@/@core/ui-kits/profiles';
import useTabQuery from '@/hooks/useTabQuery';
import { VehicleMaintenanceModel_VehicleType } from '@proto/models/model_vehicle_maintenance';
import { SettlementTransactionCategoryModel_EntityType } from '@proto/models/model_settlement.transaction_category';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { usePlatesMap } from '@/store/hash_maps/hooks';
import { useTrailerById } from '@/store/storage/trailers/hooks/common';
import { useDriverById } from '@/store/storage/drivers/hooks/common';

type Props = {
    truck: TruckModel_Truck;
};

export default function Center({ truck }: Props) {
    const dispatch = useAppDispatch();
    const document_id = useAppSelector((state) => state.documents.truck);
    const selectedViewId = useAppSelector((state) => state.trucks.tab_id);
    const primaryDriverId = truck?.drivers.find((ht) => ht.primary)?.driverId;
    const primaryDriver = useDriverById(primaryDriverId || '');
    const truckLocation = useTruckLocation(truck.truckId);
    const driverLocations = useDriverLocations(primaryDriverId);
    const trailer = useTrailerById(truck.trailerId);
    const plate = usePlatesMap(truck.plateId);
    const trailerLocation = useTrailerLocation(trailer?.trailerId);

    const {
        tab_id,
        setTab
    } = useTabQuery(DETAILS_TABS_IDS.MAIN_NOTES, DETAILS_TABS_IDS.FINANCE);

    const { documents } = useGetDocumentsByEntityType({
        entityId  : truck.truckId,
        entityType: DocumentModel_DocumentEntityType.TRUCK
    });

    useEffect(() => {
        if (tab_id) {
            dispatch(trucksActions.selectTab(tab_id));
        } else {
            dispatch(trucksActions.selectTab(DETAILS_TABS_IDS.MAIN_NOTES));
        }
    }, [tab_id]);

    // const setTab = (tab_id: DETAILS_TABS_IDS) => {
    //     dispatch(trucksActions.selectTab(tab_id));
    // };

    useEffect(
        () => () => {
            dispatch(trucksActions.selectTab(DETAILS_TABS_IDS.MAIN_NOTES));
        },
        []
    );

    useEffect(() => {
        if (document_id) {
            setTab(DETAILS_TABS_IDS.DOCUMENTS);
        }
    }, [document_id]);

    const VIEWS: View[] = [
        {
            id      : DETAILS_TABS_IDS.MAIN_NOTES,
            name    : 'common:profile.center.title.all_notes',
            children: (
                <Notes
                    entity_id={truck.truckId}
                    entity_type="truck"
                    size="normal"
                    isHideHeader
                />
            )
        },
        {
            id      : DETAILS_TABS_IDS.TEAM_NOTES,
            name    : 'common:profile.center.title.team_notes',
            children: (
                <Notes
                    entity_id={truck.truckId}
                    entity_type="truck"
                    note_type="team"
                    size="normal"
                    isHideHeader
                />
            )
        },
        {
            id      : DETAILS_TABS_IDS.DRIVER_NOTES,
            name    : 'common:profile.center.title.driver_notes',
            children: (
                <Notes
                    entity_id={truck.truckId}
                    entity_type="truckchat"
                    size="normal"
                    isHideHeader
                />
            )
        },

        // {
        //     id      : DETAILS_TABS_IDS.WARRANTY,
        //     name    : 'common:profile.center.title.warranty',
        //     children: (
        //         <Profiles.Tabs.Warranty
        //             vehicleType={VehicleMaintenanceModel_VehicleType.TRUCK}
        //             vehicleId={truck.truckId}
        //         />
        //     )
        // },
        {
            id      : DETAILS_TABS_IDS.DOCUMENTS,
            name    : 'common:profile.center.title.documents',
            children: (
                <Documents
                    title={`${truck.referenceId ? `${truck.referenceId}_` : ''}${
                        plate ? `${plate.state}-${plate.number}` : ''
                    }`}
                    entity_type={DocumentModel_DocumentEntityType.TRUCK}
                    entity_id={truck.truckId}
                />
            ),
            testID: TestIDs.pages.truckProfile.buttons.documents,
            count : countInvalidDocuments(documents)
        },
        {
            id      : DETAILS_TABS_IDS.TRANSACTIONS_HISTORY,
            name    : 'common:profile.center.title.transactions_history',
            children: (
                <Profiles.Tabs.TransactionsHistory
                    entityId={truck.truckId}
                    entityType={SettlementTransactionCategoryModel_EntityType.TRUCK}
                />
            )
        },
        {
            id      : DETAILS_TABS_IDS.LOADS,
            name    : 'common:profile.center.title.loads',
            children: (
                <Profiles.Tabs.Loads
                    filterType="truck"
                    entityId={truck.truckId}
                    page="truck"
                />
            )
        },
        {
            id      : DETAILS_TABS_IDS.MANIFESTS,
            name    : 'common:profile.center.title.manifests',
            children: (
                <Profiles.Tabs.Manifests
                    filterType="truck"
                    entityId={truck.truckId}
                    page="truck"
                />
            )
        },
        {
            id      : DETAILS_TABS_IDS.MAP,
            name    : 'common:profile.center.title.map',
            children: (
                <MapWrapper
                    driver_id={primaryDriver?.driverId}
                    driver_full_name={
                        primaryDriver
                            ? `${primaryDriver?.firstName} ${primaryDriver?.lastName || ''}`
                            : undefined
                    }
                    truck_model={truck.model}
                    trailer_reference_id={trailer?.referenceId}
                    driverLocations={driverLocations}
                    truckLocation={truckLocation}
                    trailerLocation={trailerLocation}
                    type="truck"
                />
            )
        }
    ];

    const views = useMemo(
        () =>
            truck.drivers.length > 0
                ? VIEWS
                : VIEWS.filter((view) => view.id !== DETAILS_TABS_IDS.DRIVER_NOTES),
        [truck]
    );

    const view = useMemo(
        () => VIEWS.find(({ id }) => id === selectedViewId),
        [truck, selectedViewId]
    );

    return (
        <CenterStyled.Container>
            <Header
                views={views}
                value={selectedViewId}
                setSelectedViewId={setTab}
            />
            <Content>{view?.children}</Content>
        </CenterStyled.Container>
    );
}
