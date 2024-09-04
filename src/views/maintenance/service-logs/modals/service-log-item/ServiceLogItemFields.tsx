import DialogComponents from '@/@core/ui-kits/common-dialog';
import ItemTypeSelect from '@/views/maintenance/service-logs/modals/service-log-item/ItemTypeSelect';
import WarrantyCoveredSelect from '@/views/maintenance/service-logs/modals/service-log-item/WarrantyCoveredSelect';
import NumericInput from '@/@core/fields/inputs/NumericInput';
import type { Control, ErrorOption } from 'react-hook-form';
import type { DefaultValues } from '@/views/maintenance/service-logs/modals/service-log-item/service-log-item-utils';
import { memo } from 'react';
import { isEqual } from 'lodash';

type Props = {
    control: Control<DefaultValues>;
    errors: { [P in keyof DefaultValues]?: ErrorOption };
};

function ServiceLogItemFields({
    control,
    errors
}: Props) {
    return (
        <DialogComponents.Fields>
            <DialogComponents.Field xs={12}>
                <ItemTypeSelect control={control} />
            </DialogComponents.Field>

            <DialogComponents.Field xs={12}>
                <WarrantyCoveredSelect
                    control={control}
                    errors={errors}
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={6}>
                <NumericInput
                    label="fields:quantity.label"
                    placeholder="fields:quantity.placeholder"
                    name="quantity"
                    width="100%"
                    control={control}
                    startAdornment="$"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={6}>
                <NumericInput
                    label="fields:rate.label"
                    placeholder="fields:rate.placeholder"
                    name="rate"
                    width="100%"
                    control={control}
                    startAdornment="$"
                />
            </DialogComponents.Field>
        </DialogComponents.Fields>
    );
}

export default memo(ServiceLogItemFields, isEqual);
