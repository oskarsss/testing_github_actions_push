import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TruckType } from '@/models/fleet/trucks/truck-type';
import React from 'react';
import TypeCell from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/custom-cell/TypeCell';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    truckType: TruckType;
};

export default function TruckTypeCapListCell({ truckType }: Props) {
    const { t } = useAppTranslation();
    return (
        <TypeCell
            icon={TRUCK_TYPE_ICONS[truckType]}
            name={t(`state_info:trucks.type.${truckType}`)}
        />
    );
}
