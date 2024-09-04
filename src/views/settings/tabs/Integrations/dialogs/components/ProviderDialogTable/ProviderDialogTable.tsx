import { useCallback } from 'react';
import TableViews from '@/@core/components/table-views/TableViews';
import SearchField from '@/@core/components/search/search-field/SearchField';
import Table from '@/@core/components/table/Table';
import { useAppDispatch } from '@/store/hooks';
import { updateFilters as _updateFilters } from '@/store/filters/actions';
import TableTypes from '@/@core/components/table/types';
import ProviderDialogTableComponents from '@/views/settings/tabs/Integrations/dialogs/components/ProviderDialogTable/ProviderDialogTableComponents';
import ProviderDialogTableEmpty from '@/views/settings/tabs/Integrations/dialogs/components/ProviderDialogTable/ProviderDialogTableEmpty';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

type BaseTableRow = {
    unique_key: string;
    [key: string]: any;
};

type Props<T extends BaseTableRow> = {
    columns: TableTypes.CustomColumns<T>;
    view: TableTypes.View;
    onRowClick: (name: string, row: T, event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    title: IntlMessageKey;
    tableName: TableTypes.TableProps<T, true>['tableName'];
    selected_view_id: string;
    selected_view: {
        rows: (T & { entityId: string })[];
        total: number;
    };
    selectView: (view_id: string) => void;
    filter_id: string;
    selected_filters: {
        page: number;
        per_page: number;
        search: string;
        order: TableTypes.Order;
        orderBy: string;
    };
    isLoading: boolean;
    isEmpty: boolean;
    views: { viewId: string; name: string }[];
    onClose: () => void;
    provider_name: string;
};

export default function ProviderDialogTable<T extends BaseTableRow>({
    columns,
    view,
    onRowClick,
    title,
    tableName,
    selected_view_id,
    selected_view,
    selectView,
    filter_id,
    selected_filters,
    isLoading,
    isEmpty,
    views,
    onClose,
    provider_name
}: Props<T>) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_filters;

    const updateFilters = useCallback(
        (filters: object) => dispatch(_updateFilters(filter_id, filters)),
        [filter_id]
    );

    const setView = (view_id: string) => {
        selectView(view_id);
    };

    const executeAction = (
        name: string,
        {
            row,
            event
        }: {
            row: T;
            event: React.MouseEvent<HTMLElement, MouseEvent>;
        }
    ) => {
        onRowClick(name, row, event);
    };

    if (isEmpty && !isLoading) {
        return (
            <ProviderDialogTableEmpty
                title={t(title)}
                tableName={tableName}
                onClose={onClose}
                provider_name={provider_name}
            />
        );
    }

    return (
        <ProviderDialogTableComponents.Container>
            <ProviderDialogTableComponents.Header>
                <ProviderDialogTableComponents.Title>
                    {t(title)}
                </ProviderDialogTableComponents.Title>
                <TableViews
                    selectedViewId={selected_view_id}
                    views={views}
                    selectView={setView}
                    isScrollable
                />
                <SearchField
                    filter_id={filter_id}
                    isLoading={isLoading}
                    format_query_parameters={false}
                    highlight_text_in_table={false}
                    style={{
                        marginRight: '30px',
                        marginLeft : '30px'
                    }}
                />
                <ProviderDialogTableComponents.ButtonClose
                    variant="outlined"
                    onClick={onClose}
                >
                    {t('common:button.close')}
                </ProviderDialogTableComponents.ButtonClose>
            </ProviderDialogTableComponents.Header>

            <Table<T, true>
                rows={selected_view.rows}
                columns={columns}
                view={view}
                order={order}
                orderBy={orderBy}
                updateFilters={updateFilters}
                executeAction={executeAction}
                filter_id={filter_id}
                onCreateItem={() => {}}
                tableName={tableName}
                page={page}
                isLoading={false}
                headers={null}
                per_page={per_page}
                rows_total={selected_view.total}
                pagination
                sticky_background_enabled={false}
            />
        </ProviderDialogTableComponents.Container>
    );
}
