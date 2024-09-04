import DialogComponents from '@/@core/ui-kits/common-dialog';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import TextInput from '@/@core/fields/inputs/TextInput';
import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { Control, FieldErrors } from 'react-hook-form';
import { DriverTypeCreateRequest_DriverType } from '@proto/driver_type';
import type { IntlMessageKey } from '@/@types/next-intl';
import { getDriverTypesIconsOptions } from './constants';
import PermissionCheckboxes from './PermisionCheckboxes';

type DriverTypeFieldsProps = {
    title: IntlMessageKey;
    control: Control<DriverTypeCreateRequest_DriverType>;
    errors: FieldErrors<DriverTypeCreateRequest_DriverType>;
};

export default function DriverTypeFields({
    control,
    errors,
    title
}: DriverTypeFieldsProps) {
    const { t } = useAppTranslation();

    const driverTypeIconsOptions = useMemo(() => getDriverTypesIconsOptions(t), [t]);

    return (
        <>
            <DialogComponents.Header title={title} />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={6}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="modals:settings.driver_types.create_update.field.type_name.label"
                        name="name"
                        placeholder="modals:settings.driver_types.create_update.field.type_name.placeholder"
                        autoFocus
                        width="100%"
                        required
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={6}>
                    <SelectInput
                        control={control}
                        errors={errors}
                        label="modals:settings.driver_types.create_update.select.driver_type_icon.label"
                        name="icon"
                        width="100%"
                        options={driverTypeIconsOptions}
                        required
                    />
                </DialogComponents.Field>

                <PermissionCheckboxes
                    indexes={[0, 6]}
                    control={control}
                    errors={errors}
                />

                <Typography
                    variant="h5"
                    margin="30px 25px 10px"
                    width="100%"
                >
                    {t('modals:settings.driver_types.create_update.block.settlement.title')}
                </Typography>

                <PermissionCheckboxes
                    indexes={[6, -4]}
                    control={control}
                    errors={errors}
                />

                <Typography
                    variant="h5"
                    margin="30px 25px 10px"
                    width="100%"
                >
                    {t('modals:settings.driver_types.create_update.block.app.title')}
                </Typography>

                <PermissionCheckboxes
                    indexes={[-4]}
                    control={control}
                    errors={errors}
                />
            </DialogComponents.Fields>
        </>
    );
}
