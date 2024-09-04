import { TrailerIcon as CoreTrailerIcon, TrucksIcon } from '@/@core/icons/custom-nav-icons/icons';
import { Box } from '@mui/material';

const TrailerIcon = () => (
    <Box
        sx={{
            display       : 'flex',
            alignItems    : 'center',
            justifyContent: 'center',
            svg           : {
                fill: (theme) => theme.palette.semantic.foreground.brand.primary
            }
        }}
    >
        <CoreTrailerIcon />
    </Box>
);

const TruckIcon = () => (
    <Box
        sx={{
            display       : 'flex',
            alignItems    : 'center',
            justifyContent: 'center',
            svg           : {
                fill: (theme) => theme.palette.semantic.foreground.brand.primary
            }
        }}
    >
        <TrucksIcon />
    </Box>
);

const TollsIcons = {
    TruckIcon,
    TrailerIcon
};

export default TollsIcons;
