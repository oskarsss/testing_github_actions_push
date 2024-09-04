/* eslint-disable max-len */

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import { useTableEditorData } from '@/store/table_editor/hook';
import { useActiveDocumentTypes } from '@/store/documents/hooks';
import Skeletons from '@/@core/components/table/TableEditor/components/Skeletons/Skeletons';
import TableTypes from '@/@core/components/table/types';
import { useActiveSettlementTransactionCategory } from '@/store/accounting/settlements/hooks/recurring-transactions';
import { isEqual } from 'lodash';
import Router from 'next/router';
import { SettlementTransactionCategoryModel_Category } from '@proto/models/model_settlement.transaction_category';
import {
    PageModel_ColumnLayout,
    PageModel_Page,
    PageModel_View_Column,
    PageModel_View_Column_Type
} from '@proto/models/model_page';
import { DocumentModel_Type } from '@proto/models/model_document';
import createMap from '@/utils/create-map';
import { FieldGetReply_Field } from '@proto/field';
import { FieldModel_EntityType } from '@proto/models/model_field';
import { FIELD_ENTITY_TYPE_TO_DOCUMENT_ENTITY_TYPE } from '@/@core/components/table/TableEditor/table-editor-configs';

type ContextType = {
    updateCheckedInColumns: (columnId: string, checked: boolean) => void;
    updateSequence: (newColumns: PageModel_View_Column[]) => void;
    selectAllColumns: () => void;
    deselectAllColumns: () => void;
    selectedViewColumns: PageModel_View_Column[];
    updateSelectedViewColumns: (columnId: string, update: Partial<PageModel_View_Column>) => void;
    deleteSelectedViewColumn: (columnId: string) => void;
};

type QueryContext = {
    headers: TableTypes.Header[];
    views: TableTypes.View[];
    entities: FieldModel_EntityType[];
    columns: PageModel_ColumnLayout[];
    columnsMap: Record<string, PageModel_ColumnLayout>;
    documentTypes: DocumentModel_Type[];
    categories: SettlementTransactionCategoryModel_Category[];
    fields: FieldGetReply_Field[];
};

type EditorPropsContext = {
    page: PageModel_Page;
    viewId: number;
    isDirty: boolean;
    setViewId: (id: number) => void;
};

const TableEditorQueryContext = createContext<QueryContext>({
    headers      : [],
    views        : [],
    entities     : [],
    columns      : [],
    columnsMap   : {},
    documentTypes: [],
    categories   : [],
    fields       : []
});

export const useTableEditorQueryContext = () => useContext(TableEditorQueryContext);

export type UpdateColumnDataCallback = ContextType['updateSelectedViewColumns'];

const TableEditorContext = createContext<ContextType>({
    updateCheckedInColumns   : () => {},
    updateSequence           : () => {},
    selectAllColumns         : () => {},
    deselectAllColumns       : () => {},
    selectedViewColumns      : [],
    updateSelectedViewColumns: () => {},
    deleteSelectedViewColumn : () => {}
});

export const useTableEditorContext = () => useContext(TableEditorContext);

const TableEditorPropsContext = createContext<EditorPropsContext>({
    page     : PageModel_Page.UNSPECIFIED,
    viewId   : 0,
    setViewId: () => {},
    isDirty  : false
});

export const useTableEditorPropsContext = () => useContext(TableEditorPropsContext);

type Props = {
    page: keyof typeof PageModel_Page;
    view_index: number;
    children: ReactNode;
};

