import ManifestsTypes from '@/store/dispatch/manifests/types';
import { OptionsType } from '@/@core/fields/inputs/SelectInput';
import { ManifestStopTypes } from '@/models/manifests/manifest-stop';
import OptionValue from '@/views/dispatch/manifests/modals/split/OptionValue';
import moment from 'moment-timezone';
import { ManifestStopAddRequest_Location } from '@proto/manifest_stops';
import * as yup from 'yup';
import { TFunction } from '@/@types/next-intl';
import { AppPalette } from '@/@core/theme/palette';
import { IChipColors } from '@/@core/theme/chip';
import { LOAD_STOP_TYPE_COLORS, LOAD_STOP_TYPE_ICONS } from '@/@core/theme/entities/load/stop_type';
import {
    MANIFEST_STOP_TYPE_COLORS,
    MANIFEST_STOP_TYPE_ICONS
} from '@/@core/theme/entities/manifests/stop-type';
import { LoadStopTypes } from '@/models/loads/load-stop';

export type DefaultValues = {
    stopId: string;
    location: ManifestStopAddRequest_Location;
    dropOff: {
        appointmentEndAt: string;
        appointmentStartAt: string;
        fixedAppointment: boolean;
    };
    pickUp: {
        appointmentEndAt: string;
        appointmentStartAt: string;
        fixedAppointment: boolean;
    };
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    stopId  : yup.string().required('common:validation.required'),
    location: yup.object().shape({
        address   : yup.string().required('common:validation.required'),
        city      : yup.string().required('common:validation.required'),
        lat       : yup.number().defined(),
        line1     : yup.string().defined(),
        lon       : yup.number().defined(),
        name      : yup.string().defined(),
        postalCode: yup.string().defined(),
        state     : yup.string().required('common:validation.required'),
        line2     : yup.string().defined()
    }),
    dropOff: yup.object().shape({
        appointmentEndAt: yup
            .string()
            .test('dates_test', 'End time must be after start time', (value, context) => {
                const {
                    appointmentStartAt,
                    fixedAppointment
                } = context.parent;
                if (fixedAppointment || !appointmentStartAt || !value) return true;
                return moment.utc(value).isSameOrAfter(moment.utc(appointmentStartAt));
            })
            .defined('common:validation.required'),
        appointmentStartAt: yup.string().required('common:validation.required'),
        fixedAppointment  : yup.boolean().defined()
    }),
    pickUp: yup.object().shape({
        appointmentEndAt: yup
            .string()
            .test('dates_test', 'End time must be after start time', (value, context) => {
                const {
                    appointmentStartAt,
                    fixedAppointment
                } = context.parent;
                if (fixedAppointment || !appointmentStartAt || !value) return true;
                return moment.utc(value).isSameOrAfter(moment.utc(appointmentStartAt));
            })
            .defined('required field'),
        appointmentStartAt: yup.string().required('required field'),
        fixedAppointment  : yup.boolean().defined()
    })
});

function formatDate(inputDate: string, t: TFunction, timezone?: string) {
    const date = new Date(inputDate);

    const monthShortNames = [
        t('common:time.month.short_name.jan'),
        t('common:time.month.short_name.feb'),
        t('common:time.month.short_name.mar'),
        t('common:time.month.short_name.apr'),
        t('common:time.month.short_name.may'),
        t('common:time.month.short_name.jun'),
        t('common:time.month.short_name.jul'),
        t('common:time.month.short_name.aug'),
        t('common:time.month.short_name.sep'),
        t('common:time.month.short_name.oct'),
        t('common:time.month.short_name.nov'),
        t('common:time.month.short_name.dec')
    ];

    const monthIndex = date.getMonth();
    const monthName = monthShortNames[monthIndex];

    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${monthName} ${day} ${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')} ${timezone || ''}`;
}

const getStopsOptions = (t: TFunction, stops?: ManifestsTypes.AnyPreparedStop[]): OptionsType[] =>
    stops
        ? stops.map((stop) => {
            const transformStop = {
                id: stop.stopId,
                icon:
                      stop.originType === ManifestsTypes.OriginType.LOAD
                          ? LOAD_STOP_TYPE_ICONS[LoadStopTypes[stop.loadStopType]]
                          : MANIFEST_STOP_TYPE_ICONS[ManifestStopTypes[stop.manifestStopType]],
                city: stop.location?.city || '',
                date: formatDate(
                    stop.appointmentEndAtLocal || stop.appointmentStartAtLocal,
                    t,
                    stop.location?.timezone
                ),
                type:
                      stop.originType === ManifestsTypes.OriginType.LOAD
                          ? t(`state_info:stop.type.${LoadStopTypes[stop.loadStopType]}`)
                          : t(`state_info:stop.type.${ManifestStopTypes[stop.manifestStopType]}`)
            };

            const getColor = (palette: AppPalette) => {
                let color: IChipColors = 'warning';

                if (stop.originType === ManifestsTypes.OriginType.LOAD) {
                    color = LOAD_STOP_TYPE_COLORS[LoadStopTypes[stop.loadStopType]];
                }
                if (stop.originType === ManifestsTypes.OriginType.MANIFEST) {
                    color = MANIFEST_STOP_TYPE_COLORS[ManifestStopTypes[stop.manifestStopType]];
                }

                return {
                    text: `${palette.utility.text[color]} !important`,
                    icon: `${palette.utility.foreground[color].primary} !important`
                };
            };

            return {
                value: transformStop.id,
                label: () => (
                    <OptionValue
                        icon={transformStop.icon}
                        type={transformStop.type}
                        city={transformStop.city}
                        date={transformStop.date}
                        getColor={getColor}
                    />
                )
            };
        })
        : [
            {
                value: '0',
                label: ''
            }
        ];

const SplitConfig = {
    schema,
    getStopsOptions
};

export default SplitConfig;
