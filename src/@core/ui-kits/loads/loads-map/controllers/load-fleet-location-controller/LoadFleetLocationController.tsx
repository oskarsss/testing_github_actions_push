import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { DriverIcon, TrucksIcon } from '@/@core/icons/custom-nav-icons/icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import { FlyToPoint } from '@/views/dispatch/orders/Details/sections/load-map/LoadMap';
import { useLocationFleet } from '@/store/dispatch/scheduling/hooks';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import VectorIcons from '@/@core/icons/vector_icons';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const Button = styled(MuiButton, {
    shouldForwardProp(propName) {
        return propName !== 'noLocation';
    }
})<{ noLocation?: boolean }>(({
    theme,
    noLocation
}) => ({
    padding        : '6px',
    backgroundColor: noLocation
        ? theme.palette.utility.foreground.error.tertiary
        : theme.palette.semantic.background.white,
    color: noLocation
        ? theme.palette.utility.foreground.error.primary
        : theme.palette.semantic.text.primary,
    textTransform: 'none',
    borderRadius : 8,
    height       : 32,
    gap          : 4,
    right        : 'auto',
    overflow     : 'hidden',
    pointerEvents: 'auto',

    '&:hover': {
        backgroundColor: theme.palette.semantic.background.secondary
    },

    '& .MuiDivider-root': {
        margin         : 0,
        width          : 1,
        height         : 20,
        backgroundColor: theme.palette.semantic.border.secondary
    }
}));

type Props = {
    driverId?: string;
    truckId?: string;
    tooltip?: IntlMessageKey;
    flyToPoint?: FlyToPoint;
};

function LoadFleetLocationController({
    driverId = '',
    truckId = '',
    tooltip = 'common:tooltips.show_current_loc',
    flyToPoint
}: Props) {
    const { t } = useAppTranslation();
    const location = useLocationFleet(driverId, truckId);

    if (!driverId && !truckId) return null;

    const color = location.location_current ? 'blue_dark' : 'gray';
    const no_location = !location || !location.lon || !location.lat;

    const click = () => {
        if (no_location) return;
        if (flyToPoint) {
            flyToPoint(location.lon, location.lat);
        }
    };

    return (
        <Tooltip
            disableInteractive
            title={t(no_location ? 'common:tooltips.install_driver_app' : tooltip)}
        >
            <span style={{ pointerEvents: 'auto', height: 'fit-content' }}>
                <Button
                    onClick={click}
                    disabled={no_location}
                    noLocation={no_location}
                >
                    <Badge
                        size="small"
                        variant="filled"
                        utilityColor={no_location ? 'error' : color}
                        icon={
                            no_location ? (
                                <VectorIcons.NoCurrentLocationIcon />
                            ) : (
                                <VectorIcons.CurrentLocationIcon />
                            )
                        }
                        sx={{ padding: 0 }}
                    />

                    {location.type && (
                        <Stack
                            sx={{
                                svg: {
                                    fill : (theme) => theme.palette.semantic.foreground.primary,
                                    color: (theme) => theme.palette.semantic.foreground.primary
                                }
                            }}
                        >
                            {location.type === 'driver' && <DriverIcon />}
                            {location.type === 'truck' && <TrucksIcon />}
                        </Stack>
                    )}

                    <Typography
                        noWrap
                        fontSize="14px"
                        fontWeight="500"
                        lineHeight={1.4}
                        color={(theme) =>
                            theme.palette.semantic.text[no_location ? 'error' : 'primary']}
                    >
                        {!no_location
                            ? location.address || t('common:empty.no_address_found')
                            : t('common:empty.no_location')}
                    </Typography>

                    {!no_location && location.location_age && (
                        <>
                            <Divider orientation="vertical" />

                            <Badge
                                size="small"
                                variant="filled"
                                utilityColor={color}
                                icon={<WatchLaterIcon />}
                                text={location.location_age}
                            />
                        </>
                    )}
                </Button>
            </span>
        </Tooltip>
    );
}

export default React.memo(LoadFleetLocationController);
