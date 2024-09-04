/* eslint-disable max-len */

import { Control, useWatch } from 'react-hook-form';
import Fade from '@mui/material/Fade';
import React, { useMemo } from 'react';
import Filter from '@/@core/components/export-dialog/FirstStep/components/Filter/Filter';
import Export from '@/store/export/types';
import EntityFilters from '@/@core/components/filters/filter-button/types';
import { FilterIdMap, FilterKeys } from '@/@core/components/filters/types';
import { filter_config_map } from '@/@core/components/filters/config_map';
import Multiselect from '@/@core/components/export-dialog/FirstStep/components/Multiselect/Multiselect';
import DateRange from '@/@core/components/export-dialog/FirstStep/components/DateRange/DateRange';
import { useStableArray } from '@/hooks/useStable';
import { ExportDialogStyled } from '../styled';
import {
    GetExportConfigReply_Exporter_Type,
    GetExportConfigReply_Exporter_Type_Filter
} from '../../../../../proto_data/ts/v1/export';
import { FilterModel_FilterID } from '../../../../../proto_data/ts/v1/models/model_filter_type';

type Props = {
    filters?: EntityFilters.Filter[];
    control: Control<Export.FormValues>;
    types: GetExportConfigReply_Exporter_Type[];
};

export default function Parameters({
    filters,
    control,
    types
}: Props) {
    const type_id = useWatch({ control, name: 'exporterTypeId' });
    const filtersMap = useMemo(
        () =>
            filters?.reduce((acc, filter) => {
                if (filter.filter_id) {
                    acc[filter.filter_id as FilterKeys] = filter;
                }
                return acc;
            }, {} as Record<FilterKeys, EntityFilters.Filter>),
        [filters]
    );

    const type = useMemo(
        () => types.find((type) => type.exporterTypeId === type_id),
        [types, type_id]
    );

    const exportConfigFilters = useStableArray(type?.filters);

    return (
        <Fade in={exportConfigFilters.length > 0}>
            <ExportDialogStyled.Container.Parameters>
                {exportConfigFilters.map((filter) => {
                    const {
                        FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_START,
                        FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_END
                    } = FilterModel_FilterID;

                    if (filter.filterId === FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_START) {
                        return (
                            <DateRange
                                startAtID={FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_START}
                                endAtID={FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_END}
                                control={control}
                            />
                        );
                    }

                    if (filter.filterId === FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_END) {
                        return null;
                    }

                    const filterType = FilterIdMap[filter.filterId];

                    if (!filterType) {
                        return null;
                    }

                    const counts = filtersMap?.[filterType]?.counts;

                    return (
                        <Filter
                            key={filter.filterId}
                            control={control}
                            label={filter.label}
                            counts={counts}
                            required={filter.required}
                            filterType={filterType}
                            getFilterConfig={filter_config_map[filter.filterId]}
                            filterId={filter.filterId}
                        />
                    );
                })}
                {!!type?.columns?.length && (
                    <Multiselect
                        control={control}
                        columns={type.columns}
                    />
                )}
            </ExportDialogStyled.Container.Parameters>
        </Fade>
    );
}
