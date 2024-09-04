import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import { MAPBOX_TOKEN } from '@/configs';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import NearMeSharpIcon from '@mui/icons-material/NearMeSharp';
import { useTheme } from '@mui/material/styles';
import { mapStyles } from '@/configs/mapbox';
import { useUpdateEffect } from 'usehooks-ts';
import EntityLayer from './EntityLayer';
import ViewOnGoogleMaps from './ViewOnGoogleMaps';

type Props = {
    lat: number;
    lon: number;
    icon: string;
};

export default function Map({
    lat,
    lon,
    icon
}: Props) {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [blockWidth, setBlockWidth] = useState(0);
    const [map_loaded, setMapLoaded] = useState(false);
    const { mode } = useTheme().palette;
    const [map_style, setMapStyle] = useState(mapStyles[mode]);

    useUpdateEffect(() => {
        setMapStyle(mapStyles[mode]);
    }, [mode]);

    useUpdateEffect(() => {
        mapRef.current?.setStyle(map_style);
    }, [map_style]);

    useEffect(() => {
        if (mapContainerRef.current) {
            const newBlockWidth = mapContainerRef.current.clientWidth;
            const resize = newBlockWidth * 0.8;
            setBlockWidth(resize);
        }

        mapboxgl.accessToken = MAPBOX_TOKEN;
        mapRef.current = new mapboxgl.Map({
            container         : mapContainerRef.current || '',
            style             : map_style,
            center            : [-90.935242, 40.73061],
            zoom              : 4,
            attributionControl: false,
            trackResize       : true,
            scrollZoom        : true,
            projection        : {
                name: 'mercator'
            }
        });

        const afterLoad = () => setMapLoaded(true);

        mapRef.current.on('load', afterLoad);

        const handleResize = () => {
            if (mapContainerRef.current) {
                const newBlockWidth = mapContainerRef.current.clientWidth;
                const resize = newBlockWidth * 0.8;
                setBlockWidth(resize);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (mapRef.current) {
                window.removeEventListener('resize', handleResize);
                mapRef.current.off('load', afterLoad);
            }
        };
    }, []);

    useEffect(() => {
        if (mapRef.current && mapContainerRef.current) {
            mapRef.current.resize();
            mapContainerRef.current.style.height = `${blockWidth}px`;
        }
    }, [mapRef.current, blockWidth]);

    const flyToCurrentDevice = () => {
        if (!mapRef.current) return;
        const center = mapRef.current.getCenter();
        if (center.lng !== lon && center.lat !== lat) {
            mapRef.current.flyTo({
                center   : [lon, lat],
                zoom     : 12,
                essential: true
            });
        }
    };

    return (
        <RightStyled.GPSTrackingMap
            id="map"
            ref={mapContainerRef}
            style={{
                height      : `${blockWidth}px`,
                borderRadius: '8px'
            }}
        >
            {map_loaded && mapRef.current && (
                <EntityLayer
                    map={mapRef.current}
                    lat={lat}
                    lon={lon}
                    icon={icon}
                />
            )}

            <RightStyled.NavigationButton
                color="primary"
                onClick={flyToCurrentDevice}
            >
                <NearMeSharpIcon />
            </RightStyled.NavigationButton>

            <ViewOnGoogleMaps
                lat={lat}
                lon={lon}
            />
        </RightStyled.GPSTrackingMap>
    );
}
