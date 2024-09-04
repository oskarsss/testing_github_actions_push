import React, { memo } from 'react';
import moment from 'moment-timezone';
import HouseIcon from '@mui/icons-material/House';
import { EditTimeOffType, PositionType } from '@/views/dispatch/scheduling/components/Table/types';
import Scheduling from '@/store/dispatch/scheduling/types';
import ManifestComponents from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/Manifest/ManifestComponents';
import TimeOffComponents from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/TimeOff/TimeOffComponents';
import { Stack } from '@mui/material';
import { LOAD_WIDTH_SIZE } from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/contants';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import Badge from '@/@core/ui-kits/basic/badge/Badge';

type Props = {
    time_off?: Scheduling.TimeOffType;
    width: number;
    position: PositionType;
    EditTimeOff: EditTimeOffType;
    overWidth?: boolean;
    diffMinutes: number;
};

const TimeOff = ({
    time_off,
    width,
    position,
    EditTimeOff,
    overWidth,
    diffMinutes
}: Props) => {
    const { t } = useAppTranslation();
    if (!time_off) return null;

    const outsidePosition = !!(position.right || Number(position.left) < 0 || overWidth);

    const onOpenEditTimeOff = (event: React.MouseEvent<HTMLDivElement>) => {
        EditTimeOff(event, time_off);
    };

    const getTime = (date: string) => {
        let format = 'HH:mm';

        if ((outsidePosition || overWidth) && width >= LOAD_WIDTH_SIZE.extraSmall + 40) {
            format = 'DD MMM HH:mm';
        }
        return moment(date).format(format);
    };

    return (
        <ManifestComponents.Container
            key={time_off.id}
            status={ManifestModel_Status.UNSPECIFIED}
            overWidth={overWidth}
            widthLoad={width}
            position={position}
            errorSize={diffMinutes <= 60}
            onClick={onOpenEditTimeOff}
        >
            {/* --------------- FIRST DATE --------------- */}
            <TimeOffComponents.DateContainer loadWidth={width}>
                <TimeOffComponents.DateText textAlign="left">
                    {t('fields:start.label')}
                </TimeOffComponents.DateText>
                <TimeOffComponents.Date textAlign="left">
                    {getTime(time_off.startAt)}
                </TimeOffComponents.Date>
            </TimeOffComponents.DateContainer>

            {/* --------------- DESCRIPTION --------------- */}
            {width > LOAD_WIDTH_SIZE.medium && (
                <Stack>
                    <Badge
                        variant="filled"
                        size="small"
                        utilityColor="gray"
                        icon={<HouseIcon />}
                        text={t('schedule:table.time_off.title')}
                    />
                    <TimeOffComponents.Description
                        fontWeight={700}
                        noWrap
                    >
                        {time_off.description}
                    </TimeOffComponents.Description>
                </Stack>
            )}

            {width <= LOAD_WIDTH_SIZE.medium && (
                <Badge
                    variant="filled"
                    size="small"
                    utilityColor="gray"
                    text={t('schedule:table.time_off.title')}
                />
            )}

            {/* --------------- LAST DATE --------------- */}
            <TimeOffComponents.DateContainer loadWidth={width}>
                <TimeOffComponents.DateText textAlign="right">
                    {t('fields:end.label')}
                </TimeOffComponents.DateText>
                <TimeOffComponents.Date textAlign="right">
                    {getTime(time_off.endAt)}
                </TimeOffComponents.Date>
            </TimeOffComponents.DateContainer>
        </ManifestComponents.Container>
    );
};

export default memo(TimeOff);
