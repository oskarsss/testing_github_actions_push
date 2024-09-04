import { Control, useController } from 'react-hook-form';
import FiltersItem from '@/@core/components/filters/selects-filters-group/FiltersItem';
import Export from '@/store/export/types';
import EntityFilters from '@/@core/components/filters/filter-button/types';
import { FilterComponentsMap, FilterIdMap, FilterKeys } from '@/@core/components/filters/types';
import ModelYear from '@/@core/components/export-dialog/FirstStep/components/Filter/custom-filter/ModelYear';
import FormHelperText from '@mui/material/FormHelperText';
import YearsRange from '@/@core/components/export-dialog/FirstStep/components/Filter/custom-filter/YearsRange';
import { FilterModel_FilterID } from '../../../../../../../proto_data/ts/v1/models/model_filter_type';

const componentsConfig: FilterComponentsMap = {
    trailer_year: ModelYear,
    truck_year  : ModelYear,
    driver_age  : YearsRange
};

type Props = {
    control: Control<Export.FormValues>;
    label: string;
    filterId: FilterModel_FilterID;
    required?: boolean;
    counts?: Record<string, number> | undefined;
    filterType: FilterKeys;
    getFilterConfig?: (
        counts?: EntityFilters.Filter['counts'],
        amounts?: EntityFilters.Filter['amounts']
    ) => EntityFilters.FilterConfig;
};

export default function Filter({
    control,
    filterId,
    label,
    required,
    getFilterConfig,
    counts,
    filterType
}: Props) {
    const {
        field: {
            onChange,
            value
        },
        fieldState: { error }
    } = useController({ control, name: `selectedFilters.${FilterIdMap[filterId]}` });

    const Component = componentsConfig?.[filterType];

    if (Component) {
        return (
            <>
                <Component
                    key={filterType}
                    filter_id={filterType}
                    value={value || []}
                    onChange={onChange}
                />
                {!!error && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                        <span>{error.message}</span>
                    </FormHelperText>
                )}
            </>
        );
    }

    return (
        <FiltersItem
            filter_type={filterType}
            label={label}
            onChange={onChange}
            value={value || []}
            error={error}
            required={required}
            quantity_show={3}
            counts={counts}
            getFilterConfig={getFilterConfig}
        />
    );
}
