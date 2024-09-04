import { useMemo } from 'react';
import PagesGrpcService from '@/@grpcServices/services/pages.service';
import {
    PageModel_Page,
    PageModel_Header,
    PageModel_View_Column,
    PageModel_ColumnLayout,
    PageModel_View
} from '@proto/models/model_page';
import { PAGE_FIELD_ENTITY_TYPE } from '@/@core/components/table/TableEditor/table-editor-configs';
import FieldsGrpcService from '@/@grpcServices/services/fields.service';
import { useStableArray } from '@/hooks/useStable';

const stableArray: [] = [];

export function useTableEditorData(page: keyof typeof PageModel_Page) {
    const {
        data,
        isError,
        isLoading
    } = PagesGrpcService.endpoints.retrievePage.useQueryState({
        page: PageModel_Page[page]
    });

    const fieldsState = FieldsGrpcService.useGetTableEditorFieldsQuery({
        page: PageModel_Page[page]
    });

    const fields = useStableArray(fieldsState.data?.fields);

    const memoizedData = useMemo(
        () => ({
            headers: (data ? data.headers : stableArray) as PageModel_Header[],
            columns: (data ? data.columns : stableArray) as PageModel_ColumnLayout[],
            views  : (data ? data.views : stableArray) as PageModel_View[]
        }),
        [data]
    );

    return {
        ...memoizedData,
        entities: PAGE_FIELD_ENTITY_TYPE[PageModel_Page[page]],
        fields,
        isError,
        isLoading
    };
}
