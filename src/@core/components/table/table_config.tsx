import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import { CSSProperties, ReactNode } from 'react';
import TableTypes from '@/@core/components/table/types';
import { Box, Stack, Tooltip } from '@mui/material';
import { PageModel_View_Column_Type } from '@proto/models/model_page';
import { FieldModel_Type } from '@proto/models/model_field';
import RenderField from './RenderField';
import DocumentDataCheckbox from './custom-cells/documents/DocumentDataCheckbox';
import { StyleType } from './custom-cells/documents/utils';
import DocumentAndExpiration from './custom-cells/documents/DocumentAndExpiration';
import DocumentNumber from './custom-cells/documents/DocumentNumber';
import DocumentExpiresData from './custom-cells/documents/DocumentExpiresData';

const checked = <CheckBoxIcon className="checkbox" />;

type TableRowKey = keyof TableTypes.Row;

export const getCheckbox = (value: StyleType) => {
    if (value === 'valid') {
        return checked;
    }
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
};

export const getFunctionalCheckbox = (checked: boolean) => <Checkbox checked={checked} />;

export const common_cell_styles: CSSProperties = {
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center'
};

export const checkbox_style: CSSProperties = {
    padding       : 0,
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'center'
};

const noteIndicatorStyle = {
    position  : 'relative',
    '&::after': {
        // CSS pseudo-element for the dot
        content        : '""',
        position       : 'absolute',
        top            : 0,
        right          : 0,
        width          : '5px',
        height         : '5px',
        borderRadius   : '50%',
        backgroundColor: '#ff096f',
        display        : 'block'
    }
};

export const getRecurringTransaction = (
    view_col: TableTypes.ViewColumn,
    is_category = false
): TableTypes.Cell => {
    const { columnId } = view_col;

    const note = is_category
        ? (`rt_${columnId.replace('_amount', '')}_note` as TableRowKey)
        : (`${columnId.replace('_amount', '')}_note` as TableRowKey);

    return {
        width   : 100,
        sortable: false,
        onClick : (row: TableTypes.Row, {
            executeAction,
            event,
            col
        }: TableTypes.onClickProps) =>
            executeAction('recurring_transaction', {
                event,
                row,
                col
            }),
        getClassName: (row: TableTypes.Row) => {
            if (is_category) {
                return row.recurringTransactions?.[columnId]?.amountStatusClass as ReactNode;
            }
            return row.transactions?.[columnId]?.amountStatusClass as ReactNode;
        },
        style: {
            padding       : '0 15px',
            display       : 'flex',
            flexDirection : 'row',
            alignItems    : 'center',
            justifyContent: 'flex-start',
            borderLeft    : '1px solid #d4d3d524',
            borderRight   : '1px solid #d4d3d524'
        },
        renderCell: (row: TableTypes.Row) => {
            const amountFormatted = is_category
                ? row.recurringTransactions?.[columnId]?.amountFormatted
                : row.transactions?.[columnId]?.amountFormatted;

            if (row.transactions?.[columnId]?.note && row.transactions[columnId].note.length > 0) {
                return (
                    <Tooltip
                        title={row.transactions[columnId].note}
                        placement="top"
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ width: '100%', position: 'relative' }}
                        >
                            <Box sx={{ flexGrow: 1 }}>{amountFormatted as ReactNode}</Box>
                            <Box
                                sx={{
                                    ...noteIndicatorStyle,
                                    position: 'absolute',
                                    right   : '5px' // Adjust this value as needed to align with your design
                                }}
                            />
                        </Stack>
                    </Tooltip>
                );
            }
            return (
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ width: '100%', position: 'relative' }}
                >
                    <Box sx={{ flexGrow: 1 }}>{amountFormatted as ReactNode}</Box>
                </Stack>
            );
        }
    };
};

