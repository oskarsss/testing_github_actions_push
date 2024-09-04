import moment from 'moment-timezone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import LoadStopComponents from '@/@core/ui-kits/loads/load-stop-time/components/LoadStopComponents';

type CheckInOutType = 'arrivedAt' | 'checkedInAt' | 'checkedOutAt';

export type OnClick = (
    event: React.MouseEvent,
    type: CheckInOutType,
    defaultTime?: string | null
) => void;

type Stop = {
    arrivedAt: string;
    checkedInAt: string;
    checkedOutAt: string;
};

const titles: Record<CheckInOutType, IntlMessageKey> = {
    checkedInAt : 'state_info:stop.check_in',
    checkedOutAt: 'state_info:stop.check_out',
    arrivedAt   : 'state_info:stop.arrived'
};

const icons = (type: CheckInOutType, time: string | null, on_time?: boolean) => {
    if (!time) {
        return <AddIcon />;
    }
    if (type === 'arrivedAt') {
        return (
            <WhereToVoteIcon
                sx={{ color: (theme) => theme.palette.semantic.foreground.brand.primary }}
            />
        );
    }
    if (on_time) {
        return (
            <CheckCircleIcon
                sx={{ color: (theme) => theme.palette.semantic.border.success.primary }}
            />
        );
    }
    return <ErrorIcon sx={{ color: (theme) => theme.palette.semantic.foreground.primary }} />;
};

type Props = {
    stop: Stop;
    on_time?: boolean;
    default_time?: string | null;
    type: CheckInOutType;
    hide?: boolean;
    onClick: OnClick;
};

export default function CheckInOut({
    default_time,
    stop,
    on_time,
    type,
    hide,
    onClick
}: Props) {
    const { t } = useAppTranslation();

    if (hide) return null;

    const title = titles[type];
    const time = stop[type];
    const icon = icons(type, time, on_time);

    return (
        <LoadStopComponents.Button
            onClick={(e) => onClick(e, type, default_time)}
            startIcon={icon}
            time={time}
        >
            <LoadStopComponents.TextWrapper>
                <LoadStopComponents.Text>{t(title)}</LoadStopComponents.Text>

                {time && (
                    <LoadStopComponents.Text textColor="primary">
                        {moment(time).format('HH:mm')}
                    </LoadStopComponents.Text>
                )}
            </LoadStopComponents.TextWrapper>
        </LoadStopComponents.Button>
    );
}
