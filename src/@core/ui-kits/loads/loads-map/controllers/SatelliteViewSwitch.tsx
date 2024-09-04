import Tooltip from '@mui/material/Tooltip';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import React from 'react';
import { useTheme } from '@mui/material';
import { mapStyles } from '@/configs/mapbox';
import mapboxgl from 'mapbox-gl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import LoadMapStyled from '../../../../../views/dispatch/orders/Details/sections/load-map/LoadMap.styled';

type Props = {
    map: mapboxgl.Map;
    isSatellite: boolean;
    setSatellite: (isSatellite: boolean) => void;
};

export default function SatelliteViewSwitch({
    map,
    isSatellite,
    setSatellite
}: Props) {
    const { mode } = useTheme().palette;
    const { t } = useAppTranslation('core');

    const onChange = () => {
        if (isSatellite) {
            setSatellite(false);
            map.setStyle(mapStyles[mode]);
        } else {
            setSatellite(true);

            map.setStyle(mapStyles.satellite);
        }
    };

    return (
        <Tooltip
            title={t(
                !isSatellite
                    ? 'basic.load.map.tooltips.switch_to_satellite'
                    : `basic.load.map.tooltips.switch_to_${mode}`
            )}
        >
            <LoadMapStyled.ControllerSatellite onClick={onChange}>
                <SatelliteAltIcon color={isSatellite ? 'primary' : 'action'} />
            </LoadMapStyled.ControllerSatellite>
        </Tooltip>
    );
}
