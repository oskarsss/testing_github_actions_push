import { IChipColors } from '@/@core/theme/chip';
import {
    TruckLeasedIcon,
    TruckOwnedIcon,
    TruckOwnerOperator
} from '@/@core/theme/entities/truck/type_icons';
import { TruckType } from '@/models/fleet/trucks/truck-type';

export const TRUCK_TYPE_ICONS: Record<TruckType, JSX.Element> = {
    owner_operator: <TruckOwnerOperator />,
    owned         : <TruckOwnedIcon />,
    leased        : <TruckLeasedIcon />
};

export const TRUCK_TYPE_COLORS: Record<string, IChipColors> = {
    company       : 'gray',
    lease         : 'gray',
    owner_operator: 'gray'
};
