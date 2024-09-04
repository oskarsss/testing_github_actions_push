import type { Control, FieldErrors } from 'react-hook-form';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { memo, useMemo } from 'react';
import { CommodityModel_PackagingUnit } from '@proto/models/model_commodity';
import { COMMODITY_PACKAGE_UNIT } from '@/@core/ui-kits/loads/commodities-table/config';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import type { DefaultValues } from '@/@core/ui-kits/loads/commodities-table/modals/Fields';

type Props = {
    control: Control<DefaultValues>;
    errors: FieldErrors<DefaultValues>;
};

function CommodityTypeSelect({
    control,
    errors
}: Props) {
    const { t } = useAppTranslation();

    const options = useMemo(() => {
        const {
            [CommodityModel_PackagingUnit.PLT]: plt,
            [CommodityModel_PackagingUnit.SKD]: skd,
            [CommodityModel_PackagingUnit.CTN]: ctn,
            ...rest
        } = COMMODITY_PACKAGE_UNIT;

        const priorityOptions = [
            { label: t(plt), value: CommodityModel_PackagingUnit.PLT },
            { label: t(skd), value: CommodityModel_PackagingUnit.SKD },
            { label: t(ctn), value: CommodityModel_PackagingUnit.CTN }
        ];

        const restOptions = Object.entries(rest).map(([key, value]) => ({
            label: t(value),
            value: key
        }));

        return [...priorityOptions, ...restOptions];
    }, [t]);

    return (
        <SelectInput
            required
            control={control}
            errors={errors}
            name="packagingUnit"
            width="100%"
            options={options}
            label="core:basic.load.commodities.dialogs.fields.type.label"
        />
    );
}

export default memo(CommodityTypeSelect);
