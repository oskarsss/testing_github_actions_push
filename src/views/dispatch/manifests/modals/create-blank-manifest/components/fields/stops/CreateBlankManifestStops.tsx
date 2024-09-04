import {
    defaultStop,
    useCreateBlankManifestForm
} from '@/views/dispatch/manifests/modals/create-blank-manifest/helpers';
import { Stack, Collapse } from '@mui/material';
import { StepButton, StepTitle } from '@/views/new-loads/views/Draft/styled';
import Step3Icon from '@/views/new-loads/icons/Step3Icon';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import StopItem from '@/views/dispatch/manifests/modals/create-blank-manifest/components/fields/stops/CreateBlankManifestStopsItem';
import NoItems from '@/views/new-loads/views/Draft/draft-form/components/NoItems';
import React, { memo, useCallback } from 'react';
import { useController, useWatch } from 'react-hook-form';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { uuidv4 } from '@/utils/uuidv4';
import WarningAlert from '@/@core/ui-kits/basic/warning-alert/WarningAlert';

function CreateBlankManifestStops() {
    const { t } = useAppTranslation();

    const {
        control,
        getValues
    } = useCreateBlankManifestForm();

    const stops = useWatch({ name: 'stops', control, exact: true });

    const {
        field: { onChange }
    } = useController({ name: 'stops', control });

    const addStop = () => {
        const actual_stops = getValues('stops');
        const newStop = defaultStop();
        const newArray = [...actual_stops, newStop];
        onChange(newArray.map((item, index) => ({ ...item, sequence: index + 1 })));
    };

    const moveUp = useCallback(
        (index: number) => {
            const actual_stops = getValues('stops');
            const newArray = [...actual_stops];
            [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
            onChange(newArray.map((item, index) => ({ ...item, sequence: index + 1 })));
        },
        [getValues, onChange]
    );

    const deleteStop = useCallback(
        (index: number) => {
            const actual_stops = getValues('stops');
            const updStops = actual_stops.filter((_, idx) => index !== idx);
            onChange(updStops.map((item, index) => ({ ...item, sequence: index + 1 })));
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
        <Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <StepTitle>
                    <Step3Icon />
                    {`2. ${t('entity:stops')}`}
                </StepTitle>
                <StepButton
                    variant="text"
                    size="small"
                    onClick={addStop}
                >
                    <AddLocationAltOutlinedIcon />
                    {t('new_loads:draft.form.buttons.add_new_stop')}
                </StepButton>
            </Stack>

            <Collapse
                in={stops.length < 2}
                sx={{ flexShrink: 0 }}
            >
                <WarningAlert
                    sx={{ marginTop: '8px' }}
                    text="modals:manifests.create_blank.block.stops.alert"
                />
            </Collapse>

            {stops.length > 0 ? (
                <Stack
                    direction="column"
                    width="100%"
                >
                    {stops.map((stop, index) => (
                        <StopItem
                            key={`${stop.stopId}_${stop.location.lat}_${stop.location.lon}`}
                            index={index}
                            sequence={index + 1}
                            stops_length={stops.length}
                            deleteStop={deleteStop}
                            moveUp={moveUp}
                            moveDown={moveDown}
                            stopId={stop.stopId}
                        />
                    ))}
                </Stack>
            ) : (
                <NoItems title={t('new_loads:draft.form.stops.empty')} />
            )}
        </Stack>
    );
}

export default memo(CreateBlankManifestStops);