export const getAmount = (view_col: TableTypes.ViewColumn): TableTypes.Cell => {
    const amount_formatted = `${view_col.columnId}_formatted` as TableRowKey;
    const status_class = `${view_col.columnId}_status_class` as TableRowKey;

    return {
        width   : 100,
        sortable: false,
        onClick : (row: TableTypes.Row, {
            executeAction,
            event
        }: TableTypes.onClickProps) =>
            executeAction('options', {
                row,
                event,
                col: view_col
            }),
        getClassName: (row: TableTypes.Row) => row[status_class] as ReactNode,
        style       : {
            padding       : '0 15px',
            display       : 'flex',
            flexDirection : 'row',
            alignItems    : 'center',
            justifyContent: 'flex-start',
            borderLeft    : '1px solid #d4d3d524',
            borderRight   : '1px solid #d4d3d524'
        },
        renderCell: (row: TableTypes.Row) => row[amount_formatted] as ReactNode
    };
};

export const getDocumentData = (view_col: TableTypes.ViewColumn): TableTypes.Cell => ({
    width   : 65,
    minWidth: 65,
    sortable: false,
    onClick : (row: TableTypes.Row, { executeAction }: TableTypes.onClickProps) =>
        executeAction('document', {
            row,
            document_type_id    : view_col.columnId,
            document_entity_type: view_col.type || '',
            col                 : view_col
        }),
    style: {
        padding: 0
    },

    renderCell: (row: TableTypes.Row, { selected }) => (
        <DocumentDataCheckbox
            selected={selected}
            columnId={view_col.columnId}
            entities={row.entities}
        />
    )
});

export const getDocumentAndExpiration = (view_col: TableTypes.ViewColumn): TableTypes.Cell => ({
    width   : 190,
    sortable: false,
    onClick : (row: TableTypes.Row, { executeAction }: TableTypes.onClickProps) =>
        executeAction('document', {
            row,
            document_type_id    : view_col.columnId,
            document_entity_type: view_col?.type || '',
            col                 : view_col
        }),
    style: {
        padding: 0
    },
    renderCell: (row: TableTypes.Row, { selected }) => (
        <DocumentAndExpiration
            entities={row.entities}
            selected={selected}
            view_col={view_col}
        />
    )
});

export const getDocumentNumberData = (view_col: TableTypes.ViewColumn): TableTypes.Cell => ({
    width   : 150, // 65,
    sortable: false,
    onClick : (row: TableTypes.Row, { executeAction }: TableTypes.onClickProps) =>
        executeAction('document', {
            row,
            document_type_id    : view_col.columnId,
            document_entity_type: view_col.type || '',
            col                 : view_col
        }),
    style: {
        padding: 0
    },
    renderCell: (row: TableTypes.Row, { selected }) => (
        <DocumentNumber
            entities={row.entities}
            selected={selected}
            view_col={view_col}
        />
    )
});

export const getDocumentExpiresData = (view_col: TableTypes.ViewColumn): TableTypes.Cell => ({
    width   : 135,
    sortable: false,
    onClick : (row: TableTypes.Row, { executeAction }: TableTypes.onClickProps) =>
        executeAction('document', {
            row,
            document_type_id    : view_col.columnId,
            document_entity_type: view_col?.type || '',
            col                 : view_col
        }),
    style: {
        padding: 0
    },
    renderCell: (row: TableTypes.Row, { selected }) => (
        <DocumentExpiresData
            entities={row.entities}
            selected={selected}
            view_col={view_col}
        />
    )
});
export const getText = (view_col: TableTypes.ViewColumn): TableTypes.Cell => ({
    width   : view_col.width,
    sortable: typeof view_col.sortable === 'boolean' ? view_col.sortable : true,
    onClick : (row: TableTypes.Row, {
        executeAction,
        event,
        col
    }: TableTypes.onClickProps) =>
        executeAction('edit', {
            row,
            event,
            col
        }),
    style: {
        boxSizing     : 'border-box',
        display       : 'flex',
        flexDirection : 'row',
        alignItems    : 'center',
        justifyContent: 'left'
    },
    renderCell: (row: TableTypes.Row) => (row[view_col?.columnId as TableRowKey] ?? '') as ReactNode
});

