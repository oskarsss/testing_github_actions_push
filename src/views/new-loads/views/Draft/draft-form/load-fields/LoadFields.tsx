import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { useWatch } from 'react-hook-form';
import { useActiveLoadsTypes } from '@/store/dispatch/loads/hooks';
import { useActiveEquipmentTypes } from '@/store/equipments/hooks';
import { TestIDs } from '@/configs/tests';
import DispatcherSelect from '@/@core/fields/select/dispatcher-select/DispatcherSelect';
import NotesCustomError from '@/views/new-loads/views/Draft/draft-form/components/CharactersCount';
import ControlledTextInput from '@/@core/fields/controlled-inputs/ControledTextInput';
import ControlledSelectInput from '@/@core/fields/controlled-inputs/ControlledSelectInput';
import ControlledNumberInput from '@/@core/fields/controlled-inputs/ControlledNumberInput';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import OptionComponent from '@/@core/fields/select/components/OptionComponent';
import { LOAD_TYPES_ICONS } from '@/@core/theme/entities/load/load_types';
import Step2Icon from '../../../../icons/Step2Icon';
import { StepContainer, StepTitle } from '../../styled';
import { useDraftFormContext } from '../../Draft';

const LoadFields = () => {
    const { control } = useDraftFormContext();
    const { t } = useAppTranslation();

    const { load_types } = useActiveLoadsTypes();
    const { equipment_types } = useActiveEquipmentTypes();

    const LoadTypeOptions = useMemo(() => {
        const getLabel = (option: (typeof load_types)[0]) => (
            <OptionComponent
                icon={LOAD_TYPES_ICONS[option.icon]}
                text={option.label}
            />
        );

        return load_types.map((option) => ({
            id   : option.id,
            label: () => getLabel(option)
        }));
    }, [load_types]);

    const selectedEquipmentType = useWatch({ control, name: 'equipmentTypeId' });

    const disabledTemperature = useMemo(() => {
        const reeferEquipmentType = equipment_types.find(
            (eqType) => eqType.code === 'R',
            [equipment_types]
        )?.equipmentTypeId;
        return selectedEquipmentType !== reeferEquipmentType;
    }, [selectedEquipmentType, equipment_types]);

    const equipments = useMemo(
        () =>
            equipment_types
                ? equipment_types.map(({
                    code,
                    name,
                    equipmentTypeId
                }) => ({
                    label: `${code} - ${name}`,
                    value: equipmentTypeId
                }))
                : [],
        [equipment_types]
    );

    return (
        <StepContainer>
            <StepTitle>
                <Step2Icon />
                {t('new_loads:draft.form.steps.2')}
            </StepTitle>
            <Grid
                container
                spacing={4}
                marginTop="8px"
                position="relative"
            >
                <Grid
                    item
                    xs={6}
                >
                    <DispatcherSelect
                        control={control}
                        name="dispatcherId"
                        label="new_loads:draft.form.fields.dispatcher_id.label"
                        testID={TestIDs.pages.createLoad.fields.bookingDispatch}
                        optionTestId={TestIDs.components.select.bookingDispatch.optionPrefix}
                    />
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <ControlledSelectInput
                        required
                        width="100%"
                        name="equipmentTypeId"
                        label="new_loads:draft.form.fields.equipment_type.label"
                        control={control}
                        options={equipments}
                        testID={TestIDs.pages.createLoad.fields.equipmentType}
                        optionTestID={TestIDs.components.select.equipmentType.optionPrefix}
                    />
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <ControlledSelectInput
                        required
                        width="100%"
                        name="typeId"
                        label="new_loads:draft.form.fields.load_type.label"
                        control={control}
                        options={LoadTypeOptions}
                        testID={TestIDs.pages.createLoad.fields.loadType}
                        optionTestID={TestIDs.components.select.loadType.optionPrefix}
                    />
                </Grid>
                {/* <Grid
                    item
                    xs={2}
                >
                    <ControlledTextInput
                        width="100%"
                        name="weight"
                        label="fields:weight.label"
                        testID={TestIDs.pages.createLoad.fields.weight}
                        control={control}
                        placeholder="fields:weight.placeholder"
                        inputProps={{
                            inputComponent: MilesFormat as never,
                            endAdornment  : <InputAdornment position="end">lbs</InputAdornment>
                        }}
                    />
                </Grid> */}

                {/* <Grid
                    item
                    xs={7}
                >
                    <ControlledTextInput
                        width="100%"
                        name="commodity"
                        label="fields:commodity.label"
                        testID={TestIDs.pages.createLoad.fields.commodity}
                        control={control}
                        placeholder="fields:commodity.placeholder"
                    />
                </Grid> */}
                <Grid
                    item
                    xs={6}
                >
                    <ControlledNumberInput
                        width="100%"
                        name="temperature"
                        label="fields:temperature.label"
                        disabled={disabledTemperature}
                        testID={TestIDs.pages.createLoad.fields.temperature}
                        control={control}
                        placeholder="fields:temperature.placeholder"
                        inputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {t('fields:temperature.unit')}
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <ControlledTextInput
                        width="100%"
                        name="note"
                        label="fields:note.label"
                        testID={TestIDs.pages.createLoad.fields.loadDetailsNote}
                        control={control}
                        placeholder="fields:note.placeholder"
                        multiline
                        ErrorComponent={(
                            <NotesCustomError
                                control={control}
                                name="note"
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </StepContainer>
    );
};

export default LoadFields;
