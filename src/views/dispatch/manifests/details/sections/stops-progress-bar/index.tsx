import { useRef, WheelEvent, memo } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import { getPrepareStops } from '@/@grpcServices/services/manifests-service/utils';
import { useAppSelector } from '@/store/hooks';
import Styled from './styled';
import ProgressItem from './ProgressItem';
import { useAddManifestStopDialog } from '../../../modals/manifest-stop/AddManifestStop';

type Props = {
    stops: ManifestModel_Stop[] | undefined;
    manifestId: string;
};

function StopsProgressBar({
    stops,
    manifestId
}: Props) {
    const addLoadStopMenu = useAddManifestStopDialog();
    const selectedStopId = useAppSelector((state) => state.manifests.map.selectedStopId);
    const { t } = useAppTranslation('common');

    const preparedStops = getPrepareStops(stops || []);

    const containerRef = useRef<HTMLDivElement | null>(null);

    if (!preparedStops.length) return null;
    const handleScroll = (e: WheelEvent<HTMLElement>) => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += e.deltaY;
        }
    };

    const onClick = () => {
        const lastStop = preparedStops[preparedStops.length - 1];
        addLoadStopMenu.open({
            manifestId,
            sequence: (lastStop?.sequence || 0) + 1,
            lastStopAppointmentStartAt:
                lastStop?.appointmentEndAtLocal || lastStop?.appointmentStartAtLocal
        });
    };

    return (
        <Styled.Container>
            <Styled.ProgressBarContainer
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
                <Styled.Content>
                    {preparedStops.map((stop, index) => (
                        <ProgressItem
                            key={stop.stopId}
                            index={index}
                            stop={stop}
                            stopsLength={preparedStops.length}
                            isSelected={selectedStopId === stop.stopId}
                        />
                    ))}
                </Styled.Content>
            </Styled.ProgressBarContainer>
            <Styled.Button
                onClick={onClick}
                startIcon={<VectorIcons.AddLocation />}
                variant="outlined"
                sx={{ flexShrink: 0 }}
            >
                {t('button.add_stop')}
            </Styled.Button>
        </Styled.Container>
    );
}

export default memo(StopsProgressBar);
