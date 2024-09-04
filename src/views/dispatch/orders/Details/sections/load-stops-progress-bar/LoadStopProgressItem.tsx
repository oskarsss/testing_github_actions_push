import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { LoadModel_Stop_Type } from '@proto/models/model_load';
import { CanceledIcon, InTransitIcon } from '@/@core/theme/entities/load/load_status_icons';
import { LOAD_STOP_TYPE_GRPC_ENUM } from '@/models/loads/load-mappings';
import { useAppDispatch } from '@/store/hooks';
import { LoadsActions } from '@/store/dispatch/loads/slice';
import React from 'react';
import { Stack } from '@mui/material';
import { ManifestModel_LoadStop_Status } from '@proto/models/model_manifest';
import LoadStopsProgressBarStyled from './LoadStopsProgressBar.styled';

const {
    TONU,
    EN_ROUTE,
    CHECKED_IN,
    ON_LOCATION,
    COMPLETED,
    CANCELLED
} =
    ManifestModel_LoadStop_Status;

type Props = {
    stopStatus: ManifestModel_LoadStop_Status;
    stopType: LoadModel_Stop_Type;
    stopId: string;
    city?: string;
    state?: string;
    index: number;
    stopsLength: number;
    isSelected?: boolean;
};

function LoadStopProgressItem({
    stopStatus,
    stopType,
    stopId,
    city,
    state,
    index,
    stopsLength,
    isSelected
}: Props) {
    const { t } = useAppTranslation('state_info');
    const dispatch = useAppDispatch();

    const is_completed = stopStatus === COMPLETED;
    const is_cancelled = [CANCELLED, TONU].includes(stopStatus);
    const is_progress = [CHECKED_IN, EN_ROUTE, ON_LOCATION].includes(stopStatus);

    const is_icon = is_completed || is_cancelled || is_progress;

    const onSelectStop = () => {
        dispatch(LoadsActions.SetSelectedStopId(stopId));
    };

    return (
        <LoadStopsProgressBarStyled.ProgressBarItem
            is_completed={is_completed}
            is_progress={is_progress}
            is_cancelled={is_cancelled}
            onClick={onSelectStop}
            isSelected={isSelected}
        >
            <LoadStopsProgressBarStyled.ProgressBarContent>
                <LoadStopsProgressBarStyled.IconContainer
                    is_icon={is_icon}
                    isSelected={isSelected}
                >
                    {!is_icon && index + 1}
                    {is_completed && <VectorIcons.Check />}
                    {is_progress && <InTransitIcon size={22} />}
                    {is_cancelled && <CanceledIcon size={22} />}
                </LoadStopsProgressBarStyled.IconContainer>

                <LoadStopsProgressBarStyled.Wrapper
                    hasIcon={is_icon}
                    isSelected={isSelected}
                >
                    <p>{t(`stop.type.${LOAD_STOP_TYPE_GRPC_ENUM[stopType]}`)}</p>
                    <span>{`${city || '-'}, ${state || '-'}`}</span>
                </LoadStopsProgressBarStyled.Wrapper>
            </LoadStopsProgressBarStyled.ProgressBarContent>

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
        </LoadStopsProgressBarStyled.ProgressBarItem>
    );
}

export default React.memo(LoadStopProgressItem);
