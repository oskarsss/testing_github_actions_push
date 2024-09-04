import { useCallback, useMemo } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Scheduling from '@/store/dispatch/scheduling/types';
import moment from 'moment-timezone';
import { useAccountCompanies } from '@/store/app/hooks';
import { useAddTimeOffDialog } from '@/views/dispatch/scheduling/dialogs/TimeOff/AddTimeOffDialog';
import HomeIcon from '@mui/icons-material/Home';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import BedIcon from '@mui/icons-material/Bed';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import IcecreamIcon from '@mui/icons-material/Icecream';
import type { IntlMessageKey } from '@/@types/next-intl';
import { AddTimeOffBnt, Block, ContainerInfo, InfoBlock, Title } from './styled';

const dutyStatusIcons: any = {
    sleeper: (
        <BedIcon
            style={{
                fontSize: 25,
                color   : '#99A4B0'
            }}
        />
    ),
    driving: (
        <DriveEtaIcon
            style={{
                fontSize: 25,
                color   : '#99A4B0'
            }}
        />
    ),
    on_duty: (
        <ContentPasteIcon
            style={{
                fontSize: 25,
                color   : '#99A4B0'
            }}
        />
    ),
    off_duty: (
        <HistoryToggleOffIcon
            style={{
                fontSize: 25,
                color   : '#99A4B0'
            }}
        />
    ),
    personal_conveyance: (
        <IcecreamIcon
            style={{
                fontSize: 25,
                color   : '#99A4B0'
            }}
        />
    )
};

const msToTime = (a: number | null) => {
    if (!a) return '00:00';

    let s = a;

    // Pad to 2 or 3 digits, default is 2
    function pad(n: number, z = 2) {
        return `00${n}`.slice(-z);
    }

    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;

    return `${pad(hrs)}:${pad(mins)}`; // + ':' + pad(secs) for seconds display
};

type DriverInfoProps = {
    isActive: boolean;
    truck: Scheduling.TruckManifestRow;
    driver: Scheduling.TruckManifestRow['drivers'][0];
};

