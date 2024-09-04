import { useMemo } from 'react';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import TextInput from '@/@core/fields/inputs/TextInput';
import { useActiveEquipmentTypes } from '@/store/equipments/hooks';
import { useActiveLoadsTypes } from '@/store/dispatch/loads/hooks';
import { Grid, InputAdornment, Stack } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import { EditLoadDefaultValues } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoadForm';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import CommonRadioGroups from '@/@core/ui-kits/basic/common-radio-groups/CommonRadioGroups';
import { LOAD_CLIENT_RADIO_GROUP_CONFIG } from '@/configs/load-client-radio-groups-config';
import { LoadClientReferenceIDCheckDuplicateRequest_EntityType } from '@proto/loads';
import LoadReferenceId from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/custom-fields/load-reference-id/LoadReferenceIdField';
import LoadDispatcherField from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/custom-fields/load-dispather/LoadDispatcherField';
import LoadTemperatureField from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/custom-fields/load-temperature/LoadTemperatureField';
import LoadClientSelect from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/custom-fields/load-client-select/LoadClientSelect';
import { useEditLoadClientDialog } from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/custom-fields/load-client-select/EditLoadClientDialog';
import { LOAD_TYPES_ICONS } from '@/@core/theme/entities/load/load_types';
import OptionComponent from '@/@core/fields/select/components/OptionComponent';

type Props = {
    loadId: string;
    dispatcherId: string;
    temperature: number;
    referenceId: string;
    brokerId: string;
    customerId: string;
};

export default function EditLoadFields({
    loadId,
    dispatcherId,
    temperature,
    referenceId,
    brokerId,
    customerId
}: Props) {
    const { t } = useAppTranslation();
    const isBrokerSelected = !!brokerId;
    const editLoadClientDialog = useEditLoadClientDialog();

    const {
        control,
        formState: { errors }
    } = useFormContext<EditLoadDefaultValues>();
    const { equipment_types } = useActiveEquipmentTypes();

    const equipments = useMemo(
        () =>
            equipment_types
                ? equipment_types.map((option) => ({
                    label: `${option.code} - ${option.name}`,
                    value: option.equipmentTypeId
                }))
                : [],
        [equipment_types]
    );

    const selectedEquipmentType = useWatch({ control, name: 'equipment_id' });

    const disabledTemperature = useMemo(() => {
        const reeferEquipmentType = equipment_types.find(
            (eqType) => eqType.code === 'R',
            [equipment_types]
        )?.equipmentTypeId;
        return selectedEquipmentType !== reeferEquipmentType;
    }, [selectedEquipmentType, equipment_types]);

    const { load_types } = useActiveLoadsTypes();

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

    const onSelectClientType = () => {
        editLoadClientDialog.open({
            brokerId,
            customerId,
            loadId,
            referenceId,
            isBrokerSelected: !isBrokerSelected
        });
    };

    return (
        <FullDialog.Fields rowSpacing={5}>
            <Grid
                item
                container
                direction="row"
                alignItems="center"
                xs={12}
            >
                {isBrokerSelected ? (
                    <VectorIcons.FullDialogIcons.Briefcase />
                ) : (
                    <VectorIcons.FullDialogIcons.Customer />
                )}
                <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flex="1 1 0"
                >
                    <FullDialog.Subtitle>
                        {t(isBrokerSelected ? 'entity:broker' : 'entity:customer')}
                    </FullDialog.Subtitle>
                    <CommonRadioGroups
                        setRadioValue={onSelectClientType}
                        config={LOAD_CLIENT_RADIO_GROUP_CONFIG}
                        radioValue={isBrokerSelected ? 'broker_id' : 'customer_id'}
                    />
                </Stack>
            </Grid>
            <FullDialog.Field xs={9}>
                <LoadClientSelect
                    isBrokerSelected={isBrokerSelected}
                    brokerId={brokerId}
                    customerId={customerId}
                    loadId={loadId}
                    referenceId={referenceId}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={3}>
                <LoadReferenceId
                    entityId={isBrokerSelected ? brokerId : customerId}
                    referenceId={referenceId}
                    loadId={loadId}
                    entityType={
                        isBrokerSelected
                            ? LoadClientReferenceIDCheckDuplicateRequest_EntityType.BROKER
                            : LoadClientReferenceIDCheckDuplicateRequest_EntityType.CUSTOMER
                    }
                />
            </FullDialog.Field>

            <FullDialog.FieldsGroupTitle
                startIcon={<VectorIcons.FullDialogIcons.Load />}
                title="entity:load"
            />
            <FullDialog.Field xs={3.6}>
                <LoadDispatcherField
                    loadId={loadId}
                    dispatcherId={dispatcherId}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={3.2}>
                <SelectInput
                    size="small"
                    width="100%"
                    name="equipment_id"
                    label="fields:equipment_type.label"
                    control={control}
                    errors={errors}
                    options={equipments}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={5.2}>
                <SelectInput
                    size="small"
                    width="100%"
                    name="type_id"
                    label="modals:loads.edit_load.fields.titles.load_type"
                    control={control}
                    errors={errors}
                    options={LoadTypeOptions}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={2.5}>
                <NumberInput
                    control={control}
                    errors={errors}
                    name="weight"
                    label="fields:weight.label"
                    width="100%"
                    placeholder="fields:weight.placeholder"
                    inputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {t('fields:weight.unit')}
                            </InputAdornment>
                        )
                    }}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={7}>
                <TextInput
                    size="small"
                    width="100%"
                    name="commodity"
                    label="fields:commodity.label"
                    control={control}
                    errors={errors}
                    placeholder="fields:commodity.placeholder"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={2.5}>
                <LoadTemperatureField
                    loadId={loadId}
                    temperature={temperature}
                    disabled={disabledTemperature}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    multiline
                    size="small"
                    control={control}
                    errors={errors}
                    label="fields:note.label"
                    name="note"
                    placeholder="fields:note.placeholder"
                    type="text"
                    width="100%"
                />
            </FullDialog.Field>
        </FullDialog.Fields>
    );
}
