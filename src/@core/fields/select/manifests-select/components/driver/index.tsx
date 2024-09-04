import { memo } from 'react';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { Avatar, Typography, Stack, Tooltip } from '@mui/material';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import DriverTooltip from './DriverTooltip';

type Props = {
    driverIds: string[];
};

function DriverWithTooltip({ driverIds }: Props) {
    const driversMap = useDriversMap();
    const driverId = driverIds[0];
    const driver = driversMap[driverId];
    const { url } = usePrivateFileUrl(driver?.selfieThumbUrl);

    if (!driver) return null;

    const fullName = `${driver.firstName || ''} ${driver?.lastName || ''}`;
    const otherDriverIds = driverIds.length > 1 ? driverIds.slice(1, driverIds.length) : [];

    return (
        <Stack
            direction="row"
            gap="4px"
            overflow="hidden"
            alignItems="center"
        >
            <Avatar
                alt={fullName}
                src={url}
                sx={{
                    width   : '16px',
                    height  : '16px',
                    fontSize: '11px'
                }}
            >
                {fullName[0]}
            </Avatar>

            <Typography
                variant="body1"
                fontSize="12px"
                fontWeight={500}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {fullName}
            </Typography>

            {otherDriverIds.length > 0 && (
                <Tooltip
                    placement="top"
                    title={<DriverTooltip driverIds={otherDriverIds} />}
                    disableInteractive
                    componentsProps={{
                        tooltip: {
                            sx: {
                                backgroundColor: (theme) => theme.palette.semantic.background.white,
                                boxShadow:
                                    '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)'
                            }
                        }
                    }}
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name   : 'offset',
                                    options: {
                                        offset: [0, -12]
                                    }
                                }
                            ]
                        }
                    }}
                >
                    <Typography
                        variant="body1"
                        fontSize="12px"
                        fontWeight={500}
                        color="semantic.text.secondary"
                        sx={{ cursor: 'pointer' }}
                    >
                        +{otherDriverIds.length}
                    </Typography>
                </Tooltip>
            )}

            <Typography
                noWrap
                fontSize="12px"
                fontWeight={500}
                color="semantic.text.secondary"
            >
                l
            </Typography>
        </Stack>
    );
}

export default memo(DriverWithTooltip);
