import { filtersActions } from '@/store/filters/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import animationData from '@/@core/components/table/not-found-lottie.json';
import Lottie from 'lottie-react';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import { EMPTY_SCREENS_CONFIG } from '@/@core/components/table/empty_screens_config';
import { ComponentProps } from 'react';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import { isEqual } from 'lodash';
import type { PageModel_Page } from '@proto/models/model_page';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useTableEditorDialog } from './TableEditor/TableEditor';
import TableTypes from './types';

export type TableName = keyof typeof EMPTY_SCREENS_CONFIG;

type Props = {
    rows: any[];
    filter_id: string;
    tableName: TableName;
    onCreateItem: () => void;
    view: TableTypes.View | null | undefined;
    size?: ComponentProps<typeof FallbackContent>['size'];
    defaultFilters?: any;
    updateFilters: (filters: object) => void;
    page?: keyof typeof PageModel_Page;
};

type EasyNotFoundProps = {
    rows: any[];
    isLoading: boolean;
};
export function EasyNotFound({
    rows,
    isLoading
}: EasyNotFoundProps) {
    const { t } = useAppTranslation();
    if (isLoading) {
        return null;
    }

    if (rows && rows.length > 0) {
        return null;
    }
    return (
        <div
            style={{
                width         : '100%',
                height        : '100%',
                display       : 'flex',
                flexDirection : 'column',
                alignItems    : 'center',
                justifyContent: 'center',
                position      : 'absolute',
                top           : 0,
                left          : 0,
                right         : 0,
                bottom        : 0
            }}
        >
            <Lottie
                animationData={animationData}
                loop={false}
            />
            <span>{t('core:table.empty_screen.easy_not_found')}</span>
        </div>
    );
}

export default function NotFound({
    rows,
    filter_id,
    tableName,
    onCreateItem,
    view,
    size = 'large',
    defaultFilters,
    updateFilters,
    page
}: Props) {
    const { t } = useAppTranslation();
    const pageFilters = useAppSelector((state) => state.filters[filter_id]);
    const dispatch = useAppDispatch();

    const checkEmptyFilters = () => {
        if (!pageFilters) return false;

        const default_filters = {
            ...pageFilters,
            ...(defaultFilters || {})
        };
        const selected_filters = {
            ...(defaultFilters || {}),
            ...pageFilters
        };

        return !isEqual(default_filters, selected_filters);
    };

    const tableEditorDialog = useTableEditorDialog();

    const handleClickSetupColumns = () => {
        if (!page) return;
        tableEditorDialog.open({
            page,
            view_index: 0
        });
    };

    const handleClearFilters = () => {
        dispatch(filtersActions.removeFilter(filter_id));
        if (!defaultFilters) return;
        updateFilters(defaultFilters);
    };

    if (view?.columns.length === 0) {
        return (
            <FallbackContent
                size={size}
                onClick={handleClickSetupColumns}
                icon={EMPTY_SCREENS_CONFIG[tableName].NoColumnsIcon()}
                firstText="core:table.empty_screen.empty_columns.first_text"
                buttonText="core:table.empty_screen.empty_columns.button_text"
                secondText="core:table.empty_screen.empty_columns.second_text"
            />
        );
    }

    if (rows.length === 0 && checkEmptyFilters()) {
        const config = EMPTY_SCREENS_CONFIG[tableName];
        return (
            <FallbackContent
                size={size}
                onClick={handleClearFilters}
                icon={config.NotFoundIcon()}
                firstText="core:table.empty_screen.clear_filters.first_text"
                buttonText="core:table.empty_screen.clear_filters.button_text"
                secondText="core:table.empty_screen.clear_filters.second_text"
                translateOptions={{
                    firstText : { primaryText: t(config.primaryText) },
                    secondText: { primaryText: t(config.primaryText) }
                }}
            />
        );
    }

    if (rows.length === 0) {
        const config = EMPTY_SCREENS_CONFIG[tableName];
        return (
            <FallbackContent
                size={size}
                onClick={onCreateItem}
                icon={config.NoDataIcon()}
                firstText="core:table.empty_screen.empty_rows.first_text"
                buttonText={config.createText}
                textAfterButton={
                    config.createText ? 'core:table.empty_screen.empty_rows.text_after_button' : ''
                }
                secondText="core:table.empty_screen.empty_rows.second_text"
                translateOptions={{
                    firstText: {
                        primaryText: t(config.primaryText),
                        createText : config.createText
                            ? t('core:table.empty_screen.empty_rows.additional_text')
                            : ''
                    },
                    secondText: { primaryText: t(config.primaryText) }
                }}
            />
        );
    }

    return null;
}
