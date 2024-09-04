import SaveIcon from '@mui/icons-material/Save';
import VectorIcons from '@/@core/icons/vector_icons';
import LoadsTypes from '@/store/dispatch/loads/types';
import Tooltip from '@mui/material/Tooltip';
import React, { memo, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';
import { useStableLinks } from '@/@core/components/table/hooks/helpers';
import { isEqual } from 'lodash';
import { uuidv4 } from '@/utils/uuidv4';
import EntityFilters from '@/@core/components/filters/filter-button/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import {
    DefaultManifestsViews,
    MANIFESTS_VIEW_TYPES,
    MANIFEST_VIEW_IDS_ENUM,
    ManifestView
} from '@/store/dispatch/manifests/models';
import { manifestDefaultFilters } from '@/@grpcServices/services/manifests-service/manifest-service-hooks';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    loadSettingsMenuWidth,
    useLoadSettingsMenu
} from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/LoadSettingsMenu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    setDaysLinesTypeAction,
    toggleShowDaysLinesAction
} from '@/store/dispatch/manifests/actions/views';
import { useManifests } from '@/store/dispatch/manifests/hooks';
import FilterControlStyled from './styled';

type DefaultFiltersKeys = keyof LoadsTypes.Loads.SearchOptions;

type UpdateViewAction = (view: ManifestView) => void;

const defaultIds: string[] = [
    MANIFEST_VIEW_IDS_ENUM.ALL,
    MANIFEST_VIEW_IDS_ENUM.PLANNING,
    MANIFEST_VIEW_IDS_ENUM.ASSIGNED,
    MANIFEST_VIEW_IDS_ENUM.MOVING,
    MANIFEST_VIEW_IDS_ENUM.COMPLETED
];

export type CreateViewAction = (view: {
    type: ManifestView['type'];
    view_id: string;
    name: string;
    filters: ManifestView['filters'];
}) => void;

type Props = {
    selected_view_id: string;
    view?: ManifestView | null;
    selected_filters: any;
    filter_id: string;
    createViewAction: CreateViewAction;
    updateViewAction: UpdateViewAction;
};

function FilterControl({
    filter_id,
    selected_filters,
    selected_view_id,
    view,
    createViewAction,
    updateViewAction
}: Props) {
    const { filters } = useManifests();

    const {
        emptyArray,
        emptyObject
    } = useStableLinks();
    const dispatch = useAppDispatch();
    const daysLines = useAppSelector((state) => state.manifests.settings.showDaysLines);
    const daysLinesType = useAppSelector((state) => state.manifests.settings.daysLinesType);

    const toggleDaysLines = () => {
        dispatch(toggleShowDaysLinesAction());
    };
    const loadSettingsMenu = useLoadSettingsMenu();

    const show_text_btn = useMediaQuery('(min-width: 2100px)');
    const defaultFilters = useMemo(
        () =>
            DefaultManifestsViews.find((mView) => mView.view_id === view?.view_id) ??
            manifestDefaultFilters,
        [view?.view_id]
    );
    const updateFilters = useUpdateFilters({ filter_id });
    const { t } = useAppTranslation();

    const filter_keys = useMemo(
        () => filters?.map((f) => f.filter_id as DefaultFiltersKeys) || emptyArray,
        [emptyArray, filters]
    );

    const filters_selected = useMemo(() => {
        if (!filter_keys?.length) {
            return emptyObject as NonNullable<ManifestView['filters']>;
        }
        const filter_selected = filter_keys.reduce((acc, key) => {
            if (key in selected_filters) {
                acc[key] = selected_filters[key] as string | (string | number)[];
            }
            return acc;
        }, {} as NonNullable<ManifestView['filters']>);

        filter_selected.start_at = selected_filters.start_at;
        filter_selected.end_at = selected_filters.end_at;

        return filter_selected;
    }, [filter_keys, selected_filters, emptyObject]);

    const isDirty = useMemo(() => {
        const selected = Object.values({
            ...manifestDefaultFilters,
            ...(view?.filters || {}),
            ...filters_selected
        });

        const filters_values = Object.values({
            ...manifestDefaultFilters,
            ...(view?.filters || {})
        });

        if (!selected.length) return false;

        return !isEqual(selected, filters_values);
    }, [view?.filters, filters_selected]);

    const isDefault = defaultIds.includes(selected_view_id);
    const isAllView = MANIFEST_VIEW_IDS_ENUM.ALL === selected_view_id;

    const clearFilters = () => {
        if (!view) return;
        updateFilters({
            ...manifestDefaultFilters,
            ...view.filters
        });
    };

    const addView = () => {
        createViewAction({
            view_id: uuidv4(),
            type   : MANIFESTS_VIEW_TYPES.custom,
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
        if (isAllView) {
            addView();
        } else {
            updateView();
        }
    };

    const openSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
        const buttonRect = event.currentTarget.getBoundingClientRect();
        loadSettingsMenu.open({
            daysLines,
            toggleDaysLines,
            daysLinesType,
            setDaysLinesType: (type) => {
                dispatch(setDaysLinesTypeAction(type));
            }
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
                    isAllView ? 'core:filters.save_filter_view' : 'core:filters.update_filter_view'
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
                                    isAllView
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

export default memo(FilterControl);
