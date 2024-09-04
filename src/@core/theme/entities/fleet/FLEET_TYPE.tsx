import { IChipColors } from '@/@core/theme/chip';
import { TrailerIcon, TrucksIcon } from '@/@core/icons/custom-nav-icons/icons';
import { PlateModel_VehicleType } from '@proto/models/model_plate';
import React from 'react';

export const FLEET_TYPE_ICONS = {
    truck  : <TrucksIcon />,
    trailer: <TrailerIcon />
};
export const FLEET_TYPE_COLORS: Record<string, IChipColors> = {
    truck  : 'gray',
    trailer: 'gray'
};

export const FLEET_TYPE_GRPC_ICONS: Record<PlateModel_VehicleType, React.ReactNode> = {
    [PlateModel_VehicleType.TRUCK]      : <TrucksIcon />,
    [PlateModel_VehicleType.TRAILER]    : <TrailerIcon />,
    [PlateModel_VehicleType.UNSPECIFIED]: <TrucksIcon />
};
