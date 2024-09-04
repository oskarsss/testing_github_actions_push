import { Avatar, Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import { DRIVER_STATUS_COLORS, DRIVER_STATUS_ICONS } from '@/@core/theme/entities/driver/status';

import openNewWindow from '@/utils/open-new-window';
import { useConvertDriver } from '@/store/fleet/drivers/hooks';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { DRIVER_STATUS_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';
import { useEditSettlementContext } from '../../EditSettlement';

export default function DriverField() {
    const { driver } = useEditSettlementContext();
    const { t } = useAppTranslation();

    const { converter } = useConvertDriver();

    const convertedDriver = useMemo(() => (driver ? converter(driver) : null), [converter, driver]);

    const onClickArrowForward = () => {
        if (!driver) return;
        openNewWindow(`/drivers/${driver.driverId}`);
    };

    const avatarUrl = usePrivateFileUrl(driver?.selfieThumbUrl);

    const driverName = `${driver?.firstName} ${driver?.lastName}`;

    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
                padding        : '12px',
                borderRadius   : '4px',
                maxHeight      : '54px',
                height         : '100%',
                backgroundColor: (theme) => theme.palette.semantic.foreground.secondary
            }}
        >
            <Avatar
                alt={driverName}
                src={avatarUrl.url}
                sx={{ width: 24, height: 24, fontSize: '12px', gap: '8px' }}
            >
                {driver?.firstName?.charAt(0).toUpperCase()}
                {driver?.lastName?.charAt(0).toUpperCase()}
            </Avatar>
            <Stack
                direction="column"
                justifyContent="space-between"
            >
                <Typography
                    variant="body2"
                    fontSize="12px"
                    fontWeight={500}
                >
                    {t('entity:driver')}
                </Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography
                        variant="body1"
                        fontSize="14px"
                        fontWeight={500}
                        width="max-content"
                    >
                        {driverName}
                    </Typography>
                    {convertedDriver?.driverType && (
                        <Tooltip title={convertedDriver.driverType.name || ''}>
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                {DRIVER_TYPE_ICONS[convertedDriver.driverType.icon]}
                            </span>
                        </Tooltip>
                    )}

                    {driver?.status && (
                        <Tooltip
                            title={t(
                                `state_info:drivers.full_status.${
                                    DRIVER_STATUS_GRPC_ENUM[driver?.status] || 'active'
                                }`
                            )}
                        >
                            <Box
                                component="span"
                                sx={(theme) => ({
                                    height        : '20px',
                                    width         : '20px',
                                    display       : 'flex',
                                    alignItems    : 'center',
                                    justifyContent: 'center',
                                    borderRadius  : '4px',
                                    svg           : {
                                        height: '16px',
                                        margin: '0 !important'
                                    },
                                    color: theme.palette.utility.foreground[
                                        DRIVER_STATUS_COLORS[driver.status]
                                    ].primary,
                                    backgroundColor:
                                        theme.palette.utility.foreground[
                                            DRIVER_STATUS_COLORS[driver.status]
                                        ].secondary
                                })}
                            >
                                {DRIVER_STATUS_ICONS[driver.status]}
                            </Box>
                        </Tooltip>
                    )}
                </Stack>
            </Stack>
            <Tooltip
                title={t('common:tooltips.see_entity_details', {
                    entity: t('entity:driver').toLowerCase()
                })}
            >
                <IconButton onClick={onClickArrowForward}>
                    <ArrowForwardIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}
