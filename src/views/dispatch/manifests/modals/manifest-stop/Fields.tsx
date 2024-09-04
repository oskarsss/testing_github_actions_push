import DateInput from '@/@core/fields/inputs/DateInput';
import LocationInput from '@/@core/fields/inputs/LocationInput/LocationInput';
import { LocationInputChangeValue } from '@/@core/fields/inputs/LocationInput/utils/onChange';
import TextInput from '@/@core/fields/inputs/TextInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { ErrorOption, Path, SubmitHandler, UseFormReturn, useWatch } from 'react-hook-form';
import ControlledCheckboxInput from '@/@core/fields/checkbox/ControlledCheckbox';
import { Stack } from '@mui/material';
import ManifestStopTypeSelect from '@/@core/fields/select/ManifestStopTypeSelect';
import ManifestsModalsIcons from '@/views/dispatch/manifests/modals/icons';
import ManifestSelect from '@/@core/fields/select/manifests-select';
import { ManifestGetRequest } from '@proto/manifests';
import { ManifestStopAddRequest_Location } from '@proto/manifest_stops';
import { LoadStopTypesEnum } from '@/models/loads/load-stop';
import { ManifestStopTypesEnum } from '@/models/manifests/manifest-stop';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment-timezone';
import ManifestStopsIcons from './icons';

export type DefaultValues<T extends ManifestsTypes.OriginType> = {
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
    type: T extends ManifestsTypes.OriginType.LOAD ? LoadStopTypesEnum : ManifestStopTypesEnum;
};

type Props<T extends ManifestsTypes.OriginType> = PropsWithChildren<{
    methods: UseFormReturn<DefaultValues<T>>;
    submit: SubmitHandler<DefaultValues<T>>;
    stopId?: string;
    statusComponent?: React.ReactNode;
    autofocusInputName?: keyof DefaultValues<T>;
    showManifestSelect?: boolean;
    manifestSelectFilters?: Partial<ManifestGetRequest>;
    originType: T;
    commodityComponent?: React.ReactNode;
}>;