export default function Context({
    page,
    view_index,
    children
}: Props) {
    const {
        isLoading,
        headers,
        fields,
        views,
        columns,
        entities
    } = useTableEditorData(page);
    const isSettlementsPage = Router.asPath.includes('settlements');

    const { documentTypes } = useActiveDocumentTypes();
    const { categories } = useActiveSettlementTransactionCategory();

    const [viewId, setViewId] = useState(view_index);

    const [selectedViewColumns, setSelectedViewColumns] = useState<PageModel_View_Column[]>(
        views[viewId]?.columns || []
    );

    const selectedView = useMemo(() => views[viewId], [views, viewId]);

    useEffect(() => {
        setSelectedViewColumns(selectedView?.columns || []);
    }, [selectedView]);

    const isDirty = useMemo(
        () => !isEqual(selectedViewColumns, views[viewId]?.columns),
        [selectedViewColumns, views, viewId]
    );

    const updateSelectedViewColumns = useCallback(
        (columnId: string, update: Partial<PageModel_View_Column>) => {
            setSelectedViewColumns((prev) =>
                prev.map((item) => (item.columnId === columnId ? { ...item, ...update } : item)));
        },
        []
    );

    const deleteSelectedViewColumn = useCallback((columnId: string) => {
        setSelectedViewColumns((prev) => prev.filter((item) => item.columnId !== columnId));
    }, []);

    const selectAllColumns = useCallback(() => {
        const defaultColumn = PageModel_View_Column.create();
        defaultColumn.width = 100;
        setSelectedViewColumns((prev) => {
            const prevColumns = [...prev];
            const prevColumnsMap = createMap(prevColumns, 'columnId');
            columns.forEach((column) => {
                if (column.columnId in prevColumnsMap) return;
                prevColumns.push({
                    ...defaultColumn,
                    ...column,
                    friendlyName: column.name,
                    footerTotal : false // TODO: fix this need data from backend
                });
            });
            entities.forEach((entity) => {
                documentTypes.forEach((documentType) => {
                    if (documentType.documentTypeId in prevColumnsMap) return;
                    if (
                        documentType.entityType ===
                        FIELD_ENTITY_TYPE_TO_DOCUMENT_ENTITY_TYPE[entity]
                    ) {
                        prevColumns.push({
                            ...defaultColumn,
                            columnId    : documentType.documentTypeId,
                            name        : documentType.title,
                            type        : PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT,
                            friendlyName: documentType.title
                        });
                    }
                });
            });

            if (isSettlementsPage) {
                categories.forEach((category) => {
                    if (category.transactionCategoryId in prevColumnsMap) return;
                    prevColumns.push({
                        ...defaultColumn,
                        columnId    : category.transactionCategoryId,
                        name        : category.name,
                        friendlyName: category.name,
                        type        : PageModel_View_Column_Type.COLUMN_TYPE_SETTLEMENT_TRANSACTION_CATEGORY
                    });
                });
            }

            fields.forEach((field) => {
                if (field.fieldId in prevColumnsMap) return;
                prevColumns.push({
                    ...defaultColumn,
                    columnId    : field.fieldId,
                    name        : field.name,
                    friendlyName: field.name,
                    type        : PageModel_View_Column_Type.COLUMN_TYPE_FIELD
                });
            });

            return prevColumns.map((column, index) => ({
                ...column,
                sequence: index + 1
            }));
        });
    }, [categories, columns, documentTypes, entities, fields, isSettlementsPage]);

    const deselectAllColumns = useCallback(() => {
        setSelectedViewColumns([]);
    }, []);

    const updateCheckedInColumns = useCallback(
        (columnId: string, checked: boolean) => {
            const defaultColumn = PageModel_View_Column.create();
            defaultColumn.width = 100;
            setSelectedViewColumns((prev) => {
                if (!checked) {
                    return prev.filter((item) => item.columnId !== columnId);
                }
                const column = selectedView?.columns.find((column) => column.columnId === columnId);
                if (column) {
                    return [
                        ...prev,
                        {
                            ...column,
                            sequence: prev.length + 1
                        }
                    ];
                }

                const columnsSelected = columns.find((column) => column.columnId === columnId);
                if (columnsSelected) {
                    return [
                        ...prev,
                        {
                            ...defaultColumn,
                            ...columnsSelected,
                            friendlyName: columnsSelected.name,
                            sequence    : prev.length + 1,
                            footerTotal : false // TODO: fix this need data from backend
                        }
                    ];
                }

                const document = documentTypes.find(
                    (documentType) => documentType.documentTypeId === columnId
                );

                if (document) {
                    return [
                        ...prev,
                        {
                            ...defaultColumn,
                            columnId    : document.documentTypeId,
                            name        : document.title,
                            type        : PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT,
                            friendlyName: document.title,
                            sequence    : prev.length + 1
                        }
                    ];
                }

                const field = fields.find((field) => field.fieldId === columnId);
                if (field) {
                    return [
                        ...prev,
                        {
                            ...defaultColumn,
                            columnId    : field.fieldId,
                            name        : field.name,
                            type        : PageModel_View_Column_Type.COLUMN_TYPE_FIELD,
                            friendlyName: field.name,
                            sequence    : prev.length + 1
                        }
                    ];
                }

                if (isSettlementsPage) {
                    const category = categories.find(
                        (category) => category.transactionCategoryId === columnId
                    );

                    if (category) {
                        return [
                            ...prev,
                            {
                                ...defaultColumn,
                                columnId    : category.transactionCategoryId,
                                name        : category.name,
                                friendlyName: category.name,
                                sequence    : prev.length + 1,
                                type        : PageModel_View_Column_Type.COLUMN_TYPE_SETTLEMENT_TRANSACTION_CATEGORY
                            }
                        ];
                    }
                }

                return prev;
            });
        },
        [categories, columns, documentTypes, fields, isSettlementsPage, selectedView?.columns]
    );

    const updateSequence: ContextType['updateSequence'] = useCallback((newColumns = []) => {
        setSelectedViewColumns(newColumns);
    }, []);

    const queryContextValue = useMemo(
        () => ({
            views,
            headers,
            entities,
            columns,
            documentTypes,
            categories,
            fields,
            columnsMap: createMap(columns, 'columnId')
        }),
        [views, headers, entities, columns, documentTypes, categories, fields]
    );

    const propsContext: EditorPropsContext = useMemo(
        () => ({ viewId, page: PageModel_Page[page], setViewId, isDirty }),
        [viewId, page, isDirty]
    );

    const editorContextValue = useMemo(
        () => ({
            updateCheckedInColumns,
            updateSequence,
            selectAllColumns,
            deselectAllColumns,
            selectedViewColumns,
            updateSelectedViewColumns,
            deleteSelectedViewColumn
        }),
        [
            updateCheckedInColumns,
            updateSequence,
            selectAllColumns,
            deselectAllColumns,
            selectedViewColumns,
            updateSelectedViewColumns,
            deleteSelectedViewColumn
        ]
    );

    return (
        <TableEditorPropsContext.Provider value={propsContext}>
            <TableEditorQueryContext.Provider value={queryContextValue}>
                <TableEditorContext.Provider value={editorContextValue}>
                    {isLoading ? <Skeletons /> : children}
                </TableEditorContext.Provider>
            </TableEditorQueryContext.Provider>
        </TableEditorPropsContext.Provider>
    );
}
