import Avatar from '@mui/material/Avatar';
import TableTooltip from '@/@core/components/table-tooltips/ui-elements/TableTooltip';

import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import TooltipStyled from '@/@core/components/table-tooltips/ui-elements/TableTooltip.styled';
import { useDriverTypesMap } from '@/store/hash_maps/hooks';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import VectorIcons from '@/@core/icons/vector_icons';
import type { DriverModel_Driver } from '@proto/models/model_driver';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

type TitleProps = {
    driver: DriverModel_Driver;
    full_name: string;
};

const Title = ({
    driver,
    full_name
}: TitleProps) => {
    const { url } = usePrivateFileUrl(driver.selfieThumbUrl);
    const driverTypesMap = useDriverTypesMap();
    const driverType = driverTypesMap[driver?.driverTypeId];
    return (
        <>
            <Avatar
                alt={`${driver?.firstName} ${driver?.lastName}`}
                src={url}
            >
                {driver?.firstName.charAt(0).toUpperCase()}
                {driver?.lastName.charAt(0).toUpperCase()}
            </Avatar>
            {full_name} | {driverType?.name || '-'} {DRIVER_TYPE_ICONS[driverType?.icon]}
        </>
    );
};

type Props = {
    driver_id: string;
    full_name: string;
};

export default function DriverTooltipForTable({
    driver_id,
    full_name
}: Props) {
    const driversMap = useDriversMap();
    const driverTypesMap = useDriverTypesMap();

    const driver = driversMap[driver_id];
    const driverType = driverTypesMap[driver?.driverTypeId];
    const title = driver ? (
        <Title
            driver={driver}
            full_name={full_name}
        />
    ) : undefined;

    return (
        <TableTooltip title={title}>
            <TooltipStyled.ImageWrapper>
                {driver && driverType && driverType.icon in DRIVER_TYPE_ICONS ? (
                    DRIVER_TYPE_ICONS[driverType.icon]
                ) : (
                    <VectorIcons.DefaultDriverIcon />
                )}
            </TooltipStyled.ImageWrapper>
            <TooltipStyled.Span>{full_name}</TooltipStyled.Span>
        </TableTooltip>
    );
}
