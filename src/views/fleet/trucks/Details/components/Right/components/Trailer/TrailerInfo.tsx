import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import VectorIcons from '@/@core/icons/vector_icons';
import Typography from '@mui/material/Typography';
import { TestIDs } from '@/configs/tests';
import type { MouseEvent } from 'react';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { useOptionsMenu } from '@/views/fleet/drivers/Details/menus/Options/Options';
import navigateToPage from '@/utils/navigateToPage';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';

type Props = {
    trailer: TrailerModel_Trailer;
    removeTrailer: () => void;
};

export default function TrailerInfo({
    trailer,
    removeTrailer
}: Props) {
    const optionsMenu = useOptionsMenu();

    const trailersTypesMap = useTrailersTypesMap();
    const moveToTruckDetails = (e: MouseEvent) => {
        navigateToPage(`/trailers/${trailer.trailerId}`, e);
    };

    const trailerType = trailersTypesMap[trailer.trailerTypeId || ''];

    const openOptionsMenu = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        optionsMenu.open({
            copy_text  : 'common:reference_id',
            copy_value : trailer.referenceId,
            entity_type: 'trailers',
            entity_id  : trailer.trailerId,
            onRemove   : removeTrailer,
            test_id    : TestIDs.pages.truckProfile.buttons.removeTrailer
        })(e);
    };

    return (
        <RightStyled.Info onClick={moveToTruckDetails}>
            <RightStyled.InfoIcon>
                <RightStyled.AvatarStyled
                    alt="Trailer icon"
                    sx={{ borderRadius: '4px' }}

                    // src={getPrivateURL(partner.selfie_thumb_url)}
                >
                    <VectorIcons.NavIcons.Trailer />
                </RightStyled.AvatarStyled>
                <div>
                    <Typography
                        variant="body1"
                        display="flex"
                        alignItems="center"
                        gap="4px"
                    >
                        {getTrailerTypeIcon(trailerType?.icon)}
                        {trailer.referenceId}
                    </Typography>
                    <Typography
                        variant="body2"
                        fontSize={12}
                        fontWeight={500}
                    >
                        {trailerType?.name || ''}
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
