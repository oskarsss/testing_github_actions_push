import React, { useCallback, useEffect, useMemo } from 'react';
import { useController, useWatch } from 'react-hook-form';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import getTemplateTime, { convertMomentToUnix } from '@/views/new-loads/utils/getTemplateTime';
import { generateStopItem } from '@/views/new-loads/utils/default-value-generators';
import { applyTestId, TestIDs } from '@/configs/tests';
import moment from 'moment-timezone';
import { DraftSelectedDraftIdSelector } from '@/store/drafts/selectors';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { StepButton, StepContainer, StepTitle } from '../../styled';
import StopsOverview from './StopsOverview';
import Step3Icon from '../../../../icons/Step3Icon';
import StopItem from './StopItem';
import NoItems from '../components/NoItems';
import { useDraftFormContext } from '../../Draft';

const StopsFields = () => {
    const selectedDraftId = useAppSelector(DraftSelectedDraftIdSelector);
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const {
        control,
        getValues,
        setError,
        clearErrors
    } = useDraftFormContext();

    const stops = useWatch({ name: 'stops', control });

    const calculateTimeBetweenStops = () => {
        const first_stop = stops[0];
        const last_stop = stops[stops.length - 1];
        const last_stop_fixed_appointment = last_stop.fixedAppointment;
        const first_appointment = first_stop.appointmentEndAt;
        const last_appointment = last_stop_fixed_appointment
            ? last_stop.appointmentStartAt
            : last_stop.appointmentEndAt;

        if (first_appointment && last_appointment) {
            const first_stop_time = convertMomentToUnix(first_appointment);
            const last_stop_time = convertMomentToUnix(last_appointment);
            const diff = last_stop_time - first_stop_time;
            if (diff < 0) {
                setError(
                    `stops.${stops.length - 1}.${
                        last_stop_fixed_appointment ? 'appointmentStartAt' : 'appointmentEndAt'
                    }`,
                    {
                        type   : 'manual',
                        message: t('new_loads:errors.last_stop_before_first')
                    }
                );
            } else {
                clearErrors(
                    `stops.${stops.length - 1}.${
                        last_stop_fixed_appointment ? 'appointmentStartAt' : 'appointmentEndAt'
                    }`
                );
                const duration = moment.duration(diff, 'seconds');
                const months = duration.months();
                if (months >= 2) {
                    setError(
                        `stops.${stops.length - 1}.${
                            last_stop_fixed_appointment ? 'appointmentStartAt' : 'appointmentEndAt'
                        }`,
                        {
                            type   : 'manual',
                            message: t('new_loads:errors.last_stop_mere_two_months_first')
                        }
                    );
                }
            }
        }
    };

    useEffect(() => {
        if (stops.length > 1) {
            clearErrors(`stops.${stops.length - 1}.appointmentStartAt`);
            calculateTimeBetweenStops();
        }
    }, [stops]);

    const time = useMemo(() => getTemplateTime(stops, t), [stops, t]);

    const {
        field: { onChange }
    } = useController({ name: 'stops', control });

    const addStop = () => {
        onChange([...stops, generateStopItem('pickup', stops.length + 1)]);
    };

    const deleteStop = useCallback(
        (index: number) => {
            const actual_stops = getValues('stops');
            const updStops = actual_stops.filter((_, idx) => index !== idx);
            onChange(updStops.map((item, index) => ({ ...item, sequence: index + 1 })));

            // dispatch(
            //     LoadDraftsGrpcService.util.updateQueryData(
            //         'retrieveDraft',
            //         { loadDraftId: selectedDraftId },
            //         (draft) => {
            //             if (!draft?.loadDraft?.fields?.stops) return draft;
            //             return {
            //                 ...draft,
            //                 loadDraft: {
            //                     ...draft.loadDraft,
            //                     fields: {
            //                         ...draft.loadDraft.fields,
            //                         stops: updStops
            //                     }
            //                 }
            //             };
            //         }
            //     )
            // );
        },
        [getValues, onChange]
    );

    const moveUp = useCallback(
        (index: number) => {
            const actual_stops = getValues('stops');
            const newArray = [...actual_stops];
            [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
            onChange(newArray.map((item, index) => ({ ...item, sequence: index + 1 })));
        },
        [getValues, onChange]
    );

    const moveDown = useCallback(
        (index: number) => {
            const actual_stops = getValues('stops');
            const newArray = [...actual_stops];
            [newArray[index], newArray[index + 1]] = [newArray[index + 1], newArray[index]];
            onChange(newArray.map((item, index) => ({ ...item, sequence: index + 1 })));
        },
        [getValues, onChange]
    );

    return (
        <StepContainer>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <StepTitle>
                    <Step3Icon />
                    {t('new_loads:draft.form.steps.3')}
                </StepTitle>
                <StepButton
                    variant="text"
                    size="small"
                    onClick={addStop}
                    {...applyTestId(TestIDs.pages.createLoad.buttons.addStop)}
                >
                    <AddLocationAltOutlinedIcon />
                    {t('new_loads:draft.form.buttons.add_new_stop')}
                </StepButton>
            </Stack>

            {stops.length > 0 ? (
                <>
                    <StopsOverview
                        time={time}
                        stopsLength={stops.length}
                    />
                    <Stack
                        direction="column"
                        width="100%"
                    >
                        {stops.map((stop, index) => (
                            <StopItem
                                distanceToNextStop={stop.distanceToNextStop}
                                key={`${stop.stopId}-${stop.sequence}`}
                                index={index}
                                sequence={index + 1}
                                stops_length={stops.length}
                                deleteStop={deleteStop}
                                moveUp={moveUp}
                                moveDown={moveDown}
                            />
                        ))}
                    </Stack>
                </>
            ) : (
                <NoItems title={t('new_loads:draft.form.stops.empty')} />
            )}
        </StepContainer>
    );
};

export default StopsFields;
