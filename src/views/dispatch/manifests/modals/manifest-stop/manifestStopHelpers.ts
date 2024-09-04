import ManifestsTypes from '@/store/dispatch/manifests/types';
import { ManifestStopAddRequest_Location } from '@proto/manifest_stops';
import * as yup from 'yup';
import moment from 'moment-timezone';
import { ManifestStopTypes, ManifestStopTypesEnum } from '@/models/manifests/manifest-stop';

export type DefaultValues = {
    note: string;
    sequence: number;
    appointmentEndAt: string;
    appointmentStartAt: string;
    checkedInAt: string;
    checkedOutAt: string;
    location: ManifestStopAddRequest_Location;
    fixedAppointment: boolean;
    referenceId: string;
    manifestId: string;
    type: ManifestStopTypesEnum;
};

export const defaultValues: DefaultValues = {
    note              : '',
    sequence          : 0,
    type              : ManifestStopTypesEnum.PICKUP,
    appointmentEndAt  : '',
    appointmentStartAt: '',
    location          : {
        address   : '',
        city      : '',
        lat       : 0,
        line1     : '',
        lon       : 0,
        name      : '',
        postalCode: '',
        state     : '',
        line2     : ''
    },
    fixedAppointment: false,
    referenceId     : '',
    checkedInAt     : '',
    checkedOutAt    : '',
    manifestId      : ''
};

export function getFormValues(
    stop?: ManifestsTypes.PreparedStop,
    manifestId?: string
): DefaultValues {
    if (!stop) return defaultValues;
    return {
        appointmentEndAt  : stop.appointmentEndAtLocal || '',
        appointmentStartAt: stop.appointmentStartAtLocal || '',
        checkedInAt       : stop.checkedInAt || '',
        checkedOutAt      : stop.checkedOutAt || '',
        location          : stop.location || {
            address   : '',
            city      : '',
            lat       : 0,
            line1     : '',
            lon       : 0,
            name      : '',
            postalCode: '',
            state     : '',
            line2     : ''
        },
        note    : stop.note || '',
        sequence: stop.sequence || 1,
        type:
            stop.originType === ManifestsTypes.OriginType.MANIFEST
                ? ManifestStopTypes[stop.manifestStopType]
                : ManifestStopTypesEnum.PICKUP,
        fixedAppointment: stop
            ? stop.appointmentStartAtLocal === stop.appointmentEndAtLocal
            : false,
        referenceId: stop.referenceId || '',
        manifestId : manifestId || ''
    };
}

export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    appointmentEndAt: yup
        .string()
        .test('dates_test', 'End time must be after start time', function (value) {
            const {
                appointment_start_at,
                fixed_appointment
            } = this.parent;
            if (fixed_appointment || !appointment_start_at || !value) return true;
            return moment.utc(value).isSameOrAfter(moment.utc(appointment_start_at));
        })
        .defined('required field'),
    appointmentStartAt: yup.string().required('required field'),
    fixedAppointment  : yup.boolean().defined(),
    location          : yup.object().shape({
        address   : yup.string().required('address required field'),
        city      : yup.string().defined(),
        lat       : yup.number().defined(),
        line1     : yup.string().defined(),
        lon       : yup.number().defined(),
        name      : yup.string().defined(),
        postalCode: yup.string().defined(),
        state     : yup.string().required('state required field'),
        line2     : yup.string().defined()
    }),
    checkedInAt : yup.string().defined(),
    checkedOutAt: yup.string().defined(),
    note        : yup.string().defined(),
    referenceId : yup.string().defined(),
    sequence    : yup.number().min(1, 'minimum 1').required('required field'),
    type        : yup.string<ManifestStopTypesEnum>().required('required field'),
    manifestId  : yup.string().defined()
});
