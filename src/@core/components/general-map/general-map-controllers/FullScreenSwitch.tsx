import React, { useEffect, useState } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import LoadMapStyled from '../../../../views/dispatch/orders/Details/sections/load-map/LoadMap.styled';

type Props = {
    wrapRef: HTMLDivElement;
    mapRef: mapboxgl.Map;
};
export default function FullScreenSwitch({
    wrapRef,
    mapRef
}: Props) {
    const [checked, setChecked] = useState(false);
    const { t } = useAppTranslation();
    useEffect(() => {
        const fullscreenchange = () => {
            setChecked((prev) => !prev);
            setTimeout(() => {
                mapRef.resize();
            }, 100);
        };

        wrapRef.addEventListener('fullscreenchange', fullscreenchange);

        return () => {
            wrapRef.removeEventListener('fullscreenchange', fullscreenchange);
        };
    }, [wrapRef]);

    const toggleFullscreen = () => {
        if (!checked) {
            wrapRef.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <LoadMapStyled.ControllerFullscreen>
            <span>{t('pages:map')}</span>
            <LoadMapStyled.Switch
                checked={checked}
                onChange={() => toggleFullscreen()}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </LoadMapStyled.ControllerFullscreen>
    );
}
