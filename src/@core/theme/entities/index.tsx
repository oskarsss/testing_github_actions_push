import { DRIVER_STATUS_COLORS, DRIVER_STATUS_ICONS } from '@/@core/theme/entities/driver/status';
import { DRIVER_TYPE_COLORS, DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import { IChipColors } from '@/@core/theme/chip';
import { LOAD_STATUS_COLORS, LOAD_STATUS_ICONS } from '@/@core/theme/entities/load/status';
import {
    LOAD_INVOICE_STATUS_COLORS,
    LOAD_INVOICE_STATUS_ICONS
} from '@/@core/theme/entities/load/invoice_status';
import { TRUCK_TYPE_COLORS, TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TRUCK_STATUS_COLORS, TRUCK_STATUS_ICONS } from '@/@core/theme/entities/truck/status';
import { SETTLEMENTS_STATUS_ICONS } from '@/@core/theme/entities/settlement/status';
import { TRAILER_STATUS_COLORS, TRAILER_STATUS_ICONS } from '@/@core/theme/entities/trailer/status';
import { PLATE_STATUS_COLORS, PLATE_STATUS_ICONS } from '@/@core/theme/entities/plate/status';
import { USER_STATUS_COLORS, USER_STATUS_ICONS } from '@/@core/theme/entities/user/status';
import { TRAILER_TYPE_ICONS_LIST } from '@/@core/theme/entities/trailer/type';
import { FLEET_TYPE_COLORS, FLEET_TYPE_ICONS } from '@/@core/theme/entities/fleet/FLEET_TYPE';
import { BookedIcon } from '@/@core/theme/entities/load/load_status_icons';
import React, { ReactNode } from 'react';
import { DRIVER_NET_TYPE_ICONS } from '@/@core/theme/entities/settlement/driver_net_type';
import { RECURRING_TRANSACTION_STATUS_COLORS } from '@/@core/theme/entities/settlement/recurring_transactions_status';

const ADDITIONAL_ICONS = {
    not_assigned: <BookedIcon />
};

export const ENTITY_CHIP_COLORS: Record<string, IChipColors> = {
    ...FLEET_TYPE_COLORS,

    ...DRIVER_STATUS_COLORS,
    ...DRIVER_TYPE_COLORS,

    ...LOAD_INVOICE_STATUS_COLORS,

    ...TRUCK_STATUS_COLORS,
    ...TRUCK_TYPE_COLORS,

    ...TRAILER_STATUS_COLORS,
    ...PLATE_STATUS_COLORS,

    ...USER_STATUS_COLORS,
    ...RECURRING_TRANSACTION_STATUS_COLORS,
    ...LOAD_STATUS_COLORS
};

export const ENTITY_CHIP_ICONS: Record<string, ReactNode> = {
    ...ADDITIONAL_ICONS,
    ...FLEET_TYPE_ICONS,
    ...DRIVER_NET_TYPE_ICONS,

    ...DRIVER_TYPE_ICONS,
    ...DRIVER_STATUS_ICONS,

    ...LOAD_STATUS_ICONS,
    ...LOAD_INVOICE_STATUS_ICONS,

    ...TRUCK_STATUS_ICONS,
    ...TRUCK_TYPE_ICONS,

    ...SETTLEMENTS_STATUS_ICONS,

    ...TRAILER_STATUS_ICONS,
    ...TRAILER_TYPE_ICONS_LIST,

    ...PLATE_STATUS_ICONS,

    ...USER_STATUS_ICONS
};
