import moment from 'moment-timezone';

type CheckOnTimeProps = {
    checkedInAt: string;
    appointmentStartAtLocal: string;
    appointmentEndAtLocal: string;
};

export const checkOnTime = ({
    checkedInAt,
    appointmentStartAtLocal,
    appointmentEndAtLocal
}: CheckOnTimeProps) => {
    if (!checkedInAt) return false;
    if (!appointmentStartAtLocal) return false;

    const checkTime = moment(checkedInAt);
    const start = moment(appointmentStartAtLocal);
    let end = start;

    if (appointmentEndAtLocal) {
        end = moment(appointmentEndAtLocal);
    }
    if (start.isSame(end)) {
        return checkTime.isSameOrBefore(start);
    }

    return checkTime.isBetween(start, end) || checkTime.isSameOrBefore(start);
};

type isBadGpcProps = {
    timestamp?: number;
    lat: number;
    lon: number;
};

export const isBadGpc = (location: isBadGpcProps) => {
    if (!location.timestamp) return true;
    return (
        moment().diff(moment(location?.timestamp), 'days') > 1 || (!location?.lat && !location?.lon)
    );
};
