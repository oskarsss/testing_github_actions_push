import React from 'react';
import { COLORS, IChipColors } from '@/@core/theme/chip';
import {
    AssignedIcon,
    BookedIcon,
    CanceledIcon,
    DeliveredIcon,
    InTransitIcon,
    TonuIcon
} from '@/@core/theme/entities/load/load_status_icons';
import { LoadStatus } from '@/models/loads/load';
import { LoadModel_Status } from '@proto/models/model_load';

export const LOAD_STATUS_COLORS: Record<LoadStatus, IChipColors> = {
    // available  : COLORS.yellow,
    pending    : COLORS.yellow,
    assigned   : COLORS.warning,
    in_progress: COLORS.blue_dark,
    delivered  : COLORS.success,
    canceled   : COLORS.error,
    tonu       : COLORS.pink,
    deleted    : COLORS.gray
};

export const LOAD_GRPC_MODEL_STATUS_COLORS: Record<LoadModel_Status, IChipColors> = {
    [LoadModel_Status.pending]    : COLORS.yellow,
    [LoadModel_Status.assigned]   : COLORS.warning,
    [LoadModel_Status.in_progress]: COLORS.blue_dark,
    [LoadModel_Status.delivered]  : COLORS.success,
    [LoadModel_Status.canceled]   : COLORS.gray,
    [LoadModel_Status.tonu]       : COLORS.error,
    [LoadModel_Status.unspecified]: COLORS.gray,
    [LoadModel_Status.deleted]    : COLORS.error
};

export const LoadStatusEnumMap: Record<LoadModel_Status, LoadStatus> = {
    [LoadModel_Status.pending]    : 'pending',
    [LoadModel_Status.assigned]   : 'assigned',
    [LoadModel_Status.in_progress]: 'in_progress',
    [LoadModel_Status.delivered]  : 'delivered',
    [LoadModel_Status.canceled]   : 'canceled',
    [LoadModel_Status.tonu]       : 'tonu',
    [LoadModel_Status.unspecified]: 'canceled',
    [LoadModel_Status.deleted]    : 'deleted'
};

export const LOAD_STATUS_ICONS: Record<LoadStatus, React.ReactElement> = {
    // available  : <BookedIcon />,
    pending    : <BookedIcon />,
    assigned   : <AssignedIcon />,
    in_progress: <InTransitIcon />,
    delivered  : <DeliveredIcon />,
    canceled   : <CanceledIcon />,
    tonu       : <TonuIcon />,
    deleted    : <CanceledIcon />
};

export const loads_icons_with_width = (
    size: number | undefined
): Record<LoadStatus, React.ReactElement> => ({
    pending    : <BookedIcon size={size} />,
    assigned   : <AssignedIcon size={size} />,
    in_progress: <InTransitIcon size={size} />,
    delivered  : <DeliveredIcon size={size} />,
    canceled   : <CanceledIcon size={size} />,
    tonu       : <TonuIcon size={size} />,
    deleted    : <CanceledIcon size={size} />
});
