import { memo } from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import NumericInput from '@/@core/fields/inputs/NumericInput';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Control, FieldErrors } from 'react-hook-form';
import { DefaultCoverageItemValues } from '@/@core/ui-kits/profiles/components/tabs/warranty/modals/coverage-item/utils';
import TextInput from '@/@core/fields/inputs/TextInput';

type Props = {
    control: Control<DefaultCoverageItemValues>;
    errors: FieldErrors<DefaultCoverageItemValues>;
};

function CoverageItemFields({
    control,
    errors
}: Props) {
    const { t } = useAppTranslation();

    return (
        <DialogComponents.Fields>
            <DialogComponents.Field xs={12}>
                <TextInput
                    required
                    label="fields:name.label"
                    control={control}
                    errors={errors}
                    name="name"
                    placeholder="fields:name.placeholder"
                    width="100%"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={12}>
                <NumericInput
                    width="100%"
                    control={control}
                    label="common:profile.center.warranty.modals.coverage_item.fields.period.label"
                    name="periodMonthsRange"
                    placeholder="common:profile.center.warranty.modals.coverage_item.fields.period.placeholder"
                    endAdornment={t('common:mon')}
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={12}>
                <NumericInput
                    width="100%"
                    control={control}
                    label="common:profile.center.warranty.modals.coverage_item.fields.distance.label"
                    name="distanceMilesRange"
                    placeholder="common:profile.center.warranty.modals.coverage_item.fields.distance.placeholder"
                    endAdornment={t('common:mi')}
                />
            </DialogComponents.Field>
        </DialogComponents.Fields>
    );
}

export default memo(CoverageItemFields);
