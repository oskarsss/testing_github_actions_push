import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { ComponentProps } from 'react';

type Props = {
    truckId: string;
    badgeProps?: Partial<ComponentProps<typeof Badge>>;
};

export default function TruckBadge({
    truckId = '',
    badgeProps
}: Props) {
    const trucksMap = useTrucksMap();
    const truck = trucksMap[truckId];

    if (!truck) return null;
    return (
        <Badge
            variant="filled"
            backgroundColor={(theme) => theme.palette.semantic.foreground.secondary}
            textColor={(theme) => theme.palette.semantic.text.primary}
            icon={TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}
            text={truck.referenceId}
            {...(badgeProps || {})}
        />
    );
}
