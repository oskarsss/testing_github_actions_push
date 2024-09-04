/* eslint-disable max-len */
import { memo, useEffect, useMemo, MouseEvent } from 'react';
import moment from 'moment-timezone';
import { Grid, IconButton, Stack } from '@mui/material';
import { ErrorOption, useController, useWatch } from 'react-hook-form';
import LocationInput from '@/@core/fields/inputs/LocationInput/LocationInput';
import TextInput from '@/@core/fields/inputs/TextInput';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import DateInput from '@/@core/fields/inputs/DateInput';
import { LocationInputChangeValue } from '@/@core/fields/inputs/LocationInput/utils/onChange';
import { applyTestId, TestIDs } from '@/configs/tests';
import DraftsTypes from '@/store/drafts/types';
import { useUpdateEffect } from 'usehooks-ts';
import { convertMomentToUnix } from '@/views/new-loads/utils/getTemplateTime';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import IndicatorButton from '@/views/new-loads/views/Draft/draft-form/stops-fields/IndicatorButton';
import StopItemStyled from '@/views/new-loads/views/Draft/draft-form/stops-fields/StopItem.styled';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import {
    MANIFEST_STOP_TYPE_COLORS,
    MANIFEST_STOP_TYPE_ICONS
} from '@/@core/theme/entities/manifests/stop-type';
import { ManifestStopTypes } from '@/models/manifests/manifest-stop';
import { ManifestModel_ManifestStop_Type } from '@proto/models/model_manifest';
import {
    useContextSelectedStop,
    useCreateBlankManifestForm
} from '@/views/dispatch/manifests/modals/create-blank-manifest/helpers';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import { useChangeStopTypeMenu } from '../../../menus/ChangeStopTypeMenu';

type Props = {
    sequence: number;
    index: number;
    stops_length: number;
    moveUp: (index: number) => void;
    moveDown: (index: number) => void;
    deleteStop: (index: number) => void;
    stopId: string;
};

const CreateBlankManifestStopsItem = ({
    sequence,
    index,
    stops_length,
    deleteStop,
    moveDown,
    moveUp,
    stopId
}: Props) => {
    const { t } = useAppTranslation();
    const {
        control,
        setValue,
        getValues,
        setError,
        clearErrors
    } = useCreateBlankManifestForm();

    const {
        formState: { errors }
    } = useController({ name: `stops.${index}`, control });

    const {
        field: {
            value: type,
            onChange: onChangeType
        }
    } = useController({
        name: `stops.${index}.type`
    });

    const stopErrors = useMemo(() => {
        if (!errors.stops) return {};
        const myObject = errors?.stops[index];

        if (!myObject) return {};

        const stopErr: { [P in keyof DraftsTypes.Fields]?: ErrorOption } = {};

        const myObjectKeys = Object.keys(myObject);

        myObjectKeys.forEach((key) => {
            const stop_err_key = `stops.${index}.${key}` as keyof DraftsTypes.Fields;
            stopErr[stop_err_key] = myObject[key as keyof typeof myObject] as ErrorOption;
        });
        return stopErr;
    }, [errors.stops, index]);

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

    const changeStopTypeMenu = useChangeStopTypeMenu();

    const openChangeStopTypeMenu = (event: MouseEvent<HTMLButtonElement>) => {
        changeStopTypeMenu.open({
            onChange: onChangeType
        })(event);
    };

    const onChangeLocation = (inputValue: LocationInputChangeValue) => {
        const itemID: `stops.${typeof index}` = `stops.${index}`;
        const stopItem = getValues(itemID);

        setValue(itemID, {
            ...stopItem,
            location: {
                address   : inputValue.location_id_address,
                city      : inputValue.location_id_city,
                lat       : inputValue.location_id_lat,
                line1     : inputValue.location_id_line1,
                lon       : inputValue.location_id_lon,
                name      : inputValue.location_name,
                postalCode: inputValue.location_id_postal_code,
                state     : inputValue.location_id_state
            }
        });
        setValue(`stops.${index}.location.name`, inputValue.location_name);
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
                // const fixed_appointment = getValues(`stops.${index}.fixedAppointment`);
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
            const end = convertMomentToUnix(appointment_end_at || '');
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

    const localeStopType = ManifestStopTypes[type as ManifestModel_ManifestStop_Type];
    const stopTypeColor = MANIFEST_STOP_TYPE_COLORS[localeStopType];

    const {
        selectedStopId,
        setSelectedStopId
    } = useContextSelectedStop();

    const toggleSelectedStopId = () =>
        setSelectedStopId((prev) => (prev === stopId ? null : stopId));

    return (
        <StopItemStyled.Container>
            <Stack
                direction="column"
                width="100%"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
                        <Badge
                            variant="outlined"
                            size="medium"
                            text={sequence}
                            onClick={toggleSelectedStopId}
                            sx={{
                                cursor: 'pointer',
                                ...(selectedStopId === stopId && {
                                    borderColor: ({ palette }) =>
                                        palette.utility.icon.ocean.primary,
                                    boxShadow: (theme) =>
                                        `0px 0px 20px 0px ${theme.palette.utility.icon.ocean.secondary}`
                                })
                            }}
                            style={{ minWidth: '26px' }}
                        />
                        <Badge
                            variant="filled"
                            size="medium"
                            text={t(`state_info:stop.type.${localeStopType}`)}
                            icon={MANIFEST_STOP_TYPE_ICONS[localeStopType]}
                            backgroundColor={(theme) =>
                                theme.palette.utility.foreground[stopTypeColor].secondary}
                            iconColor={(theme) =>
                                theme.palette.utility.foreground[stopTypeColor].primary}
                            textColor={(theme) => theme.palette.utility.text[stopTypeColor]}
                        />
                        <IconButton
                            aria-label="Change type"
                            style={{ marginLeft: 8 }}
                            onClick={openChangeStopTypeMenu}
                            {...applyTestId(TestIDs.pages.createLoad.buttons.changeStopType)}
                        >
                            <SwapHorizOutlinedIcon />
                        </IconButton>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
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
                            name={`stops.${index}.location.address`}
                            label="new_loads:draft.form.fields.location_address.label"
                            errors={stopErrors}
                            control={control}
                            onChange={onChangeLocation}
                            testID={TestIDs.pages.createLoad.fields.stopLocation}
                            onFocus={() => setSelectedStopId(stopId)}
                            onBlur={() => {
                                setTimeout(() => {
                                    setSelectedStopId((prev) => (prev === stopId ? null : prev));
                                }, 200);
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={18}
                    >
                        <TextInput
                            key={index}
                            width="100%"
                            name={`stops.${index}.location.name`}
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
                            required
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
                            placeholder="fields:notes.placeholder"

                            // ErrorComponent={(
                            //     <NotesCustomError
                            //         name={`stops.${index}.note`}
                            //         control={control}
                            //     />
                            // )}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </StopItemStyled.Container>
    );
};

export default memo(CreateBlankManifestStopsItem);
