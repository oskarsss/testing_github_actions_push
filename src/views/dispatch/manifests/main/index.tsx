import React from 'react';
import { PageWrapper } from '@/@core/components/page/components';
import { Collapse, Fade, Stack, styled } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { selectSelectedManifest } from '@/store/dispatch/manifests/selectors';
import { ManifestsSelectors } from '@/store/dispatch/manifests/slice';
import LinePanel from '@/views/dispatch/manifests/main/line-panel/LinePanel';
import Header from './header';
import ManifestTable from './table';
import ManifestsMap from '../map';
import ManifestsInfoPanel from './info-panel';
import KeyboardListener from './KeyboardListener';
import ArchiveListener from './ArchiveListener';

const MapWrapper = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'column',
    overflow       : 'hidden',
    backgroundColor: theme.palette.semantic.background.secondary,
    position       : 'relative',
    borderTop      : `1px solid ${theme.palette.semantic.border.secondary}`,
    flex           : 1,
    minWidth       : '350px',

    [theme.breakpoints.down('xl')]: {
        flex    : '0.5 1 0',
        minWidth: '350px'
    }
}));

const TableWrapper = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'column',
    flex           : 1,
    overflow       : 'hidden',
    backgroundColor: theme.palette.semantic.background.secondary,
    position       : 'relative',
    maxWidth       : '1300px'
}));

function ManifestMapContainer() {
    const selectedManifest = useAppSelector(selectSelectedManifest);

    return (
        <ManifestsMap
            trailerId={selectedManifest?.trailerId || ''}
            manifestStatus={selectedManifest?.status}
            driverId={selectedManifest?.primaryDriverId || ''}
            truckId={selectedManifest?.truckId || ''}
            manifestId={selectedManifest?.manifestId || ''}
            size="large"
        />
    );
}

const InfoPanelWrapper = styled('div')(({ theme }) => ({
    display   : 'flex',
    minWidth  : '55px',
    flexGrow  : 0,
    flexShrink: 1,
    overflow  : 'hidden',
    borderTop : `1px solid ${theme.palette.semantic.border.secondary}`,
    position  : 'relative'
}));

function PanelContainer() {
    const showPanel = useAppSelector(ManifestsSelectors.showPanel);

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

                            [theme.breakpoints.down('lg')]: {
                                minWidth: '340px',
                                maxWidth: '340px'
                            }
                        })}
                    >
                        <ManifestsInfoPanel />
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

export default function Manifests() {
    const isLoading = useAppSelector((state) => state.manifests.isLoading);

    return (
        <PageWrapper>
            {!isLoading ? (
                <>
                    {/* <QueryString /> */}
                    <ArchiveListener />
                    <KeyboardListener />
                    <Header />
                    <Stack
                        direction="row"
                        overflow="hidden"
                        flex="1 1 0"
                    >
                        <TableWrapper>
                            <TableWrapper>
                                <ManifestTable />
                            </TableWrapper>
                        </TableWrapper>
                        <PanelContainer />
                        <MapWrapper>
                            <ManifestMapContainer />
                        </MapWrapper>
                    </Stack>
                </>
            ) : (
                <Preloader />
            )}
        </PageWrapper>
    );
}
