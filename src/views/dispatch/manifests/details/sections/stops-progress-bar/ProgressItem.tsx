import VectorIcons from '@/@core/icons/vector_icons';
import React, { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { CanceledIcon, InTransitIcon } from '@/@core/theme/entities/load/load_status_icons';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import {
    ManifestModel_LoadStop_Status,
    ManifestModel_ManifestStop_Status
} from '@proto/models/model_manifest';
import { ManifestStopTypes } from '@/models/manifests/manifest-stop';
import { LoadStopTypes } from '@/models/loads/load-stop';
import { useAppDispatch } from '@/store/hooks';
import { ManifestsActions } from '@/store/dispatch/manifests/slice';
import { Stack } from '@mui/material';
import Styled from './styled';

const ManifestStopsInProgress = [
    ManifestModel_ManifestStop_Status.CHECKED_IN,
    ManifestModel_ManifestStop_Status.EN_ROUTE,
    ManifestModel_ManifestStop_Status.ON_LOCATION
];

const ManifestStopsCompleted = [ManifestModel_ManifestStop_Status.COMPLETED];

const ManifestStopsCancelled = [ManifestModel_ManifestStop_Status.CANCELLED];

const LoadStopsInProgress = [
    ManifestModel_LoadStop_Status.CHECKED_IN,
    ManifestModel_LoadStop_Status.EN_ROUTE,
    ManifestModel_LoadStop_Status.ON_LOCATION
];

const LoadStopsCompleted = [ManifestModel_LoadStop_Status.COMPLETED];

const LoadStopsCancelled = [
    ManifestModel_LoadStop_Status.CANCELLED,
    ManifestModel_LoadStop_Status.TONU
];

type Props = {
    stop: ManifestsTypes.AnyPreparedStop;
    index: number;
    stopsLength: number;
    isSelected?: boolean;
};

function ProgressItem({
    index,
    stop,
    stopsLength,
    isSelected
}: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();

    // const is_completed = stop.status === COMPLETED;
    // const is_cancelled = [CANCELED, TONU].includes(stop.status);
    // const is_progress = [CHECKED_IN, EN_ROUTE, ON_LOCATION].includes(stop.status);

    const {
        is_completed,
        is_cancelled,
        is_progress,
        stopType
    } = useMemo(() => {
        if (stop.originType === ManifestsTypes.OriginType.LOAD) {
            const { loadStopStatus } = stop;
            const loadStopType = LoadStopTypes[stop.loadStopType];
            return {
                is_completed: LoadStopsCompleted.includes(loadStopStatus),
                is_cancelled: LoadStopsCancelled.includes(loadStopStatus),
                is_progress : LoadStopsInProgress.includes(loadStopStatus),
                stopType    : t(`state_info:stop.type_short.${loadStopType}`)
            };
        }
        if (stop.originType === ManifestsTypes.OriginType.MANIFEST) {
            const { manifestStopStatus } = stop;
            const manifestStopType = ManifestStopTypes[stop.manifestStopType];
            return {
                is_completed: ManifestStopsCompleted.includes(manifestStopStatus),
                is_cancelled: ManifestStopsCancelled.includes(manifestStopStatus),
                is_progress : ManifestStopsInProgress.includes(manifestStopStatus),
                stopType    : t(`state_info:stop.type_short.${manifestStopType}`)
            };
        }

        return {
            is_completed: false,
            is_cancelled: false,
            is_progress : false,
            stopType    : ''
        };
    }, [stop, t]);

    const is_icon = is_completed || is_cancelled || is_progress;

    const onSelectStop = () => {
        dispatch(ManifestsActions.SetSelectedStopId(stop.stopId));
    };

    return (
        <Styled.ProgressBarItem
            is_completed={is_completed}
            is_progress={is_progress}
            is_cancelled={is_cancelled}
            isSelected={isSelected}
            onClick={onSelectStop}
        >
            <Styled.ProgressBarContent>
                <Styled.IconContainer
                    is_icon={is_icon}
                    isSelected={isSelected}
                >
                    {!is_icon && index + 1}
                    {is_completed && <VectorIcons.Check />}
                    {is_progress && <InTransitIcon size={22} />}
                    {is_cancelled && <CanceledIcon size={22} />}
                </Styled.IconContainer>

                <Styled.Wrapper
                    hasIcon={is_icon}
                    isSelected={isSelected}
                >
                    <p>{stopType}</p>
                    <span>{`${stop.location?.city || '-'}, ${stop.location?.state || '-'}`}</span>
                </Styled.Wrapper>
            </Styled.ProgressBarContent>

            {stopsLength - 1 !== index && (
                <Stack
                    className="arrowRight"
                    position="absolute"
                    right={-12}
                    top={0}
                    zIndex={2}
                    sx={{
                        svg: {
                            height: '40px'
                        }
                    }}
                >
                    <VectorIcons.ArrowRight />
                </Stack>
            )}
        </Styled.ProgressBarItem>
    );
}

export default React.memo(ProgressItem);
