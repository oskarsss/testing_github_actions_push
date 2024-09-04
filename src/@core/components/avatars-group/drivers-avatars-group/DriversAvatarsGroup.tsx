import { SxProps } from '@mui/material';
import AvatarsGroupStyled from '@/@core/components/avatars-group/AvatarGroup.styled';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import DriverAvatar from './DriverAvatar';

type Props = {
    driversIds: string[];
    maxAvatarCounts?: number;
    avatarStyles?: SxProps;
};

function DriversAvatarsGroup({
    driversIds,
    maxAvatarCounts = 5,
    avatarStyles
}: Props) {
    const driversMap = useDriversMap();
    return (
        <AvatarsGroupStyled.AvatarGroup
            max={maxAvatarCounts}
            total={driversIds.length}
            slotProps={{
                additionalAvatar: {
                    sx: avatarStyles
                }
            }}
        >
            {driversIds.map((driverId) => {
                const cachedDriver = driversMap[driverId];
                if (!cachedDriver) return null;

                const initials = `${cachedDriver.firstName[0]}${cachedDriver.lastName[0]}`;
                return (
                    <DriverAvatar
                        driverUrl={cachedDriver.selfieThumbUrl}
                        initials={initials}
                        tooltipTitle={`${cachedDriver.firstName} ${cachedDriver.lastName || ''}`}
                        key={driverId}
                        styles={avatarStyles}
                    />
                );
            })}
        </AvatarsGroupStyled.AvatarGroup>
    );
}

export default DriversAvatarsGroup;
