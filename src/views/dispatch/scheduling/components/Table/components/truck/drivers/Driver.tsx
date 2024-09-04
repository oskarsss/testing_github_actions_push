import Tooltip from '@mui/material/Tooltip';
import { type SyntheticEvent, useState } from 'react';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import CopyText from '@/@core/components/copy-text/CopyText';
import DriverInfo from '@/views/dispatch/scheduling/components/Table/components/truck/drivers/DriverInfo';
import getInitials from '@/utils/get-initials';
import openNewWindow from '@/utils/open-new-window';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Scheduling from '@/store/dispatch/scheduling/types';
import VectorIcons from '@/@core/icons/vector_icons';
import { useSendCriticalNotificationDialog } from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/SendCriticalNotification';
import { formatPhoneNumber } from '@/utils/formatting';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriverTypesMap } from '@/store/hash_maps/hooks';
import { Skeleton } from '@mui/material';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import { useAppSelector } from '@/store/hooks';
import { DriversDataSelectors } from '@/store/storage/drivers/slice';
import {
    ButtonShowMore,
    ButtonStyled,
    Container,
    Avatar,
    CriticalNotification,
    DriverInfoColumn,
    DriverNameWrap,
    PhoneNumber
} from './styled';

type Props = {
    driver: Scheduling.TruckManifestRow['drivers'][0];
    truck: Scheduling.TruckManifestRow;
};

export function DriverAvatar({
    truckOnline,
    selfieThumbUrl,
    driverId,
    fullName
}: {
    driverId: string;
    fullName: string;
    selfieThumbUrl: string;
    truckOnline: boolean;
}) {
    const { url } = usePrivateFileUrl(selfieThumbUrl);
    const { t } = useAppTranslation('common');

    return (
        <Tooltip
            disableInteractive
            title={t('tooltips.open_in_new_tab')}
        >
            <Avatar
                key={driverId}
                isOnline={truckOnline}
                src={url}
                alt="avatar"
                onClick={(e) => {
                    e.stopPropagation();
                    openNewWindow(`drivers/${driverId}`);
                }}
            >
                {getInitials(fullName).slice(0, 2)}
            </Avatar>
        </Tooltip>
    );
}

const TruckDriver = ({
    driver,
    truck
}: Props) => {
    const { t } = useAppTranslation();
    const [showMore, setShowMore] = useState(false);
    const criticalNotification = useSendCriticalNotificationDialog();
    const driversMap = useDriversMap();
    const driverTypesMap = useDriverTypesMap();
    const driverMap = driversMap[driver.driverId];
    const driverType = driverTypesMap[driverMap?.driverTypeId || ''];
    const driversMapLoading = useAppSelector(DriversDataSelectors.getIsLoading);
    const open = () => {
        criticalNotification.open({
            id: driver.driverId
        });
    };

    const handleToggleShowMore = (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setShowMore(!showMore);
    };

    return (
        <Container key={driver.driverId}>
            {/* ---------------- AVATAR ---------------- */}
            {driversMapLoading ? (
                <Skeleton
                    variant="circular"
                    width={39}
                    height={39}
                    sx={{ mr: '6px' }}
                />
            ) : (
                <DriverAvatar
                    truckOnline={truck.online}
                    driverId={driver.driverId}
                    selfieThumbUrl={driverMap?.selfieThumbUrl}
                    fullName={`${driverMap?.firstName || ''} ${driverMap?.lastName || ''}`}
                />
            )}

            {/* ---------------- BUTTON SHOW MORE ---------------- */}
            <ButtonShowMore
                type="button"
                onKeyDown={handleToggleShowMore}
                onClick={(e) => {
                    if ((e.target as HTMLElement).tagName !== 'SPAN') {
                        handleToggleShowMore(e);
                    }
                }}
                showMore={showMore}
            >
                <div>
                    <div>
                        <DriverNameWrap>
                            {/* ---------------- EDIT DRIVER ---------------- */}
                            <Tooltip
                                disableInteractive
                                title={t('common:tooltips.open_in_new_tab')}
                            >
                                <ButtonStyled
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openNewWindow(`drivers/${driver.driverId}`, true);
                                    }}
                                >
                                    {driversMapLoading ? (
                                        <Skeleton
                                            variant="text"
                                            width={100}
                                        />
                                    ) : (
                                        <>
                                            {driverMap?.firstName || ''} {driverMap?.lastName || ''}
                                        </>
                                    )}
                                </ButtonStyled>
                            </Tooltip>

                            {/* ---------------- DRIVER TYPE ---------------- */}
                            {driverType && (
                                <Tooltip title={driverType.name}>
                                    <div>{DRIVER_TYPE_ICONS[driverType.icon]}</div>
                                </Tooltip>
                            )}
                        </DriverNameWrap>

                        {/* ---------------- PHONE NUMBER ---------------- */}
                        {driversMapLoading ? (
                            <Skeleton
                                variant="text"
                                width={90}
                            />
                        ) : (
                            <CopyText text={driverMap?.phoneNumber}>
                                <PhoneNumber>
                                    {formatPhoneNumber(driverMap?.phoneNumber || '')}
                                </PhoneNumber>
                            </CopyText>
                        )}
                    </div>

                    {/* ---------------- ARROW ICON ---------------- */}
                    <DriverInfoColumn isActive={showMore}>
                        <KeyboardArrowRightIcon
                            sx={{
                                fontSize: 20,
                                color   : (theme) => theme.palette.semantic.foreground.primary
                            }}
                        />
                    </DriverInfoColumn>
                </div>

                <Tooltip
                    placement="top"
                    title={t('schedule:table.driver.send_critical_alert')}
                >
                    <CriticalNotification
                        onClick={(e) => {
                            e.stopPropagation();
                            open();
                        }}
                    >
                        <VectorIcons.DetailsIcons.CriticalNotification
                            sx={{
                                fontSize: '24px',
                                color   : (theme) => theme.palette.utility.foreground.error.primary
                            }}
                        />
                    </CriticalNotification>
                </Tooltip>
            </ButtonShowMore>

            {/* ---------------- CHILDREN ---------------- */}
            <DriverInfo
                truck={truck}
                driver={driver}
                isActive={showMore}
            />
        </Container>
    );
};

export default TruckDriver;
