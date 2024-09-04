import { Box, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import AdjustIcon from '@mui/icons-material/Adjust';
import { UseLocationFleetResult } from '@/store/dispatch/scheduling/hooks';
import { useManifestTruckRoute } from '@/store/streams/events/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    isAutoFitFounds: boolean;
    setIsAutoFitFounds: (value: boolean) => void;
    fleetLocation: UseLocationFleetResult;
    truck_id?: string;
};

export default function AutoFitFounds({
    isAutoFitFounds,
    setIsAutoFitFounds,
    fleetLocation,
    truck_id
}: Props) {
    const route = useManifestTruckRoute(truck_id || '');
    const { t } = useAppTranslation('core');

    const disabled = !fleetLocation?.type;

    // || !route;

    return (
        <Tooltip
            disableInteractive
            title={t(
                disabled
                    ? 'basic.load.map.tooltips.auto_fit_founds_disabled'
                    : 'basic.load.map.tooltips.auto_fit_founds'
            )}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                height="40px"
                width="40px"
                sx={{
                    backgroundColor: (theme) => theme.palette.semantic.background.white,
                    display        : 'flex',
                    alignItems     : 'center',
                    justifyContent : 'center',
                    pointerEvents  : 'auto',
                    borderRadius   : '8px'
                }}
            >
                <IconButton
                    disabled={disabled}
                    onClick={() => {
                        setIsAutoFitFounds(!isAutoFitFounds);
                    }}
                    sx={{
                        borderRadius: 'inherit',
                        width       : '100%',
                        height      : '100%'
                    }}
                >
                    <AdjustIcon color={isAutoFitFounds ? 'primary' : 'secondary'} />
                </IconButton>
            </Box>
        </Tooltip>
    );
}
