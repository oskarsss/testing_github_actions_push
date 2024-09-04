import { Box, Tooltip } from '@mui/material';
import { MapHelper } from '@/utils/mapbox-utils/map-helper';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { layers } from '../../../../../views/dispatch/orders/Details/sections/load-map/config';

type IconProps = {
    isSelected?: boolean;
};

const DisconectedSVG = ({ isSelected }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
    >
        <g clipPath="url(#clip0_4260_57213)">
            <circle
                cx="8.34139"
                cy="6.66668"
                r="1.33333"
                fill={isSelected ? '#BDC7D2' : 'white'}
            />
            <circle
                cx="11.5929"
                cy="9.33333"
                r="1.33333"
                fill={isSelected ? '#BDC7D2' : 'white'}
            />
            <circle
                cx="14.0001"
                cy="12.6667"
                r="1.33333"
                fill={isSelected ? '#BDC7D2' : 'white'}
            />
            <circle
                cx="8.00008"
                cy="2.66668"
                r="1.33333"
                fill={isSelected ? '#BDC7D2' : 'white'}
            />
            <circle
                cx="4.00008"
                cy="2.66668"
                r="1.33333"
                fill={isSelected ? '#BDC7D2' : 'white'}
            />
            <circle
                cx="2.00008"
                cy="8.66668"
                r="1.33333"
                fill={isSelected ? '#BDC7D2' : 'white'}
            />
        </g>
        <defs>
            <clipPath id="clip0_4260_57213">
                <rect
                    width="16"
                    height="16"
                    fill="white"
                />
            </clipPath>
        </defs>
    </svg>
);

const ConnectedSVG = ({ isSelected }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
    >
        <g clipPath="url(#clip0_4260_57204)">
            <path
                d="M14.226 13.2842L11.8236 9.58042C11.7515 9.46919 11.6628 9.36958 11.5607 9.285L8.52596 6.77046C8.22602 6.52195 8.05244 6.1527 8.05244 5.76318V4.02394C8.05244 3.30149 7.46678 2.71582 6.74432 2.71582H5.19198C4.64669 2.71582 4.1586 3.05407 3.96714 3.56463L1.77417 9.41261"
                stroke="white"
                strokeLinecap="round"
            />
            <circle
                cx="8.34139"
                cy="6.66668"
                r="1.33333"
                fill={isSelected ? '#BDC7D2' : 'white'}
            />
            <circle
                cx="11.5929"
                cy="9.33333"
                r="1.33333"
                fill={isSelected ? '#BDC7D2' : 'white'}
            />
            <circle
                cx="14.0001"
                cy="12.6667"
                r="1.33333"
                fill={isSelected ? '#BDC7D2' : 'white'}
            />
            <circle
                cx="8.00008"
                cy="2.66668"
                r="1.33333"
                fill={isSelected ? '#BDC7D2' : 'white'}
            />
            <circle
                cx="4.00008"
                cy="2.66668"
                r="1.33333"
                fill={isSelected ? '#BDC7D2' : 'white'}
            />
            <circle
                cx="2.00008"
                cy="8.66668"
                r="1.33333"
                fill={isSelected ? '#BDC7D2' : 'white'}
            />
        </g>
        <defs>
            <clipPath id="clip0_4260_57204">
                <rect
                    width="16"
                    height="16"
                    fill="white"
                />
            </clipPath>
        </defs>
    </svg>
);

type Props = {
    MapWorker: MapHelper;
    connected: boolean;
    setConnect: (connect: boolean) => void;
};

export default function ConnectLocationHistory({
    MapWorker,
    connected,
    setConnect
}: Props) {
    const { t } = useAppTranslation();
    const onChange = () => {
        if (connected) {
            setConnect(false);
            MapWorker.removeLayer(layers.passed_route_polyline.id);
        } else {
            setConnect(true);
            MapWorker.addLayer(layers.passed_route_polyline, layers.route_polyline_to_next_stop.id);
        }
    };

    return (
        <Box
            sx={{
                pointerEvents  : 'auto',
                cursor         : 'pointer',
                padding        : '2px',
                backgroundColor: (theme) => theme.palette.semantic.background.white,
                borderRadius   : '6px'
            }}
        >
            <Tooltip
                disableInteractive
                title={t(
                    !connected
                        ? 'core:basic.load.map.tooltips.connect_loc_history'
                        : 'core:basic.load.map.tooltips.disconnect_loc_history'
                )}
            >
                <Box
                    sx={{
                        display     : 'flex',
                        alignItems  : 'center',
                        maxHeight   : '36px',
                        borderRadius: '50%'
                    }}
                >
                    <Box
                        sx={{
                            height         : '28px',
                            width          : '28px',
                            borderRadius   : '70px 0px 0px 70px',
                            display        : 'flex',
                            alignItems     : 'center',
                            justifyContent : 'center',
                            backgroundColor: (theme) => theme.palette.semantic.background.secondary
                        }}
                    >
                        <Box
                            onClick={onChange}
                            sx={{
                                display        : 'flex',
                                alignItems     : 'center',
                                justifyContent : 'center',
                                height         : '100%',
                                width          : '100%',
                                backgroundColor: (theme) =>
                                    !connected
                                        ? theme.palette.semantic.foreground.brand.primary
                                        : theme.palette.semantic.background.secondary,
                                borderRadius: '50%'
                            }}
                        >
                            <DisconectedSVG isSelected={connected} />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            height         : '28px',
                            width          : '28px',
                            borderRadius   : '0px 70px 70px 0px ',
                            display        : 'flex',
                            alignItems     : 'center',
                            justifyContent : 'center',
                            backgroundColor: (theme) => theme.palette.semantic.background.secondary
                        }}
                    >
                        <Box
                            onClick={onChange}
                            sx={{
                                display        : 'flex',
                                alignItems     : 'center',
                                justifyContent : 'center',
                                height         : '100%',
                                width          : '100%',
                                backgroundColor: (theme) =>
                                    connected
                                        ? theme.palette.semantic.foreground.brand.primary
                                        : theme.palette.semantic.background.secondary,
                                borderRadius: '50%'
                            }}
                        >
                            <ConnectedSVG isSelected={!connected} />
                        </Box>
                    </Box>
                </Box>
            </Tooltip>
        </Box>
    );
}
