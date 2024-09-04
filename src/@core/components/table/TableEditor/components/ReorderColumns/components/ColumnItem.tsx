import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { FormControl, IconButton, MenuItem, Tooltip, Typography } from '@mui/material';
import TableEditorIcons from '@/@core/components/table/TableEditor/icons';
import CloseIcon from '@mui/icons-material/Close';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@/@core/components/table/TableEditor/reused-components/Checkbox';
import { memo, MouseEvent, ReactNode, useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useGroupNameMenu } from '@/@core/components/table/TableEditor/menus/GroupNameMenu/GroupNameMenu';
import { useTheme } from '@mui/material/styles';
import TableTypes from '@/@core/components/table/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { type IntlMessageKey, TFunction } from '@/@types/next-intl';
import { PageModel_View_Column, PageModel_View_Column_Type } from '@proto/models/model_page';
import {
    UpdateColumnDataCallback,
    useTableEditorPropsContext,
    useTableEditorQueryContext
} from '../../../context';

const SelectInputSX = {
    padding   : '0 0 0 10px !important',
    height    : '100% !important',
    display   : 'flex !important',
    alignItems: 'center !important'
};

type EditColumnGroupNameProps = {
    onClickOpen: (event: MouseEvent<HTMLElement>) => void;
};

const EditColumnGroupName = ({ onClickOpen }: EditColumnGroupNameProps) => (
    <IconButton
        onClick={onClickOpen}
        size="small"
    >
        <AddCircleOutlineIcon
            fontSize="small"
            color="primary"
        />
    </IconButton>
);

const documentTypes = [
    PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT,
    PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT_NUMBER,
    PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT_EXPIRES_AT,
    PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT_AND_EXPIRATION
];

const translateColumnType: Record<PageModel_View_Column_Type, IntlMessageKey> = {
    [PageModel_View_Column_Type.COLUMN_TYPE_TEXT]  : 'core:table.table_editor.columns.text',
    [PageModel_View_Column_Type.COLUMN_TYPE_AMOUNT]: 'core:table.table_editor.columns.amount',
    [PageModel_View_Column_Type.COLUMN_TYPE_SETTLEMENT_TRANSACTION_CATEGORY]:
        'core:table.table_editor.columns.recurring_transaction',
    [PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM]  : 'core:table.table_editor.columns.custom',
    [PageModel_View_Column_Type.COLUMN_TYPE_FIELD]   : 'core:table.table_editor.columns.field',
    [PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT]: 'core:table.table_editor.columns.document',
    [PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT_NUMBER]:
        'core:table.table_editor.columns.doc_number',
    [PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT_EXPIRES_AT]:
        'core:table.table_editor.columns.doc_expiration',
    [PageModel_View_Column_Type.COLUMN_TYPE_DOCUMENT_AND_EXPIRATION]:
        'core:table.table_editor.columns.doc_and_expiration',
    [PageModel_View_Column_Type.COLUMN_TYPE_UNSPECIFIED]          : '',
    [PageModel_View_Column_Type.COLUMN_TYPE_RECURRING_TRANSACTION]: '-'
};

interface Props extends PageModel_View_Column {
    children: ReactNode;
    updateColumnData: UpdateColumnDataCallback;
    deleteSelectedViewColumn: (columnId: string) => void;
}

