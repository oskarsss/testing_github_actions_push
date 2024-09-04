import Notes from '@/@core/components/notes/Notes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { countInvalidDocuments } from '@/@core/components/documents/utils';
import DriversTypes from '@/store/fleet/drivers/types';
import { TestIDs } from '@/configs/tests';
import { useEffect, useMemo } from 'react';
import {
    useDriverLocations,
    useTrailerLocation,
    useTruckLocation
} from '@/store/streams/events/hooks';
import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import useTabQuery from '@/hooks/useTabQuery';
import { DriverActions } from '@/store/fleet/drivers/slice';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import Profiles from '@/@core/ui-kits/profiles';
import { SettlementTransactionCategoryModel_EntityType } from '@proto/models/model_settlement.transaction_category';
import { DriverModel_Driver } from '@proto/models/model_driver';
import { useTruckByDriverId } from '@/store/storage/trucks/hooks/common';
import Header, { View } from './Header/Header';
import Documents from './tabs/Documents/Documents';
import Wrapper from './tabs/Tabs';
import CenterStyled from './styled';
import Finance from './tabs/Finance/Finance';
import MapWrapper from './tabs/Map/MapWrapper';

type Props = {
    driver: DriverModel_Driver;
};

export default function Center({ driver }: Props) {
    const dispatch = useAppDispatch();
    const document_id = useAppSelector((state) => state.documents.driver);
    const store_tab_id = useAppSelector((state) => state.drivers.tab_id);
    const truck = useTruckByDriverId(driver.driverId);
    const truckLocation = useTruckLocation(truck?.truckId);
    const driverLocations = useDriverLocations(driver.driverId);
    const trailerLocation = useTrailerLocation(truck?.trailerId);

    const {
        tab_id,
        setTab
    } = useTabQuery(DETAILS_TABS_IDS.MAIN_NOTES, DETAILS_TABS_IDS.FINANCE);

    useEffect(() => {
        if (tab_id) {
            dispatch(DriverActions.selectTab(tab_id));
        } else {
            dispatch(DriverActions.selectTab(DETAILS_TABS_IDS.MAIN_NOTES));
        }
    }, [tab_id]);

    useEffect(() => {
        if (document_id) {
            setTab(DETAILS_TABS_IDS.DOCUMENTS);
        }
    }, [document_id]);

    const { documents } = useGetDocumentsByEntityType({
        entityId  : driver.driverId,
        entityType: DocumentModel_DocumentEntityType.DRIVER
    });

    // const documents = useMemo(
    //     () => driver?.documents.map(converter) || [],
    //     [converter, driver?.documents]
    // );

    const VIEWS: View[] = useMemo(
        () => [
            {
                id      : DETAILS_TABS_IDS.MAIN_NOTES,
                name    : 'common:profile.center.title.all_notes',
                children: (
                    <Notes
                        entity_id={driver.driverId}
                        entity_type="driver"
                        size="normal"
                        isHideHeader
                        testOptions={{
                            messageTestId   : TestIDs.pages.driverProfile.fields.message,
                            messageBoxTestId: TestIDs.pages.driverProfile.areas.messageBox,
                            leaveNoteTestId : TestIDs.pages.driverProfile.buttons.leaveNote
                        }}
                    />
                ),
                testID: TestIDs.pages.driverProfile.buttons.activity
            },
            {
                id      : DETAILS_TABS_IDS.TEAM_NOTES,
                name    : 'common:profile.center.title.team_notes',
                children: (
                    <Notes
                        entity_id={driver.driverId}
                        entity_type="driver"
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
                        entity_id={truck?.truckId || ''}
                        entity_type="truckdispatch"
                        size="normal"
                        isHideHeader
                    />
                )
            },
            {
                id      : DETAILS_TABS_IDS.DOCUMENTS,
                name    : 'common:profile.center.title.documents',
                children: (
                    <Documents
                        title={`${driver.firstName} ${driver.lastName}`}
                        entity_type={DocumentModel_DocumentEntityType.DRIVER}
                        entity_id={driver.driverId}
                    />
                ),
                testID: TestIDs.pages.driverProfile.buttons.documents,
                count : countInvalidDocuments(documents)
            },
            {
                id      : DETAILS_TABS_IDS.FINANCE,
                name    : 'common:profile.center.title.financial',
                children: <Finance driver={driver} />,
                testID  : TestIDs.pages.driverProfile.buttons.financial
            },
            {
                id      : DETAILS_TABS_IDS.TRANSACTIONS_HISTORY,
                name    : 'common:profile.center.title.transactions_history',
                children: (
                    <Profiles.Tabs.TransactionsHistory
                        entityId={driver.driverId}
                        entityType={SettlementTransactionCategoryModel_EntityType.DRIVER}
                    />
                )
            },
            {
                id      : DETAILS_TABS_IDS.LOADS,
                name    : 'common:profile.center.title.loads',
                children: (
                    <Profiles.Tabs.Loads
                        filterType="driver"
                        entityId={driver.driverId}
                        page="driver"
                    />
                )
            },
            {
                id      : DETAILS_TABS_IDS.MANIFESTS,
                name    : 'common:profile.center.title.manifests',
                children: (
                    <Profiles.Tabs.Manifests
                        filterType="driver"
                        entityId={driver.driverId}
                        page="driver"
                    />
                )
            },
            {
                id      : DETAILS_TABS_IDS.MAP,
                name    : 'common:profile.center.title.map',
                children: (
                    <MapWrapper
                        driver_full_name={`${driver.firstName} ${driver.middleName} ${driver.lastName}`}
                        driver_id={driver.driverId}
                        truck_model={truck?.model}
                        trailer_reference_id={truck?.referenceId}
                        driverLocations={driverLocations}
                        truckLocation={truckLocation}
                        trailerLocation={trailerLocation}
                        type="driver"
                    />
                )
            }
        ],
        [driver, documents, driverLocations, truck, truckLocation, trailerLocation]
    );

    const views: View[] = useMemo(
        () =>
            truck?.truckId
                ? VIEWS
                : VIEWS.filter((view) => view.id !== DETAILS_TABS_IDS.DRIVER_NOTES),
        [VIEWS, truck?.truckId]
    );

    const view = useMemo(() => VIEWS.find(({ id }) => id === store_tab_id), [VIEWS, store_tab_id]);

    return (
        <CenterStyled.Container>
            <Header
                views={views}
                value={store_tab_id}
                setSelectedViewId={setTab}
            />
            <Wrapper>{view?.children}</Wrapper>
        </CenterStyled.Container>
    );
}
