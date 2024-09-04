import React, { useRef, WheelEvent } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAddLoadStopDialog } from '@/views/dispatch/manifests/modals/load-stop/AddLoadStop';
import { useAppSelector } from '@/store/hooks';
import type { ManifestModel_Stop } from '@proto/models/model_manifest';
import LoadStopsProgressBarStyled from './LoadStopsProgressBar.styled';
import LoadStopProgressItem from './LoadStopProgressItem';

type Props = {
    loadId: string;
    stops: ManifestModel_Stop[];
    truckId: string;
    activeManifestId: string;
};

function LoadStopsProgressBar({
    loadId,
    stops,
    truckId,
    activeManifestId
}: Props) {
    const addLoadStopMenu = useAddLoadStopDialog();
    const { t } = useAppTranslation('loads');
    const selectedStopId = useAppSelector((state) => state.loads.map.selectedStopId);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = (e: WheelEvent<HTMLElement>) => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += e.deltaY;
        }
    };

    const onClick = () => {
        addLoadStopMenu.open({
            loadId,
            sequence  : stops.length + 1,
            truckId,
            manifestId: activeManifestId
        });
    };

    return (
        <LoadStopsProgressBarStyled.Container>
            <LoadStopsProgressBarStyled.ProgressBarContainer
                onWheel={handleScroll}
                ref={containerRef}
                sx={{
                    overflowX             : 'auto',
                    overflowY             : 'hidden',
                    scrollbarWidth        : 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}
            >
                <LoadStopsProgressBarStyled.Content>
                    {stops.map((stop, index) => (
                        <LoadStopProgressItem
                            key={stop.loadStopId || stop.manifestStopId}
                            index={index}
                            stopsLength={stops.length}
                            stopId={stop.loadStopId || stop.manifestStopId}
                            city={stop.location?.city}
                            state={stop.location?.state}
                            isSelected={stop.loadStopId === selectedStopId}
                            stopStatus={stop.loadStopStatus}
                            stopType={stop.loadStopType}
                        />
                    ))}
                </LoadStopsProgressBarStyled.Content>
            </LoadStopsProgressBarStyled.ProgressBarContainer>
            <LoadStopsProgressBarStyled.Button
                onClick={onClick}
                startIcon={<VectorIcons.AddLocation />}
                variant="outlined"
                sx={{ flexShrink: 0 }}
            >
                {t('details.progress_bar.buttons.add_stop')}
            </LoadStopsProgressBarStyled.Button>
        </LoadStopsProgressBarStyled.Container>
    );
}

export default React.memo(LoadStopsProgressBar);
