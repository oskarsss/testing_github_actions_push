import type { Control, ErrorOption } from 'react-hook-form';
import { type DefaultValues } from '@/views/maintenance/service-logs/modals/service-log-item/service-log-item-utils';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import { memo } from 'react';
import { isEqual } from 'lodash';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ServiceLogItemModel_WarrantyCoverage } from '@proto/models/model_service_log_item';

type Props = {
    control: Control<DefaultValues>;
    errors: { [P in keyof DefaultValues]?: ErrorOption };
};

function WarrantyCoveredSelect({
    control,
    errors
}: Props) {
    const { t } = useAppTranslation();

    const options = [
        {
            label: t('maintenance:service_logs.common.covered'),
            value: ServiceLogItemModel_WarrantyCoverage.COVERED
        },
        {
            label: t('maintenance:service_logs.common.not_covered'),
            value: ServiceLogItemModel_WarrantyCoverage.UNCOVERED
        }
    ];

    return (
        <SelectInput
            control={control}
            errors={errors}
            label="maintenance:service_logs.modals.create_item.fields.warranty_covered.label"
            width="100%"
            name="warrantyCoverage"
            options={options}
        />
    );
}

export default memo(WarrantyCoveredSelect, isEqual);
