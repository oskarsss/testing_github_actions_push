import CapListStyled from '@/views/dispatch/scheduling/dialogs/CapList/styled';
import React from 'react';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { Skeleton, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import getInitials from '@/utils/get-initials';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

type Props = {
    driverId: string;
    truckReferenceId: string;
};

const TruckCapListCell = ({
    driverId,
    truckReferenceId
}: Props) => {
    const { t } = useAppTranslation();
    const driversMap = useDriversMap();
    const driver = driversMap[driverId];

    const { url } = usePrivateFileUrl(driver?.selfieThumbUrl || '');

    // eslint-disable-next-line no-nested-ternary
    const full_name = driverId
        ? driver
            ? `${driver.firstName} ${driver.lastName}`
            : ''
        : t('common:empty.no_drivers');

    const loading = Object.keys(driversMap).length === 0;

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
        >
            {loading ? (
                <Skeleton
                    variant="circular"
                    width={24}
                    height={24}
                />
            ) : (
                <Avatar
                    alt={driver?.firstName || 'driver'}
                    src={url}
                    sx={{
                        width          : '24px',
                        height         : '24px',
                        fontSize       : '8px',
                        backgroundColor: ({ palette }) => palette.semantic.background.primary
                    }}
                >
                    {driver
                        ? getInitials(`${driver.firstName} ${driver.lastName}`)
                        : t('common:not_provided')}
                </Avatar>
            )}
            <Stack>
                <CapListStyled.MainTextCell
                    sx={{
                        color: (theme) => theme.palette.semantic.text.primary
                    }}
                >
                    {truckReferenceId}
                </CapListStyled.MainTextCell>
                {loading ? (
                    <Skeleton
                        variant="text"
                        width={70}
                        sx={{
                            marginTop: '-3px'
                        }}
                    />
                ) : (
                    <CapListStyled.SecondaryTextCell noWrap>
                        {full_name.trim() || '-'}
                    </CapListStyled.SecondaryTextCell>
                )}
            </Stack>
        </Stack>
    );
};

export default TruckCapListCell;
