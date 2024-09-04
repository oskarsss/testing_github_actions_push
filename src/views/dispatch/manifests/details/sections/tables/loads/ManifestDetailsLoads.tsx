import { Fade, Stack } from '@mui/material';
import { PerfectScrollbar } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import ManifestDetailsLoad from '@/views/dispatch/manifests/details/sections/tables/loads/ManifestDetailsLoad';
import Scrollbar from 'react-perfect-scrollbar';
import React from 'react';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { useStableArray } from '@/hooks/useStable';
import EmptyScreenLoadsTab from '@/views/dispatch/manifests/details/sections/tables/loads/components/EmptyScreenLoadsTab';

type Props = {
    manifestId: string;
};

export default function ManifestDetailsLoads({ manifestId }: Props) {
    const { data } = ManifestsGrpcService.useGetManifestLoadsQuery({
        manifestId
    });

    const loads = useStableArray(data?.loads);
    const scrollBarRef = React.useRef<Scrollbar | null>(null);

    if (!loads?.length) {
        return <EmptyScreenLoadsTab />;
    }

    return (
        <Fade in>
            <Stack
                padding="8px"
                overflow="hidden"
            >
                <PerfectScrollbar
                    ref={scrollBarRef}
                    sx={{
                        padding      : '8px',
                        display      : 'flex',
                        flexDirection: 'column',
                        gap          : '20px'
                    }}
                >
                    {loads.map((load, index) => (
                        <ManifestDetailsLoad
                            load={load}
                            key={load.loadId}
                            index={index}
                            scrollBarRef={scrollBarRef}
                        />
                    ))}
                </PerfectScrollbar>
            </Stack>
        </Fade>
    );
}