const ColumnItem = ({
    children,
    updateColumnData,
    deleteSelectedViewColumn,
    ...col
}: Props) => {
    const { t } = useAppTranslation();
    const groupNameMenu = useGroupNameMenu();
    const theme = useTheme();
    const { page } = useTableEditorPropsContext();
    const {
        headers,
        columnsMap
    } = useTableEditorQueryContext();
    const group_name_options = headers.map((header) => ({
        value: header.headerId,
        label: header.name
    }));

    const is_calculate_total = columnsMap[col.columnId]?.total;

    const [groupNameValue, setGroupNameValue] = useState(col.headerId || '0');
    const [type, setType] = useState(col.type);

    const openGroupNameMenu = (event: MouseEvent<HTMLElement>, header?: TableTypes.Header) => {
        groupNameMenu.open({
            header,
            page,
            onSuccessFullCreate: (headerId) => {
                setGroupNameValue(headerId);
                updateColumnData(col.columnId, { headerId });
            }
        })(event);
    };
    const onChangeGroupName = (e: SelectChangeEvent<HTMLInputElement>) => {
        setGroupNameValue(e.target.value as string);

        updateColumnData(col.columnId, { headerId: e.target.value as string });
    };

    const onChangeType = ({ target: { value } }: SelectChangeEvent<HTMLInputElement>) => {
        setType(Number(value) as PageModel_View_Column_Type);

        updateColumnData(col.columnId, { type: Number(value) as PageModel_View_Column_Type });
    };

    const onChangeBorderLeft = (unique_key: string, checked: boolean) => {
        updateColumnData(col.columnId, { borderLeft: checked });
    };
    const onChangeBorderRight = (unique_key: string, checked: boolean) => {
        updateColumnData(col.columnId, { borderRight: checked });
    };

    const onChangeFooter = (unique_key: string, checked: boolean) => {
        if (!is_calculate_total) return;
        updateColumnData(col.columnId, { footerTotal: checked });
    };

    const onClickRemoveColumn = () => {
        deleteSelectedViewColumn(col.columnId);
    };

    if (!col) return null;

    return (
        <Grid
            container
            spacing={1}
            alignItems="center"
        >
            <Grid
                item
                xs={3.2}
            >
                <Stack
                    px={2}
                    spacing={2}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        height      : '36px',
                        border      : `1px solid ${theme.palette.semantic.border.secondary}`,
                        borderRadius: '4px'
                    }}
                >
                    {children}

                    <Typography
                        sx={{ px: 1 }}
                        width="100%"
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                    >
                        {col.friendlyName}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={onClickRemoveColumn}
                    >
                        <CloseIcon color="secondary" />
                    </IconButton>
                </Stack>
            </Grid>

            <Grid
                item
                xs={2.9}
            >
                <FormControl fullWidth>
                    <Select
                        sx={{
                            height               : '36px',
                            '&.MuiInputBase-root': {
                                alignItems  : 'center',
                                border      : `1px solid ${theme.palette.semantic.border.secondary}`,
                                borderRadius: '4px'
                            }
                        }}
                        // eslint-disable-next-line max-len,react/no-unstable-nested-components
                        inputProps={{
                            sx: SelectInputSX
                        }}
                        disableUnderline
                        variant="standard"
                        size="small"
                        value={type as unknown as HTMLInputElement}
                        onChange={onChangeType}
                        disabled={!documentTypes.includes(type)}
                    >
                        {documentTypes.includes(type) ? (
                            documentTypes.map((documentType) => (
                                <MenuItem
                                    key={documentType}
                                    value={documentType}
                                >
                                    {t(translateColumnType[documentType])}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value={type}>{t(translateColumnType[type])}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>

            <Grid
                item
                xs={2.9}
            >
                <FormControl fullWidth>
                    <Select
                        sx={{
                            height               : '36px',
                            '&.MuiInputBase-root': {
                                alignItems  : 'center',
                                border      : `1px solid ${theme.palette.semantic.border.secondary}`,
                                borderRadius: '4px'
                            }
                        }}
                        // eslint-disable-next-line max-len,react/no-unstable-nested-components
                        IconComponent={() => (
                            <EditColumnGroupName onClickOpen={openGroupNameMenu} />
                        )}
                        inputProps={{
                            sx: SelectInputSX
                        }}
                        disableUnderline
                        variant="standard"
                        size="small"
                        value={groupNameValue as unknown as HTMLInputElement}
                        onChange={onChangeGroupName}
                    >
                        <MenuItem value="0">
                            {t('core:table.table_editor.columns.not_grouped')}
                        </MenuItem>
                        {group_name_options.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Tooltip
                title="Border Left"
                disableInteractive
            >
                <Grid
                    item
                    xs={1}
                >
                    <Checkbox
                        height="36px"
                        isChecked={col.borderLeft}
                        unique_key={col.columnId}
                        onChange={onChangeBorderLeft}
                        icon={<TableEditorIcons.BorderLeftUnselected />}
                        checkedIcon={<TableEditorIcons.BorderLeftSelected />}
                    />
                </Grid>
            </Tooltip>

            <Tooltip
                title="Border Right"
                disableInteractive
            >
                <Grid
                    item
                    xs={1}
                >
                    <Checkbox
                        height="36px"
                        isChecked={col.borderRight}
                        unique_key={col.columnId}
                        onChange={onChangeBorderRight}
                        icon={<TableEditorIcons.BorderRightUnselected />}
                        checkedIcon={<TableEditorIcons.BorderRightSelected />}
                    />
                </Grid>
            </Tooltip>

            <Tooltip
                title={
                    is_calculate_total
                        ? t('core:table.table_editor.columns.tooltips.show_total')
                        : t('core:table.table_editor.columns.tooltips.total_not_supported')
                }
                disableInteractive
            >
                <Grid
                    item
                    xs={1}
                    sx={{
                        svg: {
                            path: {
                                fill  : ({ palette }) => (palette.mode === 'light' ? '' : 'white'),
                                stroke: ({ palette }) => (palette.mode === 'light' ? '' : 'white')
                            }
                        }
                    }}
                >
                    <Checkbox
                        height="36px"
                        disabled={!is_calculate_total}
                        isChecked={col.footerTotal}
                        unique_key={col.columnId}
                        onChange={onChangeFooter}
                        icon={<TableEditorIcons.TotalUnselected />}
                        checkedIcon={<TableEditorIcons.TotalSelected />}
                    />
                </Grid>
            </Tooltip>
        </Grid>
    );
};

export default memo(ColumnItem);
