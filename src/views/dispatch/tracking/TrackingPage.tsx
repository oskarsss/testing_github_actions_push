import { Collapse, Fade, Stack, styled } from '@mui/material';
import React from 'react';
import { PageWrapper } from '@/@core/components/page/components';
import { useAppSelector } from '@/store/hooks';
import { trackingSelectedLoadIdxSelector } from '@/store/dispatch/tracking/selectors';
import { useTrackingFilters } from '@/@grpcServices/services/loads-service/service-hooks/tracking-service-hooks';
import { default_loads_filters } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import QueryStringCover from '@/@core/components/query-string-cover';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { TrackingSelectors } from '@/store/dispatch/tracking/slice';
import TrackingLoadsTable from './table';
import TrackingLoadInfoPanel from './info-panel/TrackingLoadInfoPanel';
import TrackingHeader from './header';
import TrackingMap from './map';
import KeyboardListener from './KeyboardListener';
import ArchiveListener from './ArchiveListener';
import LinePanel from './load-line-panel/LinePanel';

const TableWrapper = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'column',
    flex           : 1,
    overflow       : 'hidden',
    backgroundColor: theme.palette.semantic.background.secondary,
    position       : 'relative',
    maxWidth       : '1300px'
}));

const MapWrapper = styled('div')(({ theme }) => ({
    display                       : 'flex',
    flexDirection                 : 'column',
    flex                          : 1,
    overflow                      : 'hidden',
    backgroundColor               : theme.palette.semantic.background.secondary,
    position                      : 'relative',
    borderTop                     : `1px solid ${theme.palette.semantic.border.secondary}`,
    [theme.breakpoints.down('xl')]: {
        flex    : '0.5 1 0',
        minWidth: '350px'
    }
}));

const InfoPanelWrapper = styled('div')(({ theme }) => ({
    display   : 'flex',
    minWidth  : '55px',
    flexGrow  : 0,
    flexShrink: 1,
    overflow  : 'hidden',
    borderTop : `1px solid ${theme.palette.semantic.border.secondary}`,
    position  : 'relative'
}));

function QsCovering() {
    const {
        selected_filters,
        selected_view_id,
        views
    } = useTrackingFilters();

    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="tracking"
            views={views}
            defaultValues={default_loads_filters}
            defaultViewId={views[0].view_id}
            joinFilterId
        />
    );
}

function PanelContainer() {
    const selected_load_id = useAppSelector(trackingSelectedLoadIdxSelector);
    const showPanel = useAppSelector(TrackingSelectors.showPanel);

    if (selected_load_id !== null) {
        return (
            <InfoPanelWrapper>
                <Collapse
                    in={showPanel}
                    orientation="horizontal"
                    sx={{
                        '.MuiCollapse-wrapperInner:first-of-type': {
                            display: 'flex'
                        }
                    }}
                >
                    <Fade
                        in={showPanel}
                        timeout={500}
                        unmountOnExit
                    >
                        <Stack
                            overflow="hidden"
                            sx={(theme) => ({
                                minWidth: '375px',
                                maxWidth: '375px',

                                [theme.breakpoints.down('xl')]: {
                                    minWidth: '320px',
                                    maxWidth: '320px'
                                }
                            })}
                        >
                            <TrackingLoadInfoPanel />
                        </Stack>
                    </Fade>
                </Collapse>

                <Collapse
                    in={!showPanel}
                    orientation="horizontal"
                    sx={{
                        '.MuiCollapse-wrapperInner:first-of-type': {
                            display: 'flex'
                        }
                    }}
                >
                    <Fade
                        in={!showPanel}
                        timeout={500}
                        unmountOnExit
                    >
                        <Stack
                            maxWidth="55px"
                            minWidth="55px"
                            overflow="hidden"
                        >
                            <LinePanel />
                        </Stack>
                    </Fade>
                </Collapse>
            </InfoPanelWrapper>
        );
    }

    return null;
}

export default function TrackingPage() {
    const isLoading = useAppSelector(OrdersDataSelectors.getOrdersIsLoading);
    return (
        <PageWrapper>
            <ArchiveListener />
            <QsCovering />
            {!isLoading ? (
                <>
                    <TrackingHeader />
                    <KeyboardListener />
                    <Stack
                        direction="row"
                        overflow="hidden"
                        flex="1 1 100%"
                    >
                        <TableWrapper>
                            <TrackingLoadsTable />
                        </TableWrapper>
                        <PanelContainer />
                        <MapWrapper>
                            <TrackingMap />
                        </MapWrapper>
                    </Stack>
                </>
            ) : (
                <Preloader />
            )}
        </PageWrapper>
    );
}
