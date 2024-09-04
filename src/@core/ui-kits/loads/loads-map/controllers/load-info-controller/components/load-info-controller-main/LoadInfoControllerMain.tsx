import { memo } from 'react';
import LoadInfoControllerMainTruck from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-main/LoadInfoControllerMainTruck';
import { Divider, IconButton, Stack, Tooltip } from '@mui/material';
import LoadInfoControllerMainDriver from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-main/LoadInfoControllerMainDriver';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { FlyToPoint } from '@/views/dispatch/tracking/map';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    truckId: string;
    driverId: string;
    flyToPoint: FlyToPoint;
    isShow: boolean;
    onHandleShow: () => void;
};

function LoadInfoControllerMain({
    truckId,
    driverId,
    flyToPoint,
    isShow,
    onHandleShow
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap="12px"
            overflow="hidden"
            minHeight="38px"
            width="100%"
        >
            <Stack
                direction="row"
                alignItems="center"
                overflow="hidden"
                gap="inherit"
                width="100%"
            >
                <LoadInfoControllerMainTruck
                    flyToPoint={flyToPoint}
                    truckId={truckId}
                />

                {driverId && (
                    <LoadInfoControllerMainDriver
                        flyToPoint={flyToPoint}
                        driverId={driverId}
                    />
                )}
                <Divider
                    orientation="vertical"
                    sx={{
                        margin     : 0,
                        height     : '36px',
                        borderColor: (theme) => theme.palette.semantic.border.primary
                    }}
                />
            </Stack>

            <Tooltip
                title={t(`common:${isShow ? 'collapse' : 'expand'}`)}
                placement="bottom"
                disableInteractive
            >
                <IconButton
                    sx={{
                        borderRadius: '4px',
                        padding     : '0px',
                        width       : '24px',
                        height      : '24px',
                        marginLeft  : '4px',

                        svg: {
                            transition: 'transform 0.2s',
                            transform : !isShow ? 'rotate(180deg)' : 'rotate(0deg)'
                        }
                    }}
                    aria-label="Show more information"
                    onClick={onHandleShow}
                >
                    <KeyboardArrowUpIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}

export default memo(LoadInfoControllerMain);
