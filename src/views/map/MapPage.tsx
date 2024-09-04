import { useAppDispatch } from '@/store/hooks';
import { MapActions } from '@/store/map/slice';
import { useEffect } from 'react';
import { PageWrapper } from '@/@core/components/page/components';
import { styled } from '@mui/material';
import LeftPanel from './left_panel/LeftPanel';
import Map from './Map';
import MapPageHeader from './left_panel/components/Header/Header';
import ArchiveListener from './ArchiveListener';

const Wrapper = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'row',
    flex           : 1,
    overflow       : 'hidden',
    backgroundColor: theme.palette.semantic.background.secondary
}));

export default function MapPage() {
    return (
        <PageWrapper>
            <MapPageHeader />
            <ArchiveListener />
            <Wrapper>
                <LeftPanel />
                <Map />
            </Wrapper>
        </PageWrapper>
    );
}
