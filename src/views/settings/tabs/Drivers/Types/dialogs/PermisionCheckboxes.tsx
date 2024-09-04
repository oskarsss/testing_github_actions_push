import { memo } from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import { PermissionCheckboxInputsConfig } from '@/views/settings/tabs/Drivers/Types/dialogs/constants';
import type { Control, FieldErrors } from 'react-hook-form';
import { DriverTypeCreateRequest_DriverType } from '@proto/driver_type';

type Props = {
    indexes: number[];
    control: Control<DriverTypeCreateRequest_DriverType>;
    errors: FieldErrors<DriverTypeCreateRequest_DriverType>;
};

function PermissionCheckboxes({
    indexes,
    control,
    errors
}: Props) {
    return PermissionCheckboxInputsConfig.slice(...indexes).map(({
        name,
        label
    }) => (
        <DialogComponents.Field
            key={name}
            xs={4}
        >
            <CheckboxInput
                control={control}
                name={name}
                label={label}
                errors={errors}
            />
        </DialogComponents.Field>
    ));
}

export default memo(PermissionCheckboxes);