export const getField = (view_col: TableTypes.ViewColumn): TableTypes.Cell => ({
    width   : view_col.width,
    sortable: typeof view_col.sortable === 'boolean' ? view_col.sortable : true,
    onClick : (row: TableTypes.Row, {
        executeAction,
        event
    }: TableTypes.onClickProps) =>
        executeAction('select_field', {
            row,
            event,
            col: view_col
        }),
    style: {
        boxSizing     : 'border-box',
        display       : 'flex',
        flexDirection : 'row',
        alignItems    : 'center',
        justifyContent: 'left',
        padding       : '0 15px'
    },
    getCellStyle: (row: TableTypes.Row, { selected }: TableTypes.cellStyleProps) => {
        switch (view_col.field?.type) {
        case FieldModel_Type.FIELD_TYPE_NUMBER:
        case FieldModel_Type.FIELD_TYPE_AMOUNT:
        case FieldModel_Type.FIELD_TYPE_DATE:
        case FieldModel_Type.FIELD_TYPE_TEXT:
            return {
                padding: '0 15px'
            };
        case FieldModel_Type.FIELD_TYPE_SELECT:
            return {
                padding : selected ? 0 : '0 15px', // full width for select
                overflow: 'hidden' // for material select
            };
        case FieldModel_Type.FIELD_TYPE_CHECKBOX:
            return {
                display       : 'flex',
                flexDirection : 'row',
                alignItems    : 'center',
                justifyContent: 'center',
                padding       : selected ? '0 12.5px' : '0 15px', // full width for select
                overflow      : 'hidden' // for material select
            };
        default:
            return {};
        }
    },
    renderCell: (row: TableTypes.Row, {
        selected,
        executeAction
    }: TableTypes.renderCellProps) => {
        if (view_col.field) {
            return (
                <RenderField
                    row={row as TableTypes.Row & { [key: string]: string }}
                    selected={selected}
                    executeAction={executeAction}
                    fieldId={view_col.field.fieldId}
                    value={view_col.field.valuesByEntity[row.entityId || '']?.value || ''}
                    fieldType={view_col.field.type}
                    selectValues={view_col.field.selectValues}
                    page={view_col.page}
                />
            );
        }
        return '';
    }
});

export const getColumn = (
    view_col: TableTypes.ViewColumn,
    custom_columns: TableTypes.CustomColumns
): TableTypes.Cell => {
    let column;
    switch (view_col.type) {
    case PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT:
        column = getDocumentData(view_col);
        break;
    case PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT_NUMBER:
        column = getDocumentNumberData(view_col);
        break;
    case PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT_EXPIRES_AT:
        column = getDocumentExpiresData(view_col);
        break;
    case PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT_AND_EXPIRATION:
        column = getDocumentAndExpiration(view_col);
        break;
    case PageModel_View_Column_Type.COLUMN_TYPE_SETTLEMENT_TRANSACTION_CATEGORY:
        column = getRecurringTransaction(view_col, true);
        break;
    case PageModel_View_Column_Type.COLUMN_TYPE_RECURRING_TRANSACTION:
        column = getRecurringTransaction(view_col);
        break;
    case PageModel_View_Column_Type.COLUMN_TYPE_AMOUNT:
        column = getAmount(view_col);
        break;
    case PageModel_View_Column_Type.COLUMN_TYPE_TEXT:
        column = getText(view_col);
        break;
    case PageModel_View_Column_Type.COLUMN_TYPE_FIELD:
        column = getField(view_col);
        break;
    default:
        // @ts-ignore
        column = custom_columns[view_col.columnId];
        break;
    }

    if (!column) {
        // eslint-disable-next-line no-throw-literal
        column = getText(view_col);
        console.error(`Column ${view_col.columnId} not found, using default text column!!!!`);
    }

    return column;
};
