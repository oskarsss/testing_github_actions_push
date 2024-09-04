/* eslint-disable no-mixed-operators */
import CenterStyled from '@/views/fleet/drivers/Details/components/Center/styled';
import { TrailerProps } from '@/views/fleet/trailers/Details/types';
import Header, { View } from '@/views/fleet/drivers/Details/components/Center/Header/Header';
import { useEffect, useMemo } from 'react';
import Content from '@/views/fleet/drivers/Details/components/Center/tabs/Tabs';
import Notes from '@/@core/components/notes/Notes';
import Documents from '@/views/fleet/drivers/Details/components/Center/tabs/Documents/Documents';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { countInvalidDocuments } from '@/@core/components/documents/utils';
import { TestIDs } from '@/configs/tests';
import { trailersActions } from '@/store/fleet/trailers/slice';
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
import { useTruckByTrailerId } from '@/store/storage/trucks/hooks/common';
import { useDriverById } from '@/store/storage/drivers/hooks/common';

export default function Center({ trailer }: TrailerProps) {
    const dispatch = useAppDispatch();
    const selectedViewId = useAppSelector((state) => state.trailers.tab_id);
    const document_id = useAppSelector((state) => state.documents.trailer);
    const truck = useTruckByTrailerId(trailer.trailerId || '');
    const main_driver = truck?.drivers.find((driver) => driver.primary);
    const driver = useDriverById(main_driver?.driverId || '');
    const truckLocation = useTruckLocation(truck?.truckId);
    const driverLocations = useDriverLocations(main_driver?.driverId);
    const trailerLocation = useTrailerLocation(trailer.trailerId);
    const {
        tab_id,
        setTab
    } = useTabQuery(DETAILS_TABS_IDS.MAIN_NOTES, DETAILS_TABS_IDS.FINANCE);

    useEffect(() => {
        if (tab_id) {
            dispatch(trailersActions.selectTab(tab_id));
        } else {
            dispatch(trailersActions.selectTab(DETAILS_TABS_IDS.MAIN_NOTES));
        }
    }, [tab_id]);

    const { documents } = useGetDocumentsByEntityType({
        entityId  : trailer.trailerId,
        entityType: DocumentModel_DocumentEntityType.TRAILER
    });

    useEffect(
        () => () => {
            dispatch(trailersActions.selectTab(DETAILS_TABS_IDS.MAIN_NOTES));
        },
        []
    );

    useEffect(() => {
        if (document_id) {
            setTab(DETAILS_TABS_IDS.DOCUMENTS);
        }
    }, [document_id]);

    const VIEWS: View[] = useMemo(
        () => [
            {
                id      : DETAILS_TABS_IDS.MAIN_NOTES,
                name    : 'common:profile.center.title.all_notes',
                children: (
                    <Notes
                        entity_id={trailer.trailerId}
                        entity_type="trailer"
                        size="normal"
                        isHideHeader
                        testOptions={{
                            messageTestId   : TestIDs.pages.trailerProfile.fields.message,
                            messageBoxTestId: TestIDs.pages.trailerProfile.areas.messageBox,
                            leaveNoteTestId : TestIDs.pages.trailerProfile.buttons.leaveNote
                        }}
                    />
                ),
                testID: TestIDs.pages.trailerProfile.buttons.activity
            },
            {
                id      : DETAILS_TABS_IDS.TEAM_NOTES,
                name    : 'common:profile.center.title.team_notes',
                children: (
                    <Notes
                        entity_id={trailer.trailerId}
                        entity_type="trailer"
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
                        entity_id={trailer.trailerId}
                        entity_type="trailerchat"
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
            //             vehicleType={VehicleMaintenanceModel_VehicleType.TRAILER}
            //             vehicleId={trailer.trailerId}
            //         />
            //     )
            // },
            {
                id      : DETAILS_TABS_IDS.DOCUMENTS,
                name    : 'common:profile.center.title.documents',
                children: (
                    <Documents
                        title={trailer.referenceId ? `${trailer.referenceId}_` : ''}
                        entity_type={DocumentModel_DocumentEntityType.TRAILER}
                        entity_id={trailer.trailerId}
                    />
                ),
                testID: TestIDs.pages.trailerProfile.buttons.documents,
                count : countInvalidDocuments(documents)
            },
            {
                id      : DETAILS_TABS_IDS.TRANSACTIONS_HISTORY,
                name    : 'common:profile.center.title.transactions_history',
                children: (
                    <Profiles.Tabs.TransactionsHistory
                        entityId={trailer.trailerId}
                        entityType={SettlementTransactionCategoryModel_EntityType.TRAILER}
                    />
                )
            },
            {
                id      : DETAILS_TABS_IDS.LOADS,
                name    : 'common:profile.center.title.loads',
                children: (
                    <Profiles.Tabs.Loads
                        filterType="truck"
                        entityId={truck?.truckId || ''}
                        page="trailer"
                    />
                )
            },
            {
                id      : DETAILS_TABS_IDS.MANIFESTS,
                name    : 'common:profile.center.title.manifests',
                children: (
                    <Profiles.Tabs.Manifests
                        filterType="trailer"
                        entityId={trailer.trailerId}
                        page="trailer"
                    />
                )
            },
            {
                id      : DETAILS_TABS_IDS.MAP,
                name    : 'common:profile.center.title.map',
                children: (
                    <MapWrapper
                        driver_id={driver?.driverId}
                        driver_full_name={
                            driver ? `${driver?.firstName} ${driver?.lastName || ''}` : undefined
                        }
                        truck_model={truck?.model}
                        trailer_reference_id={trailer.referenceId}
                        driverLocations={driverLocations}
                        truckLocation={truckLocation}
                        trailerLocation={trailerLocation}
                        type="trailer"
                    />
                )
            }
        ],
        [
            trailer.trailerId,
            trailer.referenceId,
            documents,
            truck?.truckId,
            truck?.model,
            driver,
            driverLocations,
            truckLocation,
            trailerLocation
        ]
    );

    const filterViews: View[] = useMemo(() => {
        if (!truck?.truckId) {
            return VIEWS.filter(
                (view) =>
                    view.id !== DETAILS_TABS_IDS.LOADS && view.id !== DETAILS_TABS_IDS.DRIVER_NOTES
            );
        }
        if (!truck?.drivers?.length) {
            return VIEWS.filter((view) => view.id !== DETAILS_TABS_IDS.DRIVER_NOTES);
        }

        return VIEWS;
    }, [VIEWS, truck?.truckId, truck?.drivers?.length]);

    const view = useMemo(
        () => VIEWS.find(({ id }) => id === selectedViewId),
        [VIEWS, selectedViewId]
    );

    return (
        <CenterStyled.Container>
            <Header
                views={filterViews}
                value={selectedViewId}
                setSelectedViewId={setTab}
            />
            <Content>{view?.children}</Content>
        </CenterStyled.Container>
    );
}
