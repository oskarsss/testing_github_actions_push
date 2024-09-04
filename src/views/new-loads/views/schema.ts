import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import moment from 'moment-timezone';
import DraftsTypes from '@/store/drafts/types';
import { LoadModel_Stop_Type } from '@proto/models/model_load';

export const invoice_item_schema: ObjectSchema<DraftsTypes.InvoiceItem> = yup
    .object<DraftsTypes.InvoiceItem>()
    .shape({
        invoiceItemId: yup.string().defined(),

        // isDefault      : yup.boolean().defined(),
        categoryId   : yup.string().required('This field is required'),
        amountPerUnit: yup.number().min(0).required('This field is required'),
        units        : yup
            .number()
            .min(0)
            .test('is-decimal', 'No decimal', (value) => !`${value}`.match(/^\d*\.{1}\d*$/))
            .required('This field is required')
    });

// const autocompletePredictionSchema = yup.object<Drafts.AutocompletePrediction>().shape({
//     description: yup.string().required()

//     // matched_substrings   : yup.string().required(), // Define validation as needed
//     // place_id             : yup.string().required(),
//     // structured_formatting: yup.string().required(), // Define validation as needed
//     // ... other validations ...
// });

export const stopSchema = (): ObjectSchema<DraftsTypes.Stop> =>
    yup.object<DraftsTypes.Stop>().shape({
        stopId           : yup.string().defined(),
        type             : yup.number<LoadModel_Stop_Type>().defined(),
        referenceId      : yup.string().defined(),
        note             : yup.string().max(1024, 'Note must be less than 1024 characters').defined(),
        locationIdLine1  : yup.string().defined(),
        locationIdAddress: yup.string().defined('Address is not valid'),
        locationIdCity   : yup.string().defined(),
        locationIdState  : yup.string().defined(),

        // locationName        : yup.string().defined(),
        locationIdPostalCode: yup.string().defined(),
        locationIdLon       : yup.number().notOneOf([0], 'Address is not valid').defined(),
        locationIdLat       : yup.number().notOneOf([0], 'Address is not valid').defined(),
        contactName         : yup.string().defined(),
        contactPhone        : yup.string().defined(),
        locationId          : yup.string().defined(),
        locationIdLine2     : yup.string().defined(),
        locationIdName      : yup.string().defined(),

        // location_id            : autocompletePredictionSchema.defined(),
        fixedAppointment  : yup.boolean().required('This field is required'),
        appointmentStartAt: yup
            .string()

            // .test(
            //     'dates_test',
            //     'Start time should be later than now',
            //     (value) => {
            //         const start_at = moment(value);
            //         return start_at.isAfter(current_time);
            //     }
            // )
            .required('This field is required'),
        appointmentEndAt: yup
            .string()
            .defined()
            .when('fixed_appointment', {
                is  : false,
                then: () =>
                    yup
                        .string()
                        .test('dates_test', 'End time must be after start time', function (value) {
                            const { appointment_start_at } = this.parent;
                            const start_at = moment.utc(appointment_start_at);
                            const end_at = moment.utc(value);
                            return end_at.isSameOrAfter(start_at);
                        })
                        .required('This field is required')
            }),
        sequence          : yup.number().defined(),
        distanceToNextStop: yup.number().defined()
    });

// export const driver_pay_item_schema: ObjectSchema<Drafts.DriverPayItemTypes> = yup
//     .object<Drafts.DriverPayItemTypes>()
//     .shape({
//         total_amount   : yup.string().defined(),
//         id             : yup.string().defined(),
//         category_id    : yup.string().required('This field is required'),
//         amount_per_unit: yup.number().min(0).required('This field is required'),
//         units          : yup.number().min(0).required('This field is required'),
//         isCustom       : yup.boolean().defined()
//     });

export const load_schema = (loadOwner: 'broker' | 'customer'): ObjectSchema<DraftsTypes.Fields> =>
    yup.object().shape({
        temperature    : yup.number().defined(),
        rateConFileName: yup.string().defined(),
        rateConUrl     : yup.string().defined(),
        typeId         : yup.string().required('This field is required'),
        referenceId    : yup.string().required('Load reference is required'),
        brokerId:
            loadOwner === 'broker'
                ? yup.string().defined().required('This field is required')
                : yup.string().defined(),
        customerId:
            loadOwner === 'customer'
                ? yup.string().defined().required('This field is required')
                : yup.string().defined(),

        loadedMiles: yup
            .number()
            .moreThan(0, 'Must be greater than 0')
            .required('Loaded miles are required'),

        brokerContactEmail     : yup.string().defined(),
        emptyMiles             : yup.number().defined(),
        equipmentTypeId        : yup.string().required('This field is required'),
        weight                 : yup.number().defined(),
        commodity              : yup.string().defined(),
        note                   : yup.string().max(1024, 'Note must be less than 1024 characters').defined(),
        dispatcherId           : yup.string().defined(),
        settlementRevenueTypeId: yup.string().defined(),

        invoiceItems: yup.array().of(invoice_item_schema).defined(),
        stops       : yup.array().of(stopSchema()).defined(),
        invoiceNote : yup.string().defined()
    });

export const contact_details_schema: ObjectSchema<DraftsTypes.BrokerContactProps> = yup
    .object()
    .shape({
        phone_number: yup
            .string()
            .min(8, 'Phone number minimum 8 characters')
            .max(15, 'Phone number maximum 15 characters')
            .defined(),
        email: yup.string().max(40, 'Email maximum 40 characters').email()
            .defined()
    });
