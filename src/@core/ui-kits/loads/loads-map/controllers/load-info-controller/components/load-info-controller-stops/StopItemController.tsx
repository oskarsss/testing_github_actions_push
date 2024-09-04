import { formatMiles, formatMinutes } from '@/utils/formatting';
import { Stack, Typography, createSvgIcon } from '@mui/material';
import { LoadModel_Stop_Type } from '@proto/models/model_load';
import React from 'react';
import { Event_Truck_Route_Stop_Type } from '@proto/events/events';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { FlyToPoint } from '../../../../../../../../views/dispatch/tracking/map';

type Stop = {
    sequence: number;
    stopId: string;
    city: string;
    state: string;
    stopType: LoadModel_Stop_Type | Event_Truck_Route_Stop_Type;
    lngLat: [number, number];
    isCompleted: boolean;
    load_friendly_id: string | number;
    eta: {
        eta: number;
        distance: number;
        earliness: number;
        lateness: number;
    };
};

type Props = {
    idx: number;
    stop: Stop;
    flyToPoint: FlyToPoint;
    isHideCompleted: boolean;
};

const STOPS_COLORS_CONFIG: Record<LoadModel_Stop_Type, string> = {
    0: '#FFC107',
    1: '#54B471',
    2: '#FF4C51',
    3: '#FFC107',
    4: '#FFC107',
    5: '#FFC107',
    6: '#FFC107',
    7: '#FFC107'
};

const ArrivesIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.33333 6.00065C3.33333 3.42332 5.42267 1.33398 8 1.33398C10.5773 1.33398 12.6667 3.42332 12.6667 6.00065C12.6667 7.62852 11.7541 8.79278 10.8559 9.72829C10.6389 9.95436 10.4152 10.1743 10.2009 10.385L10.1726 10.4129C9.94702 10.6348 9.73232 10.8465 9.53048 11.0593C9.124 11.4876 8.80227 11.8868 8.59628 12.2988C8.48336 12.5246 8.25251 12.6673 8 12.6673C7.74749 12.6673 7.51664 12.5246 7.40372 12.2988C7.19773 11.8868 6.876 11.4876 6.46952 11.0593C6.26768 10.8465 6.05298 10.6348 5.82744 10.4129L5.79904 10.385C5.58475 10.1743 5.36114 9.95435 5.1441 9.72829C4.24591 8.79278 3.33333 7.62852 3.33333 6.00065ZM10 6.00065C10 7.10522 9.10457 8.00065 8 8.00065C6.89543 8.00065 6 7.10522 6 6.00065C6 4.89608 6.89543 4.00065 8 4.00065C9.10457 4.00065 10 4.89608 10 6.00065Z"
            fill="#596372"
        />
        <path
            d="M4.1823 10.6517C4.15399 10.6222 4.12541 10.5923 4.09661 10.5618C2.81317 10.9898 2 11.6249 2 12.334C2 13.6226 4.68629 14.6673 8 14.6673C11.3137 14.6673 14 13.6226 14 12.334C14 11.6249 13.1868 10.9898 11.9034 10.5618C11.8746 10.5923 11.846 10.6222 11.8177 10.6517C11.5874 10.8916 11.3523 11.1227 11.1417 11.3299L11.1075 11.3635C10.8801 11.5872 10.6813 11.7835 10.4977 11.977C10.1217 12.3732 9.90672 12.6593 9.78885 12.8951C9.45007 13.5726 8.75755 14.0006 8 14.0006C7.24245 14.0006 6.54993 13.5726 6.21115 12.895C6.09328 12.6593 5.8783 12.3732 5.50232 11.977C5.31869 11.7835 5.11991 11.5872 4.89249 11.3635L4.85826 11.3298C4.64761 11.1227 4.41261 10.8916 4.1823 10.6517Z"
            fill="#596372"
        />
    </svg>,
    'ArrivesIcon'
);

const EtaMinutesTimeIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
    >
        <path
            d="M6.66659 2.00065C6.66659 1.63246 6.96506 1.33398 7.33325 1.33398H9.99992C10.3681 1.33398 10.6666 1.63246 10.6666 2.00065C10.6666 2.36884 10.3681 2.66732 9.99992 2.66732H8.66659H7.33325C6.96506 2.66732 6.66659 2.36884 6.66659 2.00065Z"
            fill="currentColor"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.66659 2.66732C11.9803 2.66732 14.6666 5.35361 14.6666 8.66732C14.6666 11.981 11.9803 14.6673 8.66659 14.6673C7.23772 14.6673 5.92551 14.1679 4.89503 13.334H6.66659C7.40297 13.334 7.99992 12.737 7.99992 12.0007C7.99992 11.2643 7.40297 10.6673 6.66659 10.6673H6.48821C6.60166 10.4712 6.66659 10.2435 6.66659 10.0007C6.66659 9.26427 6.06963 8.66732 5.33325 8.66732H2.66659C2.66659 5.35361 5.35288 2.66732 8.66659 2.66732ZM8.66659 5.33398C8.2984 5.33398 7.99992 5.63246 7.99992 6.00065V8.66732C7.99992 9.03551 8.2984 9.33398 8.66659 9.33398C9.03477 9.33398 9.33325 9.03551 9.33325 8.66732V6.00065C9.33325 5.63246 9.03477 5.33398 8.66659 5.33398Z"
            fill="currentColor"
        />
        <path
            d="M1.99992 9.33398C1.63173 9.33398 1.33325 9.63246 1.33325 10.0007C1.33325 10.3688 1.63173 10.6673 1.99992 10.6673H5.33325C5.70144 10.6673 5.99992 10.3688 5.99992 10.0007C5.99992 9.63246 5.70144 9.33398 5.33325 9.33398H1.99992Z"
            fill="currentColor"
        />
        <path
            d="M3.33325 11.334C2.96506 11.334 2.66659 11.6325 2.66659 12.0007C2.66659 12.3688 2.96506 12.6673 3.33325 12.6673H6.66659C7.03477 12.6673 7.33325 12.3688 7.33325 12.0007C7.33325 11.6325 7.03478 11.334 6.66659 11.334H3.33325Z"
            fill="currentColor"
        />
    </svg>,
    'EtaMinutesTimeIcon'
);

function StopItemController({
    idx,
    stop,
    flyToPoint,
    isHideCompleted
}: Props) {
    const { t } = useAppTranslation();
    const onClick = () => {
        flyToPoint(stop.lngLat[0], stop.lngLat[1], 14);
    };

    if (isHideCompleted && stop.isCompleted) return null;

    return (
        <Stack
            direction="row"
            alignItems="center"
            paddingY="4px"
            paddingX="8px"
            onClick={onClick}
            justifyContent="space-between"
            sx={{
                '&:hover': {
                    backgroundColor: (theme) => theme.palette.semantic.background.secondary
                },
                cursor: 'pointer'
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
            >
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Typography
                        sx={{
                            backgroundColor: STOPS_COLORS_CONFIG[stop.stopType],
                            fontSize       : '12px',
                            fontWeight     : 600,
                            display        : 'flex',
                            alignItems     : 'center',
                            justifyContent : 'center',
                            borderRadius   : '50%',
                            height         : '20px',
                            width          : '20px',
                            color          : (theme) => theme.palette.semantic.background.white
                        }}
                    >
                        {idx + 1}
                    </Typography>

                    {!!stop.load_friendly_id && (
                        <Typography
                            fontSize="16px"
                            fontWeight={600}
                            minWidth="30px"
                            style={{ marginLeft: '8px' }}
                        >
                            {stop.load_friendly_id}
                        </Typography>
                    )}
                </Stack>

                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-start"
                    paddingX="8px"
                >
                    {(stop.city || stop.state) && (
                        <Typography
                            variant="body2"
                            color="#596372"
                            fontSize="14px"
                            fontWeight={500}
                        >
                            {`${stop.city || '-'}, ${stop.state || '-'}`}
                        </Typography>
                    )}
                </Stack>
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                gap="4px"
            >
                {stop.eta?.eta ? (
                    <>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            width="110px"
                            sx={{
                                backgroundColor: '#F4F5F6',
                                padding        : '2px',
                                borderRadius   : '4px'
                            }}
                        >
                            <ArrivesIcon
                                sx={{
                                    width : '16px',
                                    height: '16px'
                                }}
                            />
                            <Stack
                                flexDirection="row"
                                alignItems="baseline"
                                gap="4px"
                            >
                                {stop.eta.distance ? (
                                    <Typography
                                        variant="body2"
                                        fontSize="10px"
                                        lineHeight="15px"
                                        fontWeight={600}
                                    >
                                        {`${formatMiles(stop.eta.distance)} mi`}
                                    </Typography>
                                ) : null}
                                <Typography
                                    variant="body1"
                                    fontSize="12px"
                                    lineHeight="18px"
                                    fontWeight={600}
                                >
                                    {formatMinutes(stop.eta?.eta ?? 0, t)}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            width="70px"
                            sx={{
                                backgroundColor: stop.eta.earliness > 0 ? '#E5F7EF' : '#FFEBEB',
                                padding        : '2px',
                                borderRadius   : '4px',
                                color          : stop.eta.earliness > 0 ? '#14B86D' : '#FF1F25'
                            }}
                        >
                            <EtaMinutesTimeIcon
                                sx={{
                                    width : '16px',
                                    height: '16px'
                                }}
                            />
                            <Typography
                                variant="body1"
                                fontSize="12px"
                                fontWeight={600}
                                color="inherit"
                                noWrap
                            >
                                {` ${formatMinutes(
                                    stop.eta.lateness ? stop.eta.lateness : stop.eta.earliness,
                                    t
                                )}`}
                            </Typography>
                        </Stack>
                    </>
                ) : null}
            </Stack>
        </Stack>
    );
}

export default StopItemController;
