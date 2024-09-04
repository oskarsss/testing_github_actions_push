import { useCallback, useEffect, useRef } from 'react';
import { LoadboardService } from '@/@grpcServices/services/loadboard-service/loadboard.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoadboardActions } from '@/store/loadboard/slice';
import { loadboardSelectedSearchIdSelectors } from '@/store/loadboard/selectors';
import getDeviceId from '@/utils/getDeviceId';
import { SelectLoadboardTabAction } from '@/store/loadboard/actions';
import playAudioNotification from './Audio';
import showPushNotification from './PushNotification';

function LoadboardStreams() {
    const isConnected = useRef(false);
    const hasFirstResult = useRef(false);
    const selectedSearchId = useAppSelector(loadboardSelectedSearchIdSelectors);
    const searchesMap = useAppSelector((state) => state.loadboard.searchesMap);

    const {
        company_id,
        token
    } = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();

    const onClickNotification = useCallback(
        (resultId: string, searchId: string) => {
            dispatch(SelectLoadboardTabAction(searchId));
            dispatch(
                LoadboardActions.setSelectedLoadId({
                    loadId: resultId
                })
            );
        },
        [dispatch]
    );

    const showNotification = useCallback(
        (searchId: string, resultId: string) => {
            const search = searchesMap[searchId];
            if (
                hasFirstResult.current &&
                search &&
                searchId !== selectedSearchId &&
                !search.isMuted
            ) {
                playAudioNotification();
                showPushNotification({
                    title  : `Search ${search.origin?.city}, ${search.origin?.state} - ${search.destination?.city}, ${search.destination?.state}`,
                    body   : 'New load has been added to the list',
                    onClick: () => onClickNotification(resultId, searchId)
                });
            }
        },
        [onClickNotification, searchesMap, selectedSearchId]
    );

    useEffect(() => {
        const Abort = new AbortController();
        if (token && company_id && !isConnected.current) {
            isConnected.current = true;
            const headers = {
                Authorization: `Bearer ${token}`,
                ...(company_id ? { company_id } : {})
            };
            const deviceId = getDeviceId();

            // console.debug('LISTEN LOADBOARD RESULTS BY SEARCH ___START', {
            //     company_id,
            //     token,
            //     deviceId
            // });

            const stream = LoadboardService.lBListenSearchResults(
                { deviceId },
                {
                    meta : headers,
                    abort: Abort.signal
                }
            );

            stream.responses.onMessage((message) => {
                const {
                    searchResults,
                    searchResultsToDelete,
                    searchId
                } = message;

                // console.debug('LISTEN LOADBOARD RESULTS BY SEARCH ___MESSAGE:', message);
                dispatch(
                    LoadboardActions.setSearchResults({
                        results: searchResults,
                        searchId
                    })
                );

                // const search = searchesMap[searchId];
                showNotification(searchId, searchResults[0]?.resultId || '');

                // console.debug(`LISTEN LOADBOARD RESULTS BY SEARCH ___MESSAGE: ${searchId}`, {
                //     searchId,
                //     message
                // });

                dispatch(
                    LoadboardActions.setSearchLoading({
                        loading: false,
                        searchId
                    })
                );
                hasFirstResult.current = true;
            });

            stream.responses.onError((error) => {
                // console.debug('LISTEN LOADBOARD RESULTS BY SEARCH ___ERROR:', error);
            });
        }
    }, [company_id, showNotification, token]);

    return null;
}

export default LoadboardStreams;
