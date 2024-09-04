import { useDirectWidthUpdate } from '@/@core/components/table/ColumnWidthAdjust/ColumnWidthAdjustProvider';
import { PageModel_ColumnLayout, PageModel_Header, PageModel_Page } from '@proto/models/model_page';
import PagesGrpcService from '@/@grpcServices/services/pages.service';
import { useMemo } from 'react';
import FieldsGrpcService from '@/@grpcServices/services/fields.service';
import TableTypes from '@/@core/components/table/types';
import createMap from '@/utils/create-map';
import { useStableArray } from '../useStable';

export const useTablePageData = (
    page: keyof typeof PageModel_Page,
    sortableColumnsConfig?: string[]
) => {
    const {
        data,
        isLoading,
        endpointName
    } = PagesGrpcService.endpoints.retrievePage.useQueryState(
        {
            page: PageModel_Page[page]
        }
    );

    const fieldsState = FieldsGrpcService.useGetTableEditorFieldsQuery({
        page: PageModel_Page[page]
    });

    const headers: PageModel_Header[] = useStableArray(data?.headers);

    const views: TableTypes.Views = useMemo(() => {
        if (!data?.views) return [];

        const fieldsMap =
            fieldsState.data?.fields.reduce((acc, field) => {
                acc[field.fieldId] = {
                    ...field,
                    valuesByEntity: createMap(field.values, 'entityId')
                };
                return acc;
            }, {} as Record<string, TableTypes.Field>) || {};

        return data.views.map((view) => ({
            ...view,
            columns: view.columns.map((column) => ({
                ...column,
                page : PageModel_Page[page],
                field: fieldsMap[column.columnId],
                ...(sortableColumnsConfig
                    ? {
                        sortable: sortableColumnsConfig.includes(column.columnId)
                    }
                    : {})
            }))
        }));
    }, [data?.views, fieldsState.data?.fields, page, sortableColumnsConfig]);

    const columns: PageModel_ColumnLayout[] = useStableArray(data?.columns);
    const updateColumnWidth = useDirectWidthUpdate(PagesGrpcService, endpointName, {
        page: PageModel_Page[page]
    });

    return {
        isLoading,
        headers,
        views,
        columns,
        updateColumnWidth
    };
};