const DriverInfo = ({
    isActive,
    truck,
    driver
}: DriverInfoProps) => {
    const addTimeOffDialog = useAddTimeOffDialog();
    const { timezone } = useAccountCompanies();
    const { t } = useAppTranslation();

    const addTimeOff = () => {
        addTimeOffDialog.open({
            truck_id: truck.truckId
        });
    };

    const timeOffNow = () => {
        const array: Scheduling.TruckManifestRow['timeOffs'] = [];
        if (!truck.timeOffs.length) {
            return array;
        }

        const now = moment().tz(timezone);

        truck.timeOffs.forEach((timeOff) => {
            const start = moment.tz(timeOff.startAt, timezone);
            const end = moment.tz(timeOff.endAt, timezone);

            if (now.isBetween(start, end)) {
                if (start.isSame(end, 'day')) {
                    const startAt = start.format('HH:mm');
                    const endAt = end.format('HH:mm');

                    array.push({ ...timeOff, startAt, endAt });
                    return;
                }

                const startAt = start.format('MMM DD');
                const endAt = end.format('MMM DD');
                array.push({ ...timeOff, startAt, endAt });
            }
        });

        return array;
    };

    const timeOffs = timeOffNow();

    const {
        driveTimeAvailable,
        driveTimeAccumulated,
        driveTimeLimit,
        breakTimeAvailable,
        breakTimeAccumulated,
        breakTimeLimit,
        shiftTimeAvailable,
        shiftTimeLimit,
        shiftTimeAccumulated,
        cycleTimeAvailable,
        cycleTimeLimit,
        cycleTimeAccumulated
    } = driver;

    const openELDSettings = useCallback(() => {
        const baseUrl = window.location.origin;

        window.open(`${baseUrl}/settings/integrations`, '_blank');
    }, []);

    const ServiceInforOrLinkELD = useMemo(() => {
        const showLinkWithELD =
            !breakTimeAvailable &&
            !cycleTimeAvailable &&
            !driveTimeAvailable &&
            !shiftTimeAvailable;
        if (showLinkWithELD) {
            return (
                <InfoBlock style={{ paddingRight: 0 }}>
                    <Title>
                        <TimelapseIcon
                            sx={{
                                fontSize: 25,
                                color   : (theme) => theme.palette.semantic.foreground.primary
                            }}
                        />
                        {t('schedule:table.driver.info.hours_of_service')}
                    </Title>

                    <AddTimeOffBnt
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            openELDSettings();
                        }}
                        endIcon={<ArrowForward />}
                        style={{ padding: '0px 6px', textTransform: 'capitalize' }}
                    >
                        {t('schedule:table.driver.info.link_vehicle_with_eld')}
                    </AddTimeOffBnt>
                </InfoBlock>
            );
        }

        return (
            <InfoBlock>
                <Title>
                    {dutyStatusIcons[driver.dutyStatus] ? (
                        dutyStatusIcons[driver.dutyStatus]
                    ) : (
                        <TimelapseIcon
                            sx={{
                                fontSize: 25,
                                color   : (theme) => theme.palette.semantic.foreground.primary
                            }}
                        />
                    )}

                    {t(`state_info:drivers.eld.duty_status.${driver.dutyStatus}` as IntlMessageKey)}
                </Title>
                <div style={{ display: 'flex', flexGrow: 1 }}>
                    {/* ---------------- THIS WEEK ---------------- */}
                    <Block>
                        <div>{msToTime(driver.driveTimeAvailable)}</div>
                        <Title>{t('schedule:table.driver.info.drive')}</Title>
                    </Block>

                    {/* ---------------- TODAY ---------------- */}
                    <Block>
                        <div>{msToTime(driver.breakTimeAvailable)}</div>
                        <Title>{t('schedule:table.driver.info.break')}</Title>
                    </Block>

                    {/* ---------------- THIS WEEK ---------------- */}
                    <Block>
                        <div>{msToTime(driver.shiftTimeAvailable)}</div>
                        <Title>{t('schedule:table.driver.info.shift')}</Title>
                    </Block>
                    {/* ---------------- THIS WEEK ---------------- */}
                    <Block>
                        <div>{msToTime(driver.cycleTimeAvailable)}</div>
                        <Title>{t('schedule:table.driver.info.cycle')}</Title>
                    </Block>
                </div>
            </InfoBlock>
        );
    }, [
        driveTimeAvailable,
        driveTimeAccumulated,
        driveTimeLimit,
        breakTimeAvailable,
        breakTimeAccumulated,
        breakTimeLimit,
        shiftTimeAvailable,
        shiftTimeLimit,
        shiftTimeAccumulated,
        cycleTimeAvailable,
        cycleTimeLimit,
        cycleTimeAccumulated,
        t
    ]);

    return (
        <ContainerInfo isActive={isActive}>
            {ServiceInforOrLinkELD}
            <InfoBlock>
                <Title>
                    <HomeIcon
                        sx={{
                            fontSize: 25,
                            color   : (theme) => theme.palette.semantic.foreground.primary
                        }}
                    />
                    {t('schedule:table.driver.info.home_time')}
                </Title>

                {timeOffs.length ? (
                    <Block>
                        <div>{`${timeOffs[0].startAt}-${timeOffs[0].endAt}`}</div>
                        <Title>{timeOffs[0].description}</Title>
                    </Block>
                ) : (
                    <AddTimeOffBnt
                        size="small"
                        variant="outlined"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            addTimeOff();
                        }}
                        startIcon={<AddIcon />}
                        style={{ padding: '0px 6px' }}
                    >
                        {t('schedule:table.time_off.add')}
                    </AddTimeOffBnt>
                )}
            </InfoBlock>
        </ContainerInfo>
    );
};

export default DriverInfo;
