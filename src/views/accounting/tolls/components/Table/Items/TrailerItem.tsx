import { TrailerIcon } from '@/@core/icons/custom-nav-icons/icons';
import { Stack } from '@mui/material';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { useTollsOptionMenu } from '../../../menus/TollsOptionMenu';

function TrailerItem({
    trailer_id,
    tollId
}: { trailer_id: string; tollId: string }) {
    const trailersMap = useTrailersMap();
    const foundedTrailer = trailersMap[trailer_id];
    const tollOptionsMenu = useTollsOptionMenu();

    return (
        <Stack
            direction="row"
            spacing={1}
            paddingX={3}
            alignItems="center"
            flex="1 1 0"
            onClick={tollOptionsMenu.open({ tollId, trailerId: foundedTrailer?.trailerId })}
            onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                tollOptionsMenu.open({ tollId, trailerId: foundedTrailer?.trailerId })(e);
            }}
            color={(theme) => theme.palette.semantic.foreground.brand.primary}
            fontWeight={500}
            sx={{
                display       : 'flex',
                alignItems    : 'center',
                justifyContent: 'flex-start',
                svg           : {
                    fill  : (theme) => theme.palette.semantic.foreground.brand.primary,
                    width : 20,
                    height: 20
                }
            }}
        >
            {TrailerIcon()}
            {foundedTrailer?.referenceId}
        </Stack>
    );
}

export default TrailerItem;
