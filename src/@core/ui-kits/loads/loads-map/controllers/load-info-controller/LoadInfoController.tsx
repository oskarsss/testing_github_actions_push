/* eslint-disable max-len */
import { Collapse, Stack } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import LoadInfoControllerTruck from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-main/LoadInfoControllerMain';
import LoadInfoControllerStops from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-stops/LoadInfoControllerStops';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';
import { FlyToPoint } from '@/views/dispatch/tracking/map';
import LoadInfoControllerDetails from './LoadInfoControllerDetails';

type Props = {
    driverId?: string;
    truckId?: string;
    trailerId?: string;
    manifestId?: string;
    loadId?: string;
    flyToPoint: FlyToPoint;
};

function LoadInfoController({
    driverId = '',
    truckId = '',
    trailerId = '',
    manifestId,
    loadId,
    flyToPoint
}: Props) {
    const [isShowMore, setIsShowMore] = useState(false);
    const handleClick = useCallback(() => setIsShowMore((prev) => !prev), []);

    if (!truckId) return null;

    return (
        <Stack
            direction="column"
            maxHeight="100%"
            height="fit-content"
            borderRadius="8px"
            padding="12px"
            overflow="hidden auto"
            boxShadow="0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)"
            bgcolor="semantic.background.white"
            width="100%"
            maxWidth="450px"
            sx={(theme) => ({
                pointerEvents: 'auto',
                ...getScrollBarStyles(theme)
            })}
        >
            <LoadInfoControllerTruck
                truckId={truckId}
                driverId={driverId}
                flyToPoint={flyToPoint}
                isShow={isShowMore}
                onHandleShow={handleClick}
            />

            <Collapse
                unmountOnExit
                in={isShowMore}
            >
                <Stack>
                    <LoadInfoControllerDetails
                        truckId={truckId}
                        driverId={driverId}
                        trailerId={trailerId}
                        flyToPoint={flyToPoint}
                    />
                    {(manifestId || loadId) && (
                        <LoadInfoControllerStops
                            manifestId={manifestId}
                            loadId={loadId}
                        />
                    )}
                </Stack>
            </Collapse>
        </Stack>
    );
}

export default memo(LoadInfoController);
