import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import VectorIcons from '@/@core/icons/vector_icons';
import Typography from '@mui/material/Typography';
import { ENTITY_CHIP_ICONS } from '@/@core/theme/entities';
import type { MouseEvent } from 'react';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { useOptionsMenu } from '@/views/fleet/drivers/Details/menus/Options/Options';
import TrucksTypes from '@/store/fleet/trucks/types';
import navigateToPage from '@/utils/navigateToPage';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';

type Props = {
    truck: TruckModel_Truck;
    removeTruck: () => void;
    test_id?: string;
};

export default function TruckInfo({
    truck,
    removeTruck,
    test_id
}: Props) {
    const optionsMenu = useOptionsMenu();

    const moveToTruckDetails = (e: MouseEvent) => {
        navigateToPage(`/trucks/${truck.truckId}`, e);
    };

    const openOptionsMenu = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        optionsMenu.open({
            copy_text  : 'common:reference_id',
            copy_value : truck.referenceId,
            entity_type: 'trucks',
            entity_id  : truck.truckId,
            onRemove   : removeTruck,
            test_id
        })(e);
    };

    return (
        <RightStyled.Info onClick={moveToTruckDetails}>
            <RightStyled.InfoIcon>
                <RightStyled.AvatarStyled
                    alt={truck.model}
                    sx={{ borderRadius: '4px' }}

                    // src={getPrivateURL(partner.selfie_thumb_url)}
                >
                    <VectorIcons.NavIcons.EmptyTruck />
                </RightStyled.AvatarStyled>
                <div>
                    <Typography
                        variant="body1"
                        display="flex"
                        alignItems="center"
                        gap="4px"
                    >
                        {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}
                        {truck?.referenceId}
                    </Typography>
                    <Typography
                        variant="body2"
                        fontSize={12}
                        fontWeight={500}
                    >
                        {`${truck?.year || ''} ${truck?.model || ''}`}
                    </Typography>
                </div>
            </RightStyled.InfoIcon>

            <RightStyled.Icons>
                <RightStyled.Icon onClick={openOptionsMenu}>
                    <MoreVertSharpIcon color="secondary" />
                </RightStyled.Icon>
            </RightStyled.Icons>
        </RightStyled.Info>
    );
}
