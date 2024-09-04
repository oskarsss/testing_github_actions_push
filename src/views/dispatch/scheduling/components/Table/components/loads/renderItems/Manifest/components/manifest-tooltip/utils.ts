/* eslint-disable max-len */

import moment from 'moment-timezone';
import ManifestsTypes from '@/store/dispatch/manifests/types';

const timeFormat = 'MMM D h:mm A';

export const prepareEndDate = (stop: ManifestsTypes.AnyPreparedStop, isCompletedLoad: boolean) => {
    if (isCompletedLoad && stop.checkedInAt) {
        return moment(stop.checkedInAt).format(timeFormat);
    }

    return stop.appointmentEndAtLocal
        ? moment(stop.appointmentEndAtLocal).format(timeFormat)
        : moment(stop.appointmentStartAtLocal).format(timeFormat);
};

export const prepareStartDate = (
    stop: ManifestsTypes.AnyPreparedStop,
    isCompletedLoad: boolean
) => {
    if (isCompletedLoad && stop.checkedInAt) {
        return moment(stop.checkedInAt).format(timeFormat);
    }

    if (isCompletedLoad && stop.checkedInAt && !stop.checkedInAt) {
        return moment(stop.checkedInAt).format(timeFormat);
    }

    if (stop.appointmentStartAtLocal) {
        return moment(stop.appointmentStartAtLocal).format(timeFormat);
    }

    return '';
};
