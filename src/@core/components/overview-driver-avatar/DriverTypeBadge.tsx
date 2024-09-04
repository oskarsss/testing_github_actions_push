import Tooltip from '@mui/material/Tooltip';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { DriverTypeModel_Icon } from '@proto/models/model_driver_type';
import { useDriverTypesMap } from '@/store/hash_maps/hooks';

type Props = {
    driverTypeId: string;
    children: React.ReactNode;
    badgeProps?: BadgeProps;
};

export default function DriverTypeBadge({
    driverTypeId,
    children,
    badgeProps
}: Props) {
    const driverType = useDriverTypesMap(driverTypeId);
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            {...badgeProps}
            sx={{
                svg: {
                    width : '16px',
                    height: '16px'
                },
                ...badgeProps?.sx
            }}
            badgeContent={(
                <Tooltip
                    disableInteractive
                    title={driverType?.name || ''}
                >
                    <div>{DRIVER_TYPE_ICONS[driverType?.icon || DriverTypeModel_Icon.DEFAULT]}</div>
                </Tooltip>
            )}
        >
            {children}
        </Badge>
    );
}
