import React from 'react';
import { LoadStopTypesEnum } from '@/models/loads/load-stop';
import { IChipColors } from '@/@core/theme/chip';
import StopTypeIcons from '@/@core/theme/entities/load/load_stop_icons';

export const LOAD_STOP_TYPE_ICONS: Record<LoadStopTypesEnum, React.ReactElement> = {
    [LoadStopTypesEnum.PICKUP]         : <StopTypeIcons.PickUpStopTypeIcon />,
    [LoadStopTypesEnum.DROPOFF]        : <StopTypeIcons.DropOffStopTypeIcon />,
    [LoadStopTypesEnum.PICKUP_DROPOFF] : <StopTypeIcons.PickUpAndDropOffStopTypeIcon />,
    [LoadStopTypesEnum.PICKUP_TRAILER] : <StopTypeIcons.TrailerPickUpStopTypeIcon />,
    [LoadStopTypesEnum.DROPOFF_TRAILER]: <StopTypeIcons.TrailerDropOffStopTypeIcon />,
    [LoadStopTypesEnum.PICKUP_CHASSIS] : <StopTypeIcons.ChassisPickUpStopTypeIcon />,
    [LoadStopTypesEnum.DROPOFF_CHASSIS]: <StopTypeIcons.ChassisDropOffStopTypeIcon />
};

export const LOAD_STOP_TYPE_COLORS: Record<LoadStopTypesEnum, IChipColors> = {
    [LoadStopTypesEnum.PICKUP]         : 'success',
    [LoadStopTypesEnum.DROPOFF]        : 'error',
    [LoadStopTypesEnum.PICKUP_DROPOFF] : 'warning',
    [LoadStopTypesEnum.PICKUP_TRAILER] : 'violet',
    [LoadStopTypesEnum.DROPOFF_TRAILER]: 'indigo',
    [LoadStopTypesEnum.PICKUP_CHASSIS] : 'purple',
    [LoadStopTypesEnum.DROPOFF_CHASSIS]: 'gray'
};