export default function Fields<T extends ManifestsTypes.OriginType>({
    methods,
    submit,
    children,
    stopId,
    statusComponent,
    autofocusInputName,
    showManifestSelect,
    manifestSelectFilters = {},
    originType,
    commodityComponent
}: Props<T>) {
    const {
        getValues,
        setValue,
        control,
        formState,
        watch
    } = methods;

    const errors = formState.errors as { [P in keyof DefaultValues<T>]?: ErrorOption };

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'appointmentStartAt') {
                if (value.appointmentStartAt && moment(value.appointmentStartAt).isValid()) {
                    const appointmentEndAt = moment
                        .utc(value.appointmentStartAt)
                        .add(2, 'hour')
                        .format('YYYY-MM-DD HH:mm:ss');
                    setValue('appointmentEndAt', appointmentEndAt);
                }
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [setValue, watch]);

    const onChangeLocation = ({
        location_name,
        ...value
    }: LocationInputChangeValue) => {
        methods.clearErrors('location.address');
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

    const locationError = useMemo(() => {
        const errorsArray = [
            formState.errors.location?.address,
            formState.errors.location?.city,
            formState.errors.location?.state,
            formState.errors.location?.postalCode,
            formState.errors.location?.lat,
            formState.errors.location?.lon,
            formState.errors.location?.line1,
            formState.errors.location?.line2
        ]
            .map((item) => item?.message)
            .filter((item) => !!item);
        return errorsArray.join(', ');
    }, [formState.errors.location]);

    const fixedAppointment = useWatch({ name: 'fixedAppointment', control });
    const sequence = useWatch({ name: 'sequence', control });

    return (
        <DialogComponents.Form
            onSubmit={methods.handleSubmit(submit, (error) => {
                console.debug('error', error);
            })}
            style={{
                display      : 'flex',
                flexDirection: 'column',
                overflow     : 'hidden',
                paddingRight : '20px'
            }}
        >
            <DialogComponents.Header
                title={`modals:loads.stops.titles.${originType}.${
                    stopId ? 'edit_stop' : 'add_stop'
                }`}
                translationOptions={{ sequence }}
                justifyContent="flex-start"
                sx={{ gap: '12px' }}
            >
                {statusComponent}
            </DialogComponents.Header>

            <PerfectScrollbar
                style={{
                    marginRight : '-20px',
                    paddingRight: '20px'
                }}
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false
                }}
            >
                <DialogComponents.Fields
                    rowSpacing={2}
                    columnSpacing={0}
                >
                    <DialogComponents.SectionTitle
                        startIcon={<ManifestStopsIcons.Details />}
                        title="modals:manifests.stop.titles.details"
                    />
                    <DialogComponents.Field xs={4}>
                        <TextInput
                            control={control}
                            errors={errors}
                            name="referenceId"
                            label="modals:loads.stops.labels.ref"
                            type="text"
                            width="100%"
                            placeholder="modals:loads.stops.placeholders.ref"
                        />
                    </DialogComponents.Field>
                    <DialogComponents.Field xs={8}>
                        <ManifestStopTypeSelect
                            control={control}
                            name={'type' as Path<DefaultValues<T>>}
                            originType={originType}
                        />
                    </DialogComponents.Field>
                    <DialogComponents.Field xs={12}>
                        <TextInput
                            multiline
                            control={control}
                            errors={errors}
                            name="note"
                            label="fields:note.label"
                            type="text"
                            width="100%"
                            autoFocus={autofocusInputName === 'note'}
                            placeholder="fields:note.placeholder"
                            inputProps={{
                                maxRows: 4
                            }}
                        />
                    </DialogComponents.Field>
                    <DialogComponents.SectionTitle
                        startIcon={<ManifestStopsIcons.Address />}
                        title="modals:manifests.stop.titles.address"
                        sx={{ mt: '12px' }}
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
                            label="modals:loads.stops.labels.location_name"
                            type="text"
                            width="100%"
                            autoFocus={autofocusInputName === 'location'}
                            placeholder="modals:loads.stops.placeholders.location_name"
                        />
                    </DialogComponents.Field>

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap="8px"
                        mt="12px"
                        width="100%"
                    >
                        <DialogComponents.SectionTitle
                            startIcon={<ManifestStopsIcons.Appointment />}
                            title="modals:manifests.stop.titles.appointment"
                        />
                        <Stack flexShrink={0}>
                            <ControlledCheckboxInput
                                control={control}
                                name="fixedAppointment"
                                label="modals:manifests.stop.fields.labels.fixed"
                            />
                        </Stack>
                    </Stack>

                    <DialogComponents.Field xs={fixedAppointment ? 12 : 6}>
                        <DateInput<DefaultValues<T>>
                            required
                            control={control}
                            errors={errors}
                            name="appointmentStartAt"
                            label="modals:manifests.stop.fields.labels.start"
                            width="100%"
                            AMPMTime={false}
                            showShortcuts
                        />
                    </DialogComponents.Field>

                    {!fixedAppointment && (
                        <DialogComponents.Field xs={6}>
                            <DateInput
                                control={control}
                                errors={errors}
                                name="appointmentEndAt"
                                label="modals:manifests.stop.fields.labels.end"
                                width="100%"
                                AMPMTime={false}
                                showShortcuts
                            />
                        </DialogComponents.Field>
                    )}
                    {stopId && (
                        <>
                            <DialogComponents.Field xs={6}>
                                <DateInput
                                    control={control}
                                    errors={errors}
                                    name="checkedInAt"
                                    label="modals:manifests.stop.fields.labels.checked_in"
                                    width="100%"
                                    AMPMTime={false}
                                    showShortcuts
                                />
                            </DialogComponents.Field>
                            <DialogComponents.Field xs={6}>
                                <DateInput
                                    control={control}
                                    errors={errors}
                                    name="checkedOutAt"
                                    label="modals:manifests.stop.fields.labels.checked_out"
                                    width="100%"
                                    AMPMTime={false}
                                    showShortcuts
                                />
                            </DialogComponents.Field>
                        </>
                    )}
                    {showManifestSelect && (
                        <>
                            <DialogComponents.SectionTitle
                                startIcon={<ManifestsModalsIcons.Manifest color="primary" />}
                                title="modals:manifests.sections.manifest"
                                sx={{ mt: '12px' }}
                            />
                            <DialogComponents.Field xs={12}>
                                <ManifestSelect
                                    manifestSelectFilters={manifestSelectFilters}
                                    label="core:selects.manifest"
                                    control={control}
                                    name="manifestId"
                                />
                            </DialogComponents.Field>
                        </>
                    )}
                    {commodityComponent && (
                        <DialogComponents.Field xs={12}>
                            {commodityComponent}
                        </DialogComponents.Field>
                    )}
                </DialogComponents.Fields>
            </PerfectScrollbar>
            {children}
        </DialogComponents.Form>
    );
}
