import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import TableTooltip from '@/@core/components/table-tooltips/ui-elements/TableTooltip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TooltipStyled from '@/@core/components/table-tooltips/ui-elements/TableTooltip.styled';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { TruckModel_Truck } from '@proto/models/model_truck';

const Title = ({ truck }: { truck: TruckModel_Truck }) => {
    const { t } = useAppTranslation();

    return (
        <>
            {truck.year} {truck.make} {truck.model} |{' '}
            {t(`state_info:trucks.type.${TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]}`)}
            {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}
        </>
    );
};

type TooltipDriverTruckProps = {
    truck_id: string;
};

export default function TruckTooltipForTable({ truck_id }: TooltipDriverTruckProps) {
    const trucksMap = useTrucksMap();
    const truck = trucksMap[truck_id];

    const title = truck ? <Title truck={truck} /> : undefined;

    return (
        <TableTooltip title={title}>
            <TooltipStyled.ImageWrapper>
                {truck && TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}
            </TooltipStyled.ImageWrapper>
            <TooltipStyled.Span>{truck?.referenceId?.substr(0, 6)}</TooltipStyled.Span>
        </TableTooltip>
    );
}
