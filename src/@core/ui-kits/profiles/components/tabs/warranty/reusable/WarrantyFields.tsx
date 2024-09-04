import { memo } from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import WarrantyIcons from '@/@core/ui-kits/profiles/components/tabs/warranty/icons';
import DateInput from '@/@core/fields/inputs/DateInput';
import NumericInput from '@/@core/fields/inputs/NumericInput';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Control, FieldErrors } from 'react-hook-form';
import {
    DefaultWarrantyValues,
    kindOfWarrantyPeriod
} from '@/@core/ui-kits/profiles/components/tabs/warranty/utils';

type Props = {
    control: Control<DefaultWarrantyValues>;
    errors: FieldErrors<DefaultWarrantyValues>;
};

function WarrantyFields({
    control,
    errors
}: Props) {
    const { t } = useAppTranslation();

    return (
        <DialogComponents.Fields>
            <DialogComponents.SectionTitle
                startIcon={<WarrantyIcons.CountryFeatures color="primary" />}
                title="common:profile.center.warranty.section_titles.general_section_title"
            />

            <DialogComponents.Field xs={12}>
                <DateInput
                    control={control}
                    errors={errors}
                    name="startedAt"
                    type="date"
                    label="fields:start_date.label"
                    width="100%"
                    size="small"
                />
            </DialogComponents.Field>

            <DialogComponents.Field
                xs={12}
                sx={{ display: 'flex' }}
            >
                <NumericInput
                    width="100%"
                    control={control}
                    label="common:profile.center.warranty.fields.period.label"
                    name="period"
                    placeholder="common:profile.center.warranty.fields.period.placeholder"
                />

                <SelectInput
                    control={control}
                    errors={errors}
                    label="common:profile.center.warranty.fields.period_units.label"
                    name="periodUnits"
                    width="100%"
                    options={[
                        {
                            value: kindOfWarrantyPeriod.WARRANTY_PERIOD_UNITS_MONTH,
                            label: t(
                                'common:profile.center.warranty.fields.period_units.units.months'
                            )
                        },
                        {
                            value: kindOfWarrantyPeriod.WARRANTY_PERIOD_UNITS_YEAR,
                            label: t(
                                'common:profile.center.warranty.fields.period_units.units.years'
                            )
                        }
                    ]}
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={12}>
                <NumericInput
                    width="100%"
                    control={control}
                    label="common:profile.center.warranty.fields.distance.label"
                    name="distanceMiles"
                    placeholder="common:profile.center.warranty.fields.distance.placeholder"
                    endAdornment={t('common:mi')}
                />
            </DialogComponents.Field>
        </DialogComponents.Fields>
    );
}

export default memo(WarrantyFields);
