import SaveIcon from '@mui/icons-material/Save';
import VectorIcons from '@/@core/icons/vector_icons';
import {
    default_loads_filters,
    LoadsView,
    LOADS_VIEW_TYPES,
    DEFAULT_LOADS_VIEW_IDS
} from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import LoadsTypes from '@/store/dispatch/loads/types';
import Tooltip from '@mui/material/Tooltip';
import React, { memo, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';
import { useStableLinks } from '@/@core/components/table/hooks/helpers';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import { isEqual } from 'lodash';
import { uuidv4 } from '@/utils/uuidv4';
import EntityFilters from '@/@core/components/filters/filter-button/types';
import { UpdateViewAction } from '@/@core/ui-kits/loads/loads-page-views/LoadsPageViews';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import SettingsIcon from '@mui/icons-material/Settings';
import FilterControlStyled from './LoadsFilterControl.styled';
import {
    DayLinesType,
    loadSettingsMenuWidth,
    useLoadSettingsMenu
} from './load-settings-menu/LoadSettingsMenu';

type DefaultFiltersKeys = keyof LoadsTypes.Loads.SearchOptions;

export type CreateViewAction = (view: {
    type: LoadsView['type'];
    view_id: string;
    name: string;
    filters: LoadsView['filters'];
}) => void;

type Props = {
    selected_view_id: string;
    view?: LoadsView | null;
    filters: EntityFilters.MergedFilters;
    selected_filters: LoadsTypes.Loads.SearchOptions;
    filter_id: string;
    createViewAction: CreateViewAction;
    updateViewAction: UpdateViewAction;
    showDaysLines: boolean;
    toggleDaysLines: () => void;
    daysLinesType: DayLinesType;
    setDaysLinesType: (type: DayLinesType) => void;
};

function LoadsFilterControl({
    filter_id,
    filters,
    selected_filters,
    selected_view_id,
    view,
    createViewAction,
    updateViewAction,
    showDaysLines: daysLines,
    toggleDaysLines: onChangeDaysLines,
    daysLinesType,
    setDaysLinesType
}: Props) {
    const {
        emptyArray,
        emptyObject
    } = useStableLinks();

    const loadSettingsMenu = useLoadSettingsMenu();

    const show_text_btn = useMediaQuery('(min-width: 2100px)');

    const updateFilters = useUpdateFilters({ filter_id });
    const { t } = useAppTranslation();

    const filter_keys = useMemo(
        () => filters?.map((f) => f.filter_id as DefaultFiltersKeys) || emptyArray,
        [emptyArray, filters]
    );

    const filters_selected = useMemo(() => {
        if (!filter_keys?.length) {
            return emptyObject as NonNullable<LoadsView['filters']>;
        }
        const filter_selected = filter_keys.reduce((acc, key) => {
            if (key in selected_filters) {
                acc[key] = selected_filters[key] as string | (string | number)[];
            }
            return acc;
        }, {} as NonNullable<LoadsView['filters']>);

        filter_selected.start_at = selected_filters.start_at;
        filter_selected.end_at = selected_filters.end_at;

        return filter_selected;
    }, [filter_keys, selected_filters, emptyObject]);

    const isDirty = useMemo(() => {
        const selected = Object.values({
            ...default_loads_filters,
            ...(view?.filters || {}),
            ...filters_selected
        });

        const filters_values = Object.values({
            ...default_loads_filters,
            ...(view?.filters || {})
        });

        if (!selected.length) return false;

        return !isEqual(selected, filters_values);
    }, [view?.filters, filters_selected]);

    const isDefault = selected_view_id === DEFAULT_LOADS_VIEW_IDS.DEFAULT;

    const clearFilters = () => {
        if (!view) return;
        if (isDefault) {
            updateFilters(default_loads_filters);
        } else {
            updateFilters(view.filters);
        }
    };

    const addView = () => {
        createViewAction({
            view_id: uuidv4(),
            type   : LOADS_VIEW_TYPES.COMMON,
            name   : t('core:basic.load.filter_control.new_view'),
            filters: filters_selected
        });
    };

    const updateView = () => {
        if (!view) return;

        updateViewAction({
            ...view,
            filters: filters_selected
        });
    };

    const onClick = () => {
        if (isDefault) {
            addView();
        } else {
            updateView();
        }
    };

    const openSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
        const buttonRect = event.currentTarget.getBoundingClientRect();
        loadSettingsMenu.open({
            daysLines,
            toggleDaysLines: onChangeDaysLines,
            daysLinesType,
            setDaysLinesType
        })({
            ...event,
            clientX: buttonRect.right - loadSettingsMenuWidth,
            clientY: buttonRect.bottom
        });
    };

    return (
        <>
            <Tooltip
                disableInteractive
                title="Settings"
            >
                <div>
                    <FilterControlStyled.FilterButton
                        onClick={openSettingsMenu}
                        color="secondary"
                        startIcon={<SettingsIcon />}
                        isDirty
                    >
                        {show_text_btn && (
                            <FilterControlStyled.TextButton>
                                Settings
                            </FilterControlStyled.TextButton>
                        )}
                    </FilterControlStyled.FilterButton>
                </div>
            </Tooltip>
            <Tooltip
                disableInteractive
                title={t('core:filters.clear_filters')}
            >
                <div>
                    <FilterControlStyled.FilterButton
                        disabled={!isDirty}
                        onClick={clearFilters}
                        color="secondary"
                        startIcon={<VectorIcons.Garbage />}
                        isDirty={isDirty}
                    >
                        {show_text_btn && (
                            <FilterControlStyled.TextButton>
                                {t('core:filters.clear_filters')}
                            </FilterControlStyled.TextButton>
                        )}
                    </FilterControlStyled.FilterButton>
                </div>
            </Tooltip>
            <Tooltip
                disableInteractive
                title={t(
                    isDefault ? 'core:filters.save_filter_view' : 'core:filters.update_filter_view'
                )}
            >
                <div>
                    <FilterControlStyled.FilterButton
                        onClick={onClick}
                        disabled={!isDirty}
                        startIcon={<SaveIcon />}
                        isDirty={isDirty}
                    >
                        {show_text_btn && (
                            <FilterControlStyled.TextButton>
                                {t(
                                    isDefault
                                        ? 'core:filters.save_filter_view'
                                        : 'core:filters.update_filter_view'
                                )}
                            </FilterControlStyled.TextButton>
                        )}
                    </FilterControlStyled.FilterButton>
                </div>
            </Tooltip>
        </>
    );
}

export default memo(LoadsFilterControl);
