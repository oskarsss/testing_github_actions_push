import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { OrdersDataActions } from '@/store/storage/orders/slice';
import { BatchUpdateCashedManifest } from '@/store/dispatch/manifests/actions/cashe';
import { ManifestsActions } from '@/store/dispatch/manifests/slice';
import {
    getEntitiesDocumentsByTypeThunk,
    getEntitiesDocumentsThunk
} from '@/store/documents/slice';
import { NotesActions } from '@/store/notes/slice';
import { EventsService } from '@/store/streams/events/events';
import { EventsActions, EventsTypes } from '@/store/streams/events/slice';
import getDeviceId from '@/utils/getDeviceId';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { NotificationsActions } from '@/store/notifications/slice';
import { TrucksDataActions } from '@/store/storage/trucks/slice';
import { TrailersDataActions } from '@/store/storage/trailers/slice';
import { DriversDataActions } from '@/store/storage/drivers/slice';
import * as Sentry from '@sentry/nextjs';

const consoles = (text: string | object) => {
    if (process.env.NEXT_PUBLIC_APP_ENV !== 'production') {
        console.debug(text);
    }
};

function EventStream() {
    const dispatch = useAppDispatch();
    const isConnected = useRef(false);
    const ordersInitialized = useRef(false);
    const trucksInitialized = useRef(false);
    const trailersInitialized = useRef(false);
    const manifestsInitialized = useRef(false);
    const driversInitialized = useRef(false);

    // const mounted = useRef(true);

    // const countOfHeathPing = useRef(0);

    const healthPingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [restartValue, restart] = useState('');

    // useEffect(
    //     () => () => {
    //         mounted.current = false;
    //     },
    //     []
    // );

    const {
        company_id,
        token
    } = useAppSelector((state) => state.app);

    useEffect(() => {
        const Abort = new AbortController();

        if (token && company_id && !isConnected.current) {
            const headers = {
                Authorization: `Bearer ${token}`,
                ...(company_id ? { company_id } : {})
            };

            const deviceId = getDeviceId();

            // try {
            console.debug('LISTEN EVENTS ___START', { deviceId, headers });
            const stream = EventsService.listen(
                { deviceId },
                { meta: headers, abort: Abort.signal }
            );

            isConnected.current = true;

            const resetHealthPing = () => {
                if (healthPingTimeoutRef.current) {
                    clearTimeout(healthPingTimeoutRef.current);
                }

                healthPingTimeoutRef.current = setTimeout(() => {
                    consoles('RESTARTING EVENT STREAM DUE TO MISSING HEALTH PING');
                    Sentry.captureMessage('RESTARTING EVENT STREAM DUE TO MISSING HEALTH PING', {
                        tags : { eventStream: new Date().toISOString() },
                        level: 'error'
                    });
                    isConnected.current = false;

                    // countOfHeathPing.current = 0;

                    restart(new Date().toISOString());

                    // try {
                    //     console.debug('ABORTING EVENT STREAM', Abort);
                    //     Abort?.abort?.();
                    // } catch (error) {
                    //     console.debug('ABORTING EVENT STREAM ERROR', error);
                    // }
                }, 20000);
            };

            resetHealthPing();

            stream.responses.onComplete(() => {
                consoles('LISTEN EVENTS ___COMPLETE');
                isConnected.current = false;
            });

            stream.responses.onMessage(({ value }) => {
                switch (value.oneofKind) {
                case 'eventHealthPing':
                    // if (countOfHeathPing.current < 3) {
                    consoles({ eventHealthPing: value.eventHealthPing });

                    // countOfHeathPing.current += 1;
                    resetHealthPing();

                    // }
                    break;

                case 'eventDocumentUpdated':
                    consoles({ eventDocumentUpdated: value.eventDocumentUpdated });
                    break;

                case 'eventTrucksUpdated': {
                    consoles({ eventTrucksUpdated: value.eventTrucksUpdated.trucks });
                    const { trucks } = value.eventTrucksUpdated;
                    if (!trucksInitialized.current) {
                        const entityIds = trucks.map((truck) => truck.truckId);
                        dispatch(
                            getEntitiesDocumentsThunk({
                                entities: [
                                    {
                                        entityIds,
                                        entityType: DocumentModel_DocumentEntityType.TRUCK
                                    }
                                ]
                            })
                        );
                        dispatch(TrucksDataActions.InitializeData(trucks));
                        trucksInitialized.current = true;
                    } else {
                        const truck = trucks[0];
                        dispatch(
                            getEntitiesDocumentsThunk({
                                entities: [
                                    {
                                        entityIds : [truck.truckId],
                                        entityType: DocumentModel_DocumentEntityType.TRUCK
                                    }
                                ]
                            })
                        );
                        dispatch(
                            TrucksDataActions.UpdateTruck({ truck, isCacheUpdate: false })
                        );
                    }
                    break;
                }

                case 'eventDriversUpdated': {
                    consoles({ eventDriversUpdated: value.eventDriversUpdated.drivers });
                    const { drivers } = value.eventDriversUpdated;
                    if (!driversInitialized.current) {
                        const entityIds = drivers.map((driver) => driver.driverId);
                        dispatch(
                            getEntitiesDocumentsByTypeThunk({
                                ids : entityIds,
                                type: DocumentModel_DocumentEntityType.DRIVER
                            })
                        );
                        dispatch(DriversDataActions.InitializeData(drivers));
                        driversInitialized.current = true;
                    } else {
                        const driver = drivers[0];
                        dispatch(
                            getEntitiesDocumentsByTypeThunk({
                                ids : [driver.driverId],
                                type: DocumentModel_DocumentEntityType.DRIVER
                            })
                        );
                        dispatch(
                            DriversDataActions.UpdateDriver({
                                driver,
                                isCacheUpdate: false
                            })
                        );
                    }
                    break;
                }

                case 'eventTrailersUpdated': {
                    consoles({ eventTrailersUpdated: value.eventTrailersUpdated.trailers });
                    const { trailers } = value.eventTrailersUpdated;
                    if (!trailersInitialized.current) {
                        const ids = trailers.map((trailer) => trailer.trailerId);
                        dispatch(
                            getEntitiesDocumentsByTypeThunk({
                                ids,
                                type: DocumentModel_DocumentEntityType.TRAILER
                            })
                        );
                        dispatch(TrailersDataActions.InitializeData(trailers));
                        trailersInitialized.current = true;
                    } else {
                        const trailer = trailers[0];
                        dispatch(
                            getEntitiesDocumentsByTypeThunk({
                                ids : [trailer.trailerId],
                                type: DocumentModel_DocumentEntityType.TRAILER
                            })
                        );
                        dispatch(
                            TrailersDataActions.UpdateTrailer({
                                trailer,
                                isCacheUpdate: false
                            })
                        );
                    }
                    break;
                }

                case 'eventLoadsUpdated': {
                    consoles({ eventLoadsUpdated: value.eventLoadsUpdated.orders });
                    const { orders } = value.eventLoadsUpdated;
                    if (!ordersInitialized.current) {
                        const ids = orders.map((order) => order.loadId);
                        dispatch(
                            getEntitiesDocumentsByTypeThunk({
                                ids,
                                type: DocumentModel_DocumentEntityType.LOAD
                            })
                        );
                        dispatch(OrdersDataActions.InitializeData(orders));
                        ordersInitialized.current = true;
                    } else if (orders.length === 1 && ordersInitialized.current) {
                        const order = orders[0];
                        dispatch(
                            getEntitiesDocumentsByTypeThunk({
                                ids : [order.loadId],
                                type: DocumentModel_DocumentEntityType.LOAD
                            })
                        );
                        dispatch(
                            OrdersDataActions.UpdateOrder({ order, isCacheUpdate: false })
                        );
                    }
                    break;
                }

                case 'eventNotifications': {
                    const { notifications } = value.eventNotifications;
                    consoles({ notificationsEventStream: notifications });
                    if (notifications.length) {
                        dispatch(NotificationsActions.AddNewNotification(notifications[0]));
                    }
                    break;
                }

                case 'eventManifestsUpdated': {
                    consoles({ eventManifestsUpdated: value.eventManifestsUpdated });
                    const updatedManifest = value.eventManifestsUpdated.manifests;
                    if (!manifestsInitialized.current) {
                        dispatch(ManifestsActions.SetAllManifestsList(updatedManifest));
                        manifestsInitialized.current = true;
                    } else if (updatedManifest.length === 1) {
                        const manifest = updatedManifest[0];
                        dispatch(BatchUpdateCashedManifest(manifest.manifestId, manifest));
                    }
                    break;
                }

                case 'eventDriverDeviceLocation':
                    dispatch(
                        EventsActions.setDriverDeviceLocations(
                            value.eventDriverDeviceLocation.locations.reduce((acc, item) => {
                                acc[item.driverId] = {
                                    ...acc[item.driverId],
                                    [item.deviceId]: item
                                };
                                return acc;
                            }, {} as EventsTypes.DriverDeviceLocations)
                        )
                    );
                    break;

                case 'eventDriverDevicePing':
                    dispatch(
                        EventsActions.setDriverDevicePings(
                            value.eventDriverDevicePing.pings.reduce((acc, item) => {
                                acc[item.driverId] = {
                                    ...acc[item.driverId],
                                    [item.deviceId]: item
                                };
                                return acc;
                            }, {} as EventsTypes.DriverDevicePings)
                        )
                    );
                    break;

                case 'eventTrailerLocation':
                    dispatch(
                        EventsActions.setTrailerLocations(
                            value.eventTrailerLocation.locations.reduce((acc, item) => {
                                acc[item.trailerId] = item;
                                return acc;
                            }, {} as EventsTypes.TrailerLocations)
                        )
                    );
                    break;

                case 'eventTruckDiagnostics':
                    dispatch(
                        EventsActions.setTrucksDiagnostics(
                            value.eventTruckDiagnostics.diagnostics.reduce((acc, item) => {
                                acc[item.truckId] = item;
                                return acc;
                            }, {} as EventsTypes.TrucksDiagnostics)
                        )
                    );
                    break;

                case 'eventTruckLocation':
                    dispatch(
                        EventsActions.setTruckLocations(
                            value.eventTruckLocation.locations.reduce((acc, item) => {
                                acc[item.truckId] = item;
                                return acc;
                            }, {} as EventsTypes.TruckLocations)
                        )
                    );
                    break;

                case 'eventTruckRoute':
                    dispatch(
                        EventsActions.setTruckRoutes(
                            value.eventTruckRoute.routes.reduce((acc, item) => {
                                acc[item.truckId] = item;
                                return acc;
                            }, {} as EventsTypes.TruckRoutes)
                        )
                    );
                    break;

                case 'eventManifestTruckRoute': {
                    const { routes } = value.eventManifestTruckRoute;
                    const routesMap = routes.reduce((acc, route) => {
                        const stops = route.stops.reduce((acc, stop) => {
                            acc.push({
                                ...stop,
                                localeStopId:
                                        stop.stopId?.loadStopId ||
                                        stop.stopId?.manifestStopId ||
                                        '',
                                loadId: stop.stopId?.loadId || ''
                            });
                            return acc;
                        }, [] as EventsTypes.ManifestTruckRouteStops);
                        acc[route.truckId] = stops;
                        return acc;
                    }, {} as EventsTypes.ManifestTruckRoute);
                    dispatch(EventsActions.setManifestTruckRoutes(routesMap));
                    break;
                }

                case 'eventUserPing':
                    dispatch(
                        EventsActions.setUsersPing(
                            value.eventUserPing.pings.reduce((acc, item) => {
                                acc[item.userId] = item;
                                return acc;
                            }, {} as EventsTypes.UsersPing)
                        )
                    );
                    break;

                case 'eventNotes':
                    if (process.env.NEXT_PUBLIC_APP_ENV !== 'production') {
                        console.debug('LOGGER_NOTES', value.eventNotes.notes);
                    }
                    dispatch(
                        NotesActions.setNotes({
                            notesList: value.eventNotes.notes
                        })
                    );
                    break;

                default:
                    consoles(`Unknown event type: ${value}`);
                    break;
                }

                return { value: { ...value } };
            });

            stream.responses.onError((status) => {
                console.debug('LISTEN EVENTS ___ERROR:', { status });

                // restart(new Date().toISOString());
                isConnected.current = false;

                // try {
                //     console.debug('ABORTING EVENT STREAM', Abort);
                //     Abort?.abort?.();
                // } catch (error) {
                //     console.error('ABORTING EVENT STREAM ERROR', error);
                // }
            });

            return () => {
                if (healthPingTimeoutRef.current) {
                    clearTimeout(healthPingTimeoutRef.current);
                }
                try {
                    console.debug('ABORTING EVENT STREAM', Abort);
                    Abort?.abort?.();
                } catch (error) {
                    console.debug('ABORTING EVENT STREAM ERROR', error);
                }
                isConnected.current = false;
            };

            // } catch (error) {
            //     console.error('EventStream error', error);
            // }
        }
    }, [company_id, restartValue, token, dispatch]);

    return null;
}

export default EventStream;
