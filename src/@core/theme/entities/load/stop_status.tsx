import { COLORS, IChipColors } from '@/@core/theme/chip';
import React from 'react';
import {
    BookedIcon,
    CanceledIcon,
    DeliveredIcon,
    InTransitIcon,
    TonuIcon
} from '@/@core/theme/entities/load/load_status_icons';
import { StopStatuses } from '@/models/loads/load-stop';
import { LoadModel_Stop_Status } from '@proto/models/model_load';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export const LOAD_STOP_STATUS_COLORS: Record<StopStatuses, IChipColors> = {
    pending    : COLORS.yellow,
    completed  : COLORS.success,
    en_route   : COLORS.blue_dark,
    on_location: COLORS.blue_dark,
    checked_in : COLORS.blue_dark,
    canceled   : COLORS.error,
    tonu       : COLORS.error
};
export const LOAD_STOP_STATUS_ICONS: Record<StopStatuses, React.ReactElement> = {
    pending    : <BookedIcon />,
    completed  : <DeliveredIcon />,
    en_route   : <InTransitIcon />,
    on_location: <WhereToVoteIcon />,
    checked_in : <VerifiedUserIcon />,
    canceled   : <CanceledIcon />,
    tonu       : <TonuIcon />
};

export const LoadStopStatusEnumMap: Record<LoadModel_Stop_Status, StopStatuses> = {
    [LoadModel_Stop_Status.pending]    : StopStatuses.PENDING,
    [LoadModel_Stop_Status.completed]  : StopStatuses.COMPLETED,
    [LoadModel_Stop_Status.en_route]   : StopStatuses.EN_ROUTE,
    [LoadModel_Stop_Status.canceled]   : StopStatuses.CANCELED,
    [LoadModel_Stop_Status.unspecified]: StopStatuses.CANCELED,
    [LoadModel_Stop_Status.on_location]: StopStatuses.ON_LOCATION,
    [LoadModel_Stop_Status.tonu]       : StopStatuses.TONU,
    [LoadModel_Stop_Status.checked_in] : StopStatuses.CHECKED_IN

    // [LoadModel_Stop_Status.ON_LOCATION]: StopStatuses.ON_LOCATION,
    // [LoadModel_Stop_Status.TONU]       : StopStatuses.TONU,
};
