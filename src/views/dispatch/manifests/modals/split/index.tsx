import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ManifestStopsIcons from '@/views/dispatch/manifests/modals/manifest-stop/icons';
import LocationInput from '@/@core/fields/inputs/LocationInput/LocationInput';
import TextInput from '@/@core/fields/inputs/TextInput';
import { LocationInputChangeValue } from '@/@core/fields/inputs/LocationInput/utils/onChange';
import { Stack } from '@mui/material';
import ControlledCheckboxInput from '@/@core/fields/checkbox/ControlledCheckbox';
import DateInput from '@/@core/fields/inputs/DateInput';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { useEffect, useMemo } from 'react';
import createMap from '@/utils/create-map';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { ManifestModel_StopID } from '@proto/models/model_manifest';
import navigateToPage from '@/utils/navigateToPage';
import moment from 'moment-timezone';
import { getPrepareStops } from '@/@grpcServices/services/manifests-service/utils';
import { selectManifestById } from '@/store/dispatch/manifests/selectors';
import { useAppSelector } from '@/store/hooks';
import SplitConfig, { DefaultValues } from './split-config';

type Props = {
    manifestId: string;
    onSuccessSplit?: (manifestId: string) => void;
};

export const useSplitManifestsDialog = hookFabric(SplitManifests, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="540px"
        {...props}
    />
));

