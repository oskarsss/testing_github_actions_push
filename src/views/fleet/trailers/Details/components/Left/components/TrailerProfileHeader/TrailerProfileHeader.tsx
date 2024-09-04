import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import { TrailerIcon } from '@/@core/icons/custom-nav-icons/icons';
import TrailerStatusChipSelect from '@/@core/fields/chip-select/TrailerStatusChipSelect';
import { useEditTrailerDialog } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailer';
import { TestIDs } from '@/configs/tests';
import HeaderTopContentMarkup from '@/views/fleet/trucks/Details/components/Left/components/TruckProfileHeader/HeaderTopContentMarkup';
import {
    TRAILER_OWNERSHIP_TYPE_GRPC,
    TRAILER_STATUS_GRPC
} from '@/models/fleet/trailers/trailers-mappings';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { TRAILER_OWNERSHIP_TYPE_ICONS } from '@/@core/theme/entities/trailer/trailerOwnershipType';

type Props = {
    trailer: TrailerModel_Trailer;
};

export default function TrailerProfileHeader({ trailer }: Props) {
    const editTrailerDialog = useEditTrailerDialog();

    const edit = () => {
        if (trailer) {
            editTrailerDialog.open({
                trailer_id: trailer.trailerId
            });
        }
    };

    const render_status_chip = () => (
        <TrailerStatusChipSelect
            trailer_id={trailer.trailerId}
            trailer_status={TRAILER_STATUS_GRPC[trailer.status]}
        />
    );

    const trailerType = TRAILER_OWNERSHIP_TYPE_GRPC[trailer.ownershipType];

    return (
        <LeftStyled.CardContentHeader>
            <HeaderTopContentMarkup
                render_status_chip={render_status_chip}
                avatar_icon={TrailerIcon()}
                type_icon={TRAILER_OWNERSHIP_TYPE_ICONS[trailerType]}
                tooltip_type_text={`state_info:trailers.ownership_type.${trailerType}`}
                reference_id={trailer.referenceId}
                onEdit={edit}
                test_id={TestIDs.pages.trailerProfile.buttons.edit}
            />
        </LeftStyled.CardContentHeader>
    );
}
