import * as yup from 'yup';
import { ManifestModel_ManifestStop_Type } from '@proto/models/model_manifest';
import moment from 'moment-timezone';
import { CurrencyCode } from '@proto/models/currency_code';
import { useFormContext } from 'react-hook-form';
import { uuidv4 } from '@/utils/uuidv4';
import { ManifestCreateRequest_Stop_Location } from '@proto/manifests';
import React, { createContext, useContext } from 'react';

type StopType = {
    stopId: string;
    location: ManifestCreateRequest_Stop_Location;
    appointmentStartAt: string;
    appointmentEndAt?: string;
    note: string;
    type: ManifestModel_ManifestStop_Type;
    referenceId: string;
    fixedAppointment: boolean;
};
export type FormValues = {
    grossAmount: string;
    grossCurrency: CurrencyCode;
    stops: StopType[];
    title: string;
};

const makeAppointment = (addHours = 0) =>
    moment().add(addHours, 'hours').format('YYYY-MM-DD HH:mm:ss');

export const defaultStop = () => ({
    stopId  : uuidv4(),
    location: {
        address   : '',
        city      : '',
        state     : '',
        lat       : 0,
        lon       : 0,
        name      : '',
        postalCode: '',
        line1     : ''
    },
    appointmentStartAt: makeAppointment(2),
    appointmentEndAt  : makeAppointment(2),
    note              : '',
    type              : ManifestModel_ManifestStop_Type.PICKUP_TRAILER,
    referenceId       : '',
    fixedAppointment  : true
});
export const DefaultStops: StopType[] = [
    {
        stopId  : uuidv4(),
        location: {
            address   : '',
            city      : '',
            state     : '',
            lat       : 0,
            lon       : 0,
            name      : '',
            postalCode: '',
            line1     : ''
        },
        appointmentStartAt: makeAppointment(),
        appointmentEndAt  : makeAppointment(),
        note              : '',
        type              : ManifestModel_ManifestStop_Type.PICKUP_TRAILER,
        referenceId       : '',
        fixedAppointment  : true
    },
    {
        stopId  : uuidv4(),
        location: {
            address   : '',
            city      : '',
            state     : '',
            lat       : 0,
            lon       : 0,
            name      : '',
            postalCode: '',
            line1     : ''
        },
        appointmentStartAt: makeAppointment(2),
        appointmentEndAt  : makeAppointment(2),
        note              : '',
        type              : ManifestModel_ManifestStop_Type.DROPOFF_TRAILER,
        referenceId       : '',
        fixedAppointment  : true
    }
];
export const useCreateBlankManifestForm = () => useFormContext<FormValues>();
export const stopSchema = (): yup.ObjectSchema<StopType> =>
    yup.object<StopType>().shape({
        stopId     : yup.string().defined(),
        type       : yup.number<ManifestModel_ManifestStop_Type>().defined(),
        referenceId: yup.string().defined(),
        note       : yup.string().max(1024, 'Note must be less than 1024 characters').defined(),
        location   : yup
            .object()
            .shape({
                address   : yup.string().required('This field is required'),
                city      : yup.string().defined(),
                state     : yup.string().required('This field is required'),
                lat       : yup.number().required('This field is required'),
                lon       : yup.number().required('This field is required'),
                name      : yup.string().required('This field is required'),
                postalCode: yup.string().defined(),
                line1     : yup.string().defined()
            })
            .defined(),

        // location_id            : autocompletePredictionSchema.defined(),
        fixedAppointment  : yup.boolean().required('This field is required'),
        appointmentStartAt: yup.string().required('This field is required'),
        appointmentEndAt  : yup.string().defined()

        // sequence: yup.number().defined(),
        // distanceToNextStop: yup.number().defined()
    });
export const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
    title        : yup.string().defined(),
    grossAmount  : yup.string().required(),
    grossCurrency: yup.number<CurrencyCode.USD>().required(),
    stops        : yup.array().min(2).of(stopSchema())
        .defined()
});

type StopContextType = {
    selectedStopId: string | null;
    setSelectedStopId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ContextSelectedStop = createContext<StopContextType>({
    selectedStopId   : null,
    setSelectedStopId: () => {}
});

export const useContextSelectedStop = () => useContext(ContextSelectedStop);
