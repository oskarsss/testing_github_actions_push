import { memo, useEffect, useMemo } from 'react';
import moment from 'moment-timezone';
import { Grid, Stack } from '@mui/material';
import { ErrorOption, useController, useWatch } from 'react-hook-form';
import LocationInput from '@/@core/fields/inputs/LocationInput/LocationInput';
import TextInput from '@/@core/fields/inputs/TextInput';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import DateInput from '@/@core/fields/inputs/DateInput';
import { LocationInputChangeValue } from '@/@core/fields/inputs/LocationInput/utils/onChange';
import { applyTestId, TestIDs } from '@/configs/tests';
import DraftsTypes from '@/store/drafts/types';
import { useUpdateEffect } from 'usehooks-ts';
import NotesCustomError from '@/views/new-loads/views/Draft/draft-form/components/CharactersCount';
import { LOAD_STOP_TYPE_GRPC_ENUM } from '@/models/loads/load-mappings';
import { convertMomentToUnix } from '@/views/new-loads/utils/getTemplateTime';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import StopType from './StopType/StopType';
import IndicatorButton from './IndicatorButton';
import { useDraftFormContext } from '../../Draft';
import { STOP_TYPE_OPTIONS_MAP } from './stops-types-config';
import StopItemStyled from './StopItem.styled';

type Props = {
    sequence: number;
    index: number;
    stops_length: number;
    moveUp: (index: number) => void;
    moveDown: (index: number) => void;
    deleteStop: (index: number) => void;
    distanceToNextStop: number;
};

