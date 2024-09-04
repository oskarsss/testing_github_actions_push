/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import moment from 'moment-timezone';

type CheckEndAt = (data: {
    fixedAppointment: boolean;
    appointmentStartAt: string;
    appointmentEndAt: string;
}) => string;

export const checkEndAt: CheckEndAt = (data) => {
    if (data.fixedAppointment) return data.appointmentStartAt || '';
    if (!data.appointmentEndAt || !moment(data.appointmentEndAt).isValid()) return '';
    return data.appointmentEndAt;
};
