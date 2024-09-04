import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import { filtersActions } from '@/store/filters/slice';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import { EMPTY_SCREENS_CONFIG } from '@/@core/components/table/empty_screens_config';
import { TableName } from '@/@core/components/table/NotFound';
import { MapActions, SelectedTab } from '@/store/map/slice';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    rows: any[];
    filter_id: string;
    tableName: TableName;
    onCreateItem: () => void;
    defaultFilters?: any;
    search: string;
};

export default function EmptyScreen({
    rows,
    filter_id,
    tableName,
    onCreateItem,
    defaultFilters,
    search = ''
}: Props) {
    const { t } = useAppTranslation();
    const pageFilters = useAppSelector((state) => state.filters[filter_id]);
    const dispatch = useAppDispatch();

    const updateFilters = useAdvancedUpdateFilters({ filter_id });

    const handleClearFilters = () => {
        dispatch(filtersActions.removeFilter(filter_id));
        dispatch(MapActions.changeSearch({ type: filter_id as SelectedTab, value: '' }));
        if (!defaultFilters) return;
        updateFilters(defaultFilters);
    };

    if (rows.length === 0 && (!!search || Boolean(pageFilters))) {
        const config = EMPTY_SCREENS_CONFIG[tableName];
        return (
            <FallbackContent
                size="small"
                onClick={handleClearFilters}
                icon={config.NotFoundIcon()}
                firstText="map:empty_state.filters.first_text"
                buttonText="map:empty_state.filters.button_text"
                secondText="map:empty_state.filters.second_text"
                translateOptions={{
                    firstText : { text: t(config.primaryText) },
                    secondText: { text: t(config.primaryText) }
                }}
            />
        );
    }

    if (rows.length === 0) {
        const config = EMPTY_SCREENS_CONFIG[tableName];
        return (
            <FallbackContent
                size="small"
                onClick={onCreateItem}
                icon={config.NoDataIcon()}
                firstText="map:empty_state.default.first_text"
                buttonText={config.createText}
                secondText="map:empty_state.default.second_text"
                textAfterButton="map:empty_state.default.text_after_button"
                translateOptions={{
                    firstText : { text: t(config.primaryText) },
                    secondText: { text: t(config.primaryText) }
                }}
            />
        );
    }

    return null;
}