const StopItem = ({
    sequence,
    index,
    stops_length,
    deleteStop,
    moveDown,
    moveUp,
    distanceToNextStop
}: Props) => {
    const { t } = useAppTranslation();
    const {
        control,
        setValue,
        getValues,
        setError,
        clearErrors
    } = useDraftFormContext();

    const {
        formState: { errors }
    } = useController({ name: `stops.${index}`, control });

    const stopErrors = useMemo(() => {
        if (!errors.stops) return {};
        const myObject = errors?.stops[index];

        if (!myObject) return {};

        const stopErr: { [P in keyof DraftsTypes.Fields]?: ErrorOption } = {};

        const myObjectKeys = Object.keys(myObject);

        myObjectKeys.forEach((key) => {
            let stop_err_key: keyof DraftsTypes.Fields;
            if (key.includes('location')) {
                stop_err_key = `stops.${index}.locationIdAddress` as keyof DraftsTypes.Fields;
            } else {
                stop_err_key = `stops.${index}.${key}` as keyof DraftsTypes.Fields;
            }
            stopErr[stop_err_key] = myObject[key as keyof typeof myObject] as ErrorOption;
        });
        return stopErr;
    }, [errors.stops, index]);

    const stopLocationError =
        stopErrors[`stops.${index}.locationIdAddress` as keyof DraftsTypes.Fields]?.message;

    const type = useWatch({ name: `stops.${index}.type`, control, exact: true });
    const fixed_appointment = useWatch({
        name : `stops.${index}.fixedAppointment`,
        control,
        exact: true
    });
    const appointment_start_at = useWatch({
        exact: true,
        name : `stops.${index}.appointmentStartAt`,
        control
    });
    const appointment_end_at = useWatch({
        exact: true,
        name : `stops.${index}.appointmentEndAt`,
        control
    });

    const onChangeLocation = (inputValue: LocationInputChangeValue) => {
        const itemID: `stops.${typeof index}` = `stops.${index}`;
        clearErrors([
            `${itemID}.locationIdAddress`,
            `${itemID}.locationIdLat`,
            `${itemID}.locationIdLon`
        ]);

        const stopItem = getValues(itemID);

        setValue(itemID, {
            ...stopItem,
            ...{
                locationIdAddress   : inputValue.location_id_address,
                locationIdName      : inputValue.location_name,
                locationIdLat       : inputValue.location_id_lat,
                locationIdLon       : inputValue.location_id_lon,
                locationIdLine1     : inputValue.location_id_line1,
                locationIdCity      : inputValue.location_id_city,
                locationIdState     : inputValue.location_id_state,
                locationIdPostalCode: inputValue.location_id_postal_code
            }
        });
        setValue(`stops.${index}.locationIdName`, inputValue.location_name);
    };

    useUpdateEffect(() => {
        const appointment_start_at = getValues(`stops.${index}.appointmentStartAt`);
        const appointment_end_at = getValues(`stops.${index}.appointmentEndAt`);
        if (moment(appointment_start_at).isValid()) {
            if (!fixed_appointment) {
                if (
                    !appointment_end_at ||
                    moment.utc(appointment_start_at).isSame(moment.utc(appointment_end_at))
                ) {
                    const new_appointment_end_at = moment
                        .utc(appointment_start_at)
                        .add(2, 'hours')
                        .format('YYYY-MM-DD HH:mm:ss');
                    setValue(`stops.${index}.appointmentEndAt`, new_appointment_end_at);
                }
            } else {
                setValue(`stops.${index}.appointmentEndAt`, appointment_start_at);
            }
        }
    }, [fixed_appointment, index]);

    useUpdateEffect(() => {
        const appointment_start_at = getValues(`stops.${index}.appointmentStartAt`);
        if (moment(appointment_start_at).isValid()) {
            const appointment_end_at = getValues(`stops.${index}.appointmentEndAt`);
            if (appointment_end_at !== appointment_start_at) {
                const fixed_appointment = getValues(`stops.${index}.fixedAppointment`);
                const new_appointment_end_at = fixed_appointment
                    ? appointment_start_at
                    : moment
                        .utc(appointment_start_at)
                        .add(2, 'hours')
                        .format('YYYY-MM-DD HH:mm:ss');
                setValue(`stops.${index}.appointmentEndAt`, new_appointment_end_at);
            }
        }
    }, [appointment_start_at, index]);

    useEffect(() => {
        if (!fixed_appointment) {
            const start = convertMomentToUnix(appointment_start_at);
            const end = convertMomentToUnix(appointment_end_at);
            const diff = end - start;

            if (diff < 0) {
                setError(`stops.${index}.appointmentEndAt`, {
                    type   : 'manual',
                    message: t('new_loads:errors.appointment_end_at')
                });
            } else {
                clearErrors(`stops.${index}.appointmentEndAt`);
            }
        }
    }, [appointment_end_at, appointment_start_at, clearErrors, fixed_appointment, index, setError]);

    return (
        <StopItemStyled.Container
            {...applyTestId(TestIDs.pages.createLoad.fields.stopItemContainer)}
        >
            <StopItemStyled.StopIndicator>
                {distanceToNextStop > 0 && (
                    <StopItemStyled.Distance>
                        {Math.floor(distanceToNextStop)} mi
                    </StopItemStyled.Distance>
                )}
                {STOP_TYPE_OPTIONS_MAP[LOAD_STOP_TYPE_GRPC_ENUM[type]]?.indicator(sequence) || null}
            </StopItemStyled.StopIndicator>
            <Stack
                direction="column"
                width="100%"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                >
                    <StopType
                        key={index}
                        type={type}
                        name={`stops.${index}.type`}
                    />
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        <IndicatorButton
                            disabled={index === stops_length - 1}
                            onClick={() => moveDown(index)}
                            type="arrow_down"
                            title="new_loads:draft.form.tooltips.move_down"
                            testId={TestIDs.pages.createLoad.buttons.moveDown}
                        />
                        <IndicatorButton
                            disabled={index === 0}
                            onClick={() => moveUp(index)}
                            type="arrow_up"
                            title="new_loads:draft.form.tooltips.move_up"
                            testId={TestIDs.pages.createLoad.buttons.moveUp}
                        />
                        <IndicatorButton
                            disabled={false}
                            onClick={() => deleteStop(index)}
                            type="delete"
                            title="common:button.delete"
                            testId={TestIDs.pages.createLoad.buttons.deleteStop}
                        />
                    </Stack>
                </Stack>

                <Grid
                    container
                    spacing={4}
                    columns={18}
                    marginTop="8px"
                >
                    <Grid
                        item
                        xs={6}
                    >
                        <TextInput
                            key={index}
                            width="100%"
                            name={`stops.${index}.referenceId`}
                            label="new_loads:draft.form.fields.stop_reference_id.label"
                            testID={TestIDs.pages.createLoad.fields.stopRefID}
                            type="text"
                            control={control}
                            errors={stopErrors}
                            placeholder="new_loads:draft.form.fields.stop_reference_id.placeholder"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <LocationInput
                            required
                            key={index}
                            width="100%"
                            name={`stops.${index}.locationIdAddress`}
                            label="new_loads:draft.form.fields.location_address.label"
                            errors={stopErrors}
                            customError={stopLocationError}
                            control={control}
                            onChange={onChangeLocation}
                            testID={TestIDs.pages.createLoad.fields.stopLocation}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={18}
                    >
                        <TextInput
                            key={index}
                            width="100%"
                            name={`stops.${index}.locationIdName`}
                            label="fields:location_name.label"
                            type="text"
                            control={control}
                            errors={stopErrors}
                            placeholder="fields:location_name.placeholder"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={3}
                    >
                        <StopItemStyled.CheckboxContainer>
                            <StopItemStyled.Label>
                                {t('new_loads:draft.form.fields.fixed_appointment.label')}
                            </StopItemStyled.Label>
                            <CheckboxInput
                                key={index}
                                label=""
                                name={`stops.${index}.fixedAppointment`}
                                control={control}
                                errors={stopErrors}
                                testID={TestIDs.pages.createLoad.fields.stopFixedAppt}
                            />
                        </StopItemStyled.CheckboxContainer>
                    </Grid>

                    <Grid
                        item
                        xs={fixed_appointment ? 15 : 7.5}
                    >
                        <DateInput
                            key={index}
                            control={control}
                            errors={stopErrors}
                            name={`stops.${index}.appointmentStartAt`}
                            label="new_loads:draft.form.fields.appointment_start_at.label"
                            width="100%"
                            type="datetime"
                            AMPMTime={false}
                            testID={TestIDs.pages.createLoad.fields.stopStart}
                            showShortcuts
                        />
                    </Grid>

                    {!fixed_appointment && (
                        <Grid
                            item
                            xs={7.5}
                        >
                            <DateInput
                                key={index}
                                width="100%"
                                name={`stops.${index}.appointmentEndAt`}
                                label="new_loads:draft.form.fields.appointment_end_at.label"
                                control={control}
                                errors={stopErrors}
                                type="datetime"
                                AMPMTime={false}
                                testID={TestIDs.pages.createLoad.fields.stopEnd}
                                minDate={appointment_start_at}
                                showShortcuts
                            />
                        </Grid>
                    )}

                    <Grid
                        item
                        xs={18}
                    >
                        <TextInput
                            key={index}
                            width="100%"
                            name={`stops.${index}.note`}
                            label="fields:notes.label"
                            testID={TestIDs.pages.createLoad.fields.stopNotes}
                            control={control}
                            errors={stopErrors}
                            inputProps={{
                                multiline: true
                            }}
                            ErrorComponent={(
                                <NotesCustomError
                                    name={`stops.${index}.note`}
                                    control={control}
                                />
                            )}
                            placeholder="fields:notes.placeholder"
                        />
                    </Grid>
                </Grid>
            </Stack>
        </StopItemStyled.Container>
    );
};

export default memo(StopItem);
