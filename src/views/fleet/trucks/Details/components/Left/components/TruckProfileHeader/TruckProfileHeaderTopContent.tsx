import { TrucksIcon } from '@/@core/icons/custom-nav-icons/icons';
import TruckStatusChipSelect from '@/@core/fields/chip-select/TruckStatusChipSelect';
import { TestIDs } from '@/configs/tests';
import { useEditTruckDialog } from '@/views/fleet/trucks/dialogs/EditTruck/EditTruck';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import HeaderTopContentMarkup from '@/views/fleet/trucks/Details/components/Left/components/TruckProfileHeader/HeaderTopContentMarkup';
import { useMemo } from 'react';
import TruckOnlineButton from '@/views/dispatch/scheduling/components/Table/components/truck/location/TruckOnlineButton';
import { useTrucksManifestsStream } from '@/store/streams/loads';
import {
    TRUCK_STATUS_TO_LOCALE,
    TRUCK_TYPE_TO_GRPC_REVERSE_ENUM
} from '@/models/fleet/trucks/trucks-mappings';
import { TruckModel_Truck } from '@proto/models/model_truck';

type Props = {
    truck_id: TruckModel_Truck['truckId'];
    reference_id: TruckModel_Truck['referenceId'];
    status: TruckModel_Truck['status'];
    type: TruckModel_Truck['type'];
};

export default function TruckProfileHeaderTopContent({
    truck_id,
    reference_id,
    status,
    type
}: Props) {
    const editTruckDialog = useEditTruckDialog();
    const { trucks } = useTrucksManifestsStream({});

    const current_truck = useMemo(
        () => trucks.find((truck) => truck.truckId === truck_id),
        [trucks]
    );

    const editTruck = () => {
        editTruckDialog.open({ truck_id });
    };

    const render_status_chip = () => (
        <TruckStatusChipSelect
            truck_id={truck_id}
            truck_status={TRUCK_STATUS_TO_LOCALE[status]}
        />
    );

    const render_online_icon = () =>
        current_truck &&
        current_truck.drivers.length > 0 && (
            <TruckOnlineButton
                truck_online={current_truck.online}
                truck_id={truck_id}
            />
        );

    return (
        <HeaderTopContentMarkup
            render_status_chip={render_status_chip}
            avatar_icon={TrucksIcon()}
            type_icon={TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[type]]}
            tooltip_type_text={`state_info:trucks.type.${TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[type]}`}
            reference_id={reference_id}
            onEdit={editTruck}
            render_online_icon={render_online_icon}
            test_id={TestIDs.pages.truckProfile.buttons.edit}
        />
    );
}
