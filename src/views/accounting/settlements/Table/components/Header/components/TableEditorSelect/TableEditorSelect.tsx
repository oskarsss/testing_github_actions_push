import { useTableEditorDialog } from '@/@core/components/table/TableEditor/TableEditor';
import { useSettlementsViews } from '@/store/accounting/settlements/hooks/settlements';
import SettlementsIcons from '@/views/accounting/settlements/Icons';
import { IconButton, InputLabel, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect, useMemo, MouseEvent, KeyboardEvent } from 'react';
import TableEditorIcons from '@/@core/components/table/TableEditor/icons';
import OutlinedInput from '@mui/material/OutlinedInput';
import TableEditorSelectStyled from '@/views/accounting/settlements/Table/components/Header/components/TableEditorSelect/styled';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TableTypes from '@/@core/components/table/types';

export default function TableEditorSelect() {
    const tableEditorDialog = useTableEditorDialog();
    const { t } = useAppTranslation();
    const {
        views,
        selected_view_id,
        selectView
    } = useSettlementsViews();

    useEffect(() => {
        if (views.length > 0 && !selected_view_id) {
            selectView(views[0].viewId);
        }
        let selectedViewExists = false;
        views.forEach((view) => {
            if (view.viewId === selected_view_id) {
                selectedViewExists = true;
            }
        });
        if (!selectedViewExists && views.length > 0) {
            selectView(views[0].viewId);
        }
    }, [selected_view_id, views, selectView]);

    const selectedView = useMemo(
        () => views.find((view) => view.viewId === selected_view_id),
        [views, selected_view_id]
    );
    const handleClickEditView = (
        event: MouseEvent<HTMLButtonElement>,
        v_index: number,
        view: TableTypes.View
    ) => {
        tableEditorDialog.open({
            page      : 'SETTLEMENTS',
            view_index: v_index
        });
    };

    const handleChange = (e: SelectChangeEvent<unknown>) => {
        selectView(e.target.value as string);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Tab') {
            e.stopPropagation();
            e.preventDefault();
        }
    };

    const renderInput = () => (
        <OutlinedInput
            label={t('common:views')}
            size="small"
            startAdornment={(
                <TableEditorSelectStyled.Box>
                    <TableEditorIcons.ManageColumns />
                </TableEditorSelectStyled.Box>
            )}
            endAdornment={(
                <Tooltip
                    disableInteractive
                    title={t('settlements:header.tooltips.edit_table_view')}
                >
                    <TableEditorSelectStyled.IconButtonWrapper>
                        <IconButton
                            onClick={(event: any) => {
                                event.stopPropagation();
                                const index = views.findIndex(
                                    (view) => view.viewId === selectedView?.viewId
                                );
                                if (index === -1 || !selectedView) return;

                                handleClickEditView(event, index, selectedView);
                            }}
                            size="small"
                        >
                            <SettlementsIcons.Edit />
                        </IconButton>
                    </TableEditorSelectStyled.IconButtonWrapper>
                </Tooltip>
            )}
        />
    );

    const renderMenuItems = () =>
        views.map((view) => (
            <TableEditorSelectStyled.MenuItem
                value={view.viewId}
                key={view.viewId}
            >
                <Stack
                    direction="row"
                    flexDirection="column"
                >
                    <Typography
                        variant="body1"
                        fontSize="16px"
                    >
                        {view.name}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                >
                    <Tooltip
                        disableInteractive
                        title={t('settlements:header.tooltips.edit_view')}
                    >
                        <IconButton
                            onClick={(event: any) => {
                                event.stopPropagation();
                                const index = views.findIndex((v) => view.viewId === v.viewId);

                                handleClickEditView(event, index, view);
                            }}
                            size="small"
                        >
                            <SettlementsIcons.Edit />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </TableEditorSelectStyled.MenuItem>
        ));

    const renderValue = () => (
        <Typography>
            {selectedView ? selectedView.name : t('settlements:header.please_select')}
        </Typography>
    );

    return (
        <TableEditorSelectStyled.FormControl>
            <InputLabel id="views-select-label">{t('common:views')}</InputLabel>
            <Select
                labelId="views-select-label"
                value={selectedView ? selectedView.viewId : ''}
                label={t('common:views')}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                input={renderInput()}
                renderValue={renderValue}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            '.MuiList-root': {
                                padding: !views ? '8px 0' : '0'
                            }
                        }
                    }
                }}
            >
                {renderMenuItems()}
            </Select>
        </TableEditorSelectStyled.FormControl>
    );
}
