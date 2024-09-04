import MoreDriversBadge from '@/@core/components/overview-driver-avatar/MoreDriversBadge';
import OverviewDriverAvatar from '@/@core/components/overview-driver-avatar/OverviewDriverAvatar';
import { Stack, Tooltip } from '@mui/material';
import React, { memo, PropsWithChildren } from 'react';
import SkeletonControl from '@/views/dispatch/manifests/components/controls/SkeletonControl';
import { formatPhoneNumber } from '@/utils/formatting';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useLastDriverPing } from '@/store/streams/events/hooks';
import VectorIcons from '@/@core/icons/vector_icons';
import ControlsStyled from '@/views/dispatch/manifests/components/controls/styled';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import ManifestStyled from '../styled';
import NoDriver from './NoDriver';

type Props = PropsWithChildren<{
    driverIds: string[];
}>;

function DriverControlContent({
    driverIds,
    children
}: Props) {
    const driversMap = useDriversMap();
    const driverId = driverIds[0];
    const driver = driversMap[driverId];
    const { t } = useAppTranslation();
    const ping = useLastDriverPing(driverId || '');

    if (!Object.keys(driversMap).length) {
        return (
            <ControlsStyled.Container>
                <SkeletonControl />
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="5px"
                >
                    {children}
                </Stack>
            </ControlsStyled.Container>
        );
    }

    if (!driver) {
        return (
            <NoDriver>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="5px"
                >
                    {children}
                </Stack>
            </NoDriver>
        );
    }

    const otherDriverIds = driverIds.length > 1 ? driverIds.slice(1, driverIds.length) : [];

    return (
        <ControlsStyled.Container>
            <Stack
                direction="row"
                gap={2}
            >
                <Stack
                    width="40px"
                    alignItems="center"
                >
                    <MoreDriversBadge driverIds={otherDriverIds}>
                        <OverviewDriverAvatar
                            driverTypeId={driver.driverTypeId}
                            selfieThumbUrl={driver.selfieThumbUrl}
                            fullName={`${driver.firstName} ${driver.lastName}`}
                            slots={{
                                avatarProps: {
                                    sx: {
                                        width : '36px',
                                        height: '36px'
                                    }
                                }
                            }}
                        />
                    </MoreDriversBadge>
                </Stack>
                <Stack direction="column">
                    <ManifestStyled.Title>{`${driver.firstName} ${driver.lastName}`}</ManifestStyled.Title>
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        {!ping && (
                            <Tooltip title={t('common:tooltips.not_using_the_app')}>
                                <Stack>
                                    <VectorIcons.PhoneCrossMarkIcon sx={{ fontSize: '13px' }} />
                                </Stack>
                            </Tooltip>
                        )}
                        <Tooltip
                            title={t('common:tooltips.click_to_call')}
                            disableHoverListener={!driver.phoneNumber}
                            disableInteractive
                        >
                            <a href={`tel:${driver.phoneNumber}`}>
                                <ManifestStyled.Subtitle>
                                    {formatPhoneNumber(driver.phoneNumber)}
                                </ManifestStyled.Subtitle>
                            </a>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                gap="5px"
            >
                {children}
            </Stack>
        </ControlsStyled.Container>
    );
}

export default memo(DriverControlContent);
