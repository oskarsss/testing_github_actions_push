import PageTabs, { PageTabsChangeAction } from '@/@core/ui-kits/basic/page-tabs/PageTabs';
import { Box, IconButton } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PageTab from '@/@core/ui-kits/basic/page-tabs/PageTab';
import {
    useTableEditorContext,
    useTableEditorPropsContext,
    useTableEditorQueryContext
} from '@/@core/components/table/TableEditor/context';
import TableTypes from '@/@core/components/table/types';
import { useViewSubMenus } from '@/@core/components/table/TableEditor/menus/ViewMenus/ViewSubMenus';
import { useConfirm } from '@/@core/components/confirm-dialog';
import PagesGrpcService from '@/@grpcServices/services/pages.service';

function HeaderTabs() {
    const viewMenu = useViewSubMenus();
    const confirm = useConfirm();

    const [updateMultipleColumns] = PagesGrpcService.useUpdateColumnBatchMutation();

    const {
        page,
        viewId,
        setViewId,
        isDirty
    } = useTableEditorPropsContext();

    const { views } = useTableEditorQueryContext();
    const { selectedViewColumns } = useTableEditorContext();

    const selectedViewId = views[viewId]?.viewId || '';

    const submitChanges = () => {
        updateMultipleColumns({
            page,
            viewId : views[viewId].viewId,
            columns: selectedViewColumns
        });
    };

    const selectView = (view_index: number) => {
        if (!isDirty) {
            setViewId(view_index);
        } else {
            confirm({
                title       : 'core:table.table_editor.confirm.change_view.title',
                body        : 'core:table.table_editor.confirm.change_view.body',
                confirm_text: 'common:button.save',
                onConfirm   : () => {
                    submitChanges();
                    setViewId(view_index);
                },
                onCancel: () => setViewId(view_index)
            });
        }
    };

    const selectViewId = (view_id: string) => {
        const id = views.findIndex((view) => view.viewId === view_id);
        selectView(id);
    };

    const updateView = (
        event: React.MouseEvent<unknown>,
        view: Omit<TableTypes.View, 'columns' | 'row_height' | 'page'>
    ) => {
        viewMenu.open({
            page,
            view          : views.find((v) => v.viewId === view.viewId),
            selectLastItem: () => setTimeout(() => selectView(views.length), 1000)
        })(event as React.MouseEvent<HTMLElement>);
    };

    const current_index = useMemo(() => {
        const idx = views.findIndex((view) => view.viewId === selectedViewId);
        if (idx > -1) {
            return idx;
        }
        if (views.length > 0) {
            const indexView = views.findIndex((view) => view.viewId === views[0].viewId);
            if (indexView > -1) {
                setViewId(indexView);
            }
        }
        return 0;
    }, [views, selectedViewId]);

    useEffect(() => {
        const current_view = current_index > -1 ? views[current_index] : null;

        if (!current_view) {
            if (views.length > 0) {
                selectViewId(views[0].viewId);
            }
        }
    }, []);

    const handleChange: PageTabsChangeAction<number> = (_, newValue) => {
        selectViewId(views[newValue].viewId);
    };

    return (
        <PageTabs
            value={current_index}
            isScrollable
            onChange={handleChange}
            hideBorder
        >
            {views.map((view) => (
                <PageTab
                    icon={(
                        <IconButton
                            onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                updateView(event, view);
                            }}
                            sx={{ zIndex: 1000 }}
                        >
                            <ArrowDropDownIcon fontSize="medium" />
                        </IconButton>
                    )}
                    iconExist={'icon' in view}
                    iconPosition={page ? 'end' : 'start'}
                    key={view.viewId}
                    label={(
                        <Box
                            component="span"
                            overflow="hidden"
                            textOverflow="ellipsis"
                        >
                            {view.name}
                        </Box>
                    )}
                    id={view.viewId}
                    style={{ fontWeight: 700 }}
                />
            ))}
        </PageTabs>
    );
}

export default HeaderTabs;
