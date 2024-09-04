import MenuComponents from '@/@core/ui-kits/menus';
import CommonTabs, { Options } from '@/@core/ui-kits/basic/common-tabs/CommonTabs';
import TruckSelect from '@/@core/fields/select/truck-select/TruckSelect';
import TrailersSelect from '@/@core/fields/select/trailer-select/TrailersSelect';
import React from 'react';
import TollsIcons from '@/views/accounting/tolls/TollsIcons';
import { Control, UseFormSetValue } from 'react-hook-form';

const options: Options[] = [
    {
        label: 'entity:truck',
        icon : <TollsIcons.TruckIcon />,
        value: 'truck'
    },
    {
        label: 'entity:trailer',
        icon : <TollsIcons.TrailerIcon />,
        value: 'trailer'
    }
];

type DefaultValues = {
    truck_id: string;
    trailer_id: string;
};

type Props = {
    submitLoading: boolean;
    submitDisabled: boolean;
    setSelectedEntity: (value: 'truck' | 'trailer') => void;
    selectedEntity: 'truck' | 'trailer';
    onClose: () => void;
    control: Control<DefaultValues>;
    setValue: UseFormSetValue<DefaultValues>;
};

export default function AssignTollToEquipmentFields({
    submitLoading,
    submitDisabled,
    setSelectedEntity,
    selectedEntity,
    onClose,
    control,
    setValue
}: Props) {
    return (
        <MenuComponents.Fields>
            <MenuComponents.Field xs={12}>
                <CommonTabs
                    value={selectedEntity}
                    options={options}
                    aria-label="edit settlement tabs"
                    onChange={(event, value) => {
                        setSelectedEntity(value);
                        setValue('truck_id', '');
                        setValue('trailer_id', '');
                    }}
                />
            </MenuComponents.Field>
            <MenuComponents.Field xs={12}>
                {selectedEntity === 'truck' ? (
                    <TruckSelect
                        name="truck_id"
                        control={control}
                    />
                ) : (
                    <TrailersSelect
                        control={control}
                        name="trailer_id"
                    />
                )}
            </MenuComponents.Field>
            <MenuComponents.ActionsWrapper>
                <MenuComponents.CancelButton onCancel={onClose} />
                <MenuComponents.SubmitButton
                    disabled={submitDisabled}
                    text="common:button.assign"
                    loading={submitLoading}
                />
            </MenuComponents.ActionsWrapper>
        </MenuComponents.Fields>
    );
}