export default function SplitManifests({
    manifestId,
    onSuccessSplit
}: Props) {
    const { t } = useAppTranslation();
    const dialog = useSplitManifestsDialog(true);
    const manifest = useAppSelector(selectManifestById(manifestId));
    const {
        preparedStops,
        stopsMap
    } = useMemo(() => {
        const preparedStops = getPrepareStops(manifest?.stops || []);
        const stopsMap = createMap(preparedStops, 'stopId');
        return {
            preparedStops,
            stopsMap
        };
    }, [manifest]);

    const [trigger, { isLoading }] = ManifestsGrpcService.useSplitManifestMutation();

    const {
        control,
        handleSubmit,
        getValues,
        watch,
        clearErrors,
        setValue,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: {
            stopId  : '',
            location: {
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
            dropOff: {
                appointmentEndAt  : '',
                appointmentStartAt: '',
                fixedAppointment  : false
            },
            pickUp: {
                appointmentEndAt  : '',
                appointmentStartAt: '',
                fixedAppointment  : false
            }
        },
        resolver: yupResolver(SplitConfig.schema)
    });

    const stopId = watch('stopId');
    const stopTime = useMemo(() => {
        const stop = stopsMap[stopId];
        if (!stop) return '';
        return stop.appointmentEndAtLocal || stop.appointmentStartAtLocal;
    }, [stopId, stopsMap]);

    useEffect(() => {
        if (stopTime) {
            const getTime = (addHours: number, addMinutes: number) =>
                moment(stopTime)
                    .add(addHours, 'hour')
                    .add(addMinutes, 'minutes')
                    .format('YYYY-MM-DD HH:mm:ss');

            setValue('dropOff.appointmentStartAt', getTime(0, 0));
            setValue('dropOff.appointmentEndAt', getTime(0, 30));

            setValue('pickUp.appointmentStartAt', getTime(1, 0));
            setValue('pickUp.appointmentEndAt', getTime(1, 30));
        }
    }, [setValue, stopTime]);

    const onChangeLocation = ({
        location_name,
        ...value
    }: LocationInputChangeValue) => {
        clearErrors('location.address');
        const state_address = getValues('location.address');
        const state_state = getValues('location.state');
        const state_line1 = getValues('location.line1');
        const state_postal_code = getValues('location.postalCode');
        const state_postal_city = getValues('location.city');
        if (location_name) {
            if (!state_address) {
                setValue('location.name', location_name);
            } else if (
                state_state !== value.location_id_state ||
                state_line1 !== value.location_id_line1 ||
                state_postal_code !== value.location_id_postal_code ||
                state_postal_city !== value.location_id_city
            ) {
                setValue('location.name', location_name);
            }
        }
        setValue('location.address', value.location_id_address);
        setValue('location.city', value.location_id_city);
        setValue('location.state', value.location_id_state);
        setValue('location.postalCode', value.location_id_postal_code);
        setValue('location.lat', value.location_id_lat);
        setValue('location.lon', value.location_id_lon);
        setValue('location.line1', value.location_id_line1);
    };

    const fixedDropOffAppointment = useWatch({ name: 'dropOff.fixedAppointment', control });
    const fixedPickUpAppointment = useWatch({ name: 'pickUp.fixedAppointment', control });

    const submit = async (body: DefaultValues) => {
        const lastStopId: ManifestModel_StopID = {
            loadId        : stopsMap[body.stopId].loadId,
            loadStopId    : stopsMap[body.stopId].stopId,
            manifestStopId: body.stopId
        };
        const res = await trigger({
            dropoffAppointmentStartAt: body.dropOff.appointmentStartAt,
            dropoffAppointmentEndAt  : body.dropOff.appointmentEndAt,
            pickupAppointmentStartAt : body.pickUp.appointmentStartAt,
            pickupAppointmentEndAt   : body.pickUp.appointmentEndAt,
            manifestId,
            dropoffLocation          : {
                address   : body.location.address,
                city      : body.location.city,
                lat       : body.location.lat,
                line1     : body.location.line1,
                lon       : body.location.lon,
                name      : body.location.name,
                postalCode: body.location.postalCode,
                state     : body.location.state
            },
            lastStopId
        }).unwrap();
        const resManifestId = res.manifest?.manifestId || '';
        if (onSuccessSplit) {
            onSuccessSplit(resManifestId);
        } else {
            navigateToPage(`/dispatch/manifests/${resManifestId}`);
        }

        dialog.close();
    };

    const locationError = useMemo(() => {
        const errorsArray = [
            errors.location?.address,
            errors.location?.city,
            errors.location?.state,
            errors.location?.postalCode,
            errors.location?.lat,
            errors.location?.lon,
            errors.location?.line1,
            errors.location?.line2
        ]
            .map((item) => item?.message)
            .filter((item) => !!item);
        return errorsArray.join(', ');
    }, [errors.location]);

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="modals:manifests.split.header.title" />

            <DialogComponents.Fields
                columnSpacing={0}
                sx={{
                    '& .MuiGrid-root': {
                        paddingTop: '12px'
                    }
                }}
            >
                <DialogComponents.SectionTitle
                    startIcon={<ManifestStopsIcons.Details />}
                    title="modals:manifests.split.sections.last_stop"
                    sx={{
                        paddingTop: '24px !important'
                    }}
                />

                <DialogComponents.Field xs={12}>
                    <SelectInput
                        control={control}
                        errors={errors}
                        label="modals:manifests.split.fields.stop.label"
                        name="stopId"
                        width="100%"
                        options={SplitConfig.getStopsOptions(t, preparedStops)}
                    />
                </DialogComponents.Field>

                <DialogComponents.SectionTitle
                    startIcon={<ManifestStopsIcons.Address />}
                    title="modals:manifests.split.sections.address"
                    sx={{
                        paddingTop: '24px !important'
                    }}
                />
                <DialogComponents.Field xs={6}>
                    <LocationInput
                        required
                        width="100%"
                        name="location.address"
                        label="fields:address.label"
                        control={control}
                        onChange={onChangeLocation}
                        errors={errors}
                        customError={locationError}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <TextInput
                        control={control}
                        errors={errors}
                        name="location.name"
                        label="fields:location_name.label"
                        type="text"
                        width="100%"
                        placeholder="fields:location_name.placeholder"
                    />
                </DialogComponents.Field>

                <Stack
                    direction="row"
                    alignItems="end"
                    justifyContent="space-between"
                    gap="8px"
                    mt="12px"
                    width="100%"
                >
                    <DialogComponents.SectionTitle
                        startIcon={<ManifestStopsIcons.Appointment />}
                        title="modals:manifests.split.sections.drop_off_appointment"
                    />
                    <Stack flexShrink={0}>
                        <ControlledCheckboxInput
                            control={control}
                            name="dropOff.fixedAppointment"
                            label="fields:fixed.label"
                        />
                    </Stack>
                </Stack>

                <DialogComponents.Field xs={fixedDropOffAppointment ? 12 : 6}>
                    <DateInput
                        required
                        control={control}
                        name="dropOff.appointmentStartAt"
                        label="fields:start.label"
                        width="100%"
                        AMPMTime={false}
                    />
                </DialogComponents.Field>

                {!fixedDropOffAppointment && (
                    <DialogComponents.Field xs={6}>
                        <DateInput
                            control={control}
                            name="dropOff.appointmentEndAt"
                            label="fields:end.label"
                            width="100%"
                            AMPMTime={false}
                        />
                    </DialogComponents.Field>
                )}

                <Stack
                    direction="row"
                    alignItems="end"
                    justifyContent="space-between"
                    gap="8px"
                    mt="12px"
                    width="100%"
                >
                    <DialogComponents.SectionTitle
                        startIcon={<ManifestStopsIcons.Appointment />}
                        title="modals:manifests.split.sections.pick_up_appointment"
                    />
                    <Stack flexShrink={0}>
                        <ControlledCheckboxInput
                            control={control}
                            name="pickUp.fixedAppointment"
                            label="fields:fixed.label"
                        />
                    </Stack>
                </Stack>

                <DialogComponents.Field xs={fixedPickUpAppointment ? 12 : 6}>
                    <DateInput
                        required
                        control={control}
                        name="pickUp.appointmentStartAt"
                        label="fields:start.label"
                        width="100%"
                        AMPMTime={false}
                    />
                </DialogComponents.Field>

                {!fixedPickUpAppointment && (
                    <DialogComponents.Field xs={6}>
                        <DateInput
                            control={control}
                            name="pickUp.appointmentEndAt"
                            label="fields:end.label"
                            width="100%"
                            AMPMTime={false}
                        />
                    </DialogComponents.Field>
                )}
            </DialogComponents.Fields>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    disabled={!isDirty}
                    text="common:button.confirm"
                    loading={isLoading}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
