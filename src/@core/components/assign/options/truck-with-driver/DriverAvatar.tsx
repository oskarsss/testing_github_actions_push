import { Avatar, Stack } from '@mui/material';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import TrucksTypes from '@/store/fleet/trucks/types';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

type Props = {
    item: TrucksTypes.ConvertedTruckRow;
};

export default function DriverAvatar({ item }: Props) {
    const { url } = usePrivateFileUrl(item.driver?.selfieThumbUrl);
    const driverFirstName = item.driver?.firstName?.split(' ')[0];
    const driverLastName = item.driver?.lastName?.split(' ')[1];

    return (
        <Stack position="relative">
            <Avatar
                alt={item.driver ? `${item.driver.firstName} ${item.driver.lastName}` : 'N/A'}
                src={url}
                sx={{ width: 40, height: 40, fontSize: '12px' }}
            >
                {driverFirstName && driverFirstName?.charAt(0).toUpperCase()}
                {driverLastName && driverLastName?.charAt(0).toUpperCase()}
                {!driverFirstName && !driverLastName && 'N/A'}
            </Avatar>

            {item.trailerType && (
                <Stack
                    height="18px"
                    width="18px"
                    alignItems="center"
                    position="absolute"
                    bottom={0}
                    right={0}
                >
                    {getTrailerTypeIcon(item.trailerType.icon || 0)}
                </Stack>
            )}
        </Stack>
    );
}
