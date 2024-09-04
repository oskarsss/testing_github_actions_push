/* eslint-disable max-len */

import { ReactNode } from 'react';
import { ManifestStopTypesEnum } from '@/models/manifests/manifest-stop';
import StopTypeIcons from '@/@core/theme/entities/load/load_stop_icons';
import { IChipColors } from '../../chip';

export const MANIFEST_STOP_TYPE_ICONS: Record<ManifestStopTypesEnum, ReactNode> = {
    [ManifestStopTypesEnum.PICKUP]         : <StopTypeIcons.PickUpStopTypeIcon />,
    [ManifestStopTypesEnum.DROPOFF]        : <StopTypeIcons.DropOffStopTypeIcon />,
    [ManifestStopTypesEnum.PICKUP_DROPOFF] : <StopTypeIcons.PickUpAndDropOffStopTypeIcon />,
    [ManifestStopTypesEnum.PICKUP_TRAILER] : <StopTypeIcons.TrailerPickUpStopTypeIcon />,
    [ManifestStopTypesEnum.DROPOFF_TRAILER]: <StopTypeIcons.TrailerDropOffStopTypeIcon />,
    [ManifestStopTypesEnum.PICKUP_CHASSIS] : <StopTypeIcons.ChassisPickUpStopTypeIcon />,
    [ManifestStopTypesEnum.DROPOFF_CHASSIS]: <StopTypeIcons.ChassisDropOffStopTypeIcon />,
    [ManifestStopTypesEnum.BORDER_CROSSING]: <StopTypeIcons.BorderCrossingStopTypeIcon />,
    [ManifestStopTypesEnum.START]          : <StopTypeIcons.StartStopTypeIcon />,
    [ManifestStopTypesEnum.END]            : <StopTypeIcons.EndStopTypeIcon />
};

export const MANIFEST_STOP_TYPE_COLORS: Record<ManifestStopTypesEnum, IChipColors> = {
    [ManifestStopTypesEnum.PICKUP]         : 'success',
    [ManifestStopTypesEnum.DROPOFF]        : 'error',
    [ManifestStopTypesEnum.PICKUP_DROPOFF] : 'warning',
    [ManifestStopTypesEnum.PICKUP_TRAILER] : 'violet',
    [ManifestStopTypesEnum.DROPOFF_TRAILER]: 'indigo',
    [ManifestStopTypesEnum.PICKUP_CHASSIS] : 'purple',
    [ManifestStopTypesEnum.DROPOFF_CHASSIS]: 'gray',
    [ManifestStopTypesEnum.BORDER_CROSSING]: 'gray', // TODO: Serhii - change to 'iron'
    [ManifestStopTypesEnum.START]          : 'blue_dark',
    [ManifestStopTypesEnum.END]            : 'pink'
};
