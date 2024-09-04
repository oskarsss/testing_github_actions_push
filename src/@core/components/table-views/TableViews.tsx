/* eslint-disable no-nested-ternary */
import React, { memo, ReactElement, useMemo } from 'react';
import Box from '@mui/material/Box';
import { IconButton, TabProps } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { applyTestId } from '@/configs/tests';
import ViewsSkeleton from '@/@core/components/table-views/TableViewsSkeleton';
import PageTab from '@/@core/ui-kits/basic/page-tabs/PageTab';
import PageTabs, { PageTabsChangeAction } from '@/@core/ui-kits/basic/page-tabs/PageTabs';
import { PageModel_Page } from '@proto/models/model_page';
import { useTableEditorDialog } from '../table/TableEditor/TableEditor';

export type ViewItem = { viewId: string; name: string; icon?: ReactElement | string };

type Props = {
    selectedViewId: string;
    views: ViewItem[];
    selectView: (view_id: string) => void;
    isScrollable?: boolean;
    isLoading?: boolean;
    hideBorder?: boolean;
    iconPosition?: TabProps['iconPosition'];
    showScrollBar?: boolean;
    page?: keyof typeof PageModel_Page;
};

function TableViews({
    selectedViewId,
    views,
    selectView,
    isScrollable,
    isLoading,
    hideBorder = false,
    iconPosition,
    showScrollBar = false,
    page
}: Props) {
    const tableEditorDialog = useTableEditorDialog();

    const current_index = useMemo(() => {
        const idx = views.findIndex((view) => view.viewId === selectedViewId);
        if (idx > -1) {
            return idx;
        }
        return 0;
    }, [views, selectedViewId]);

    const handleChange: PageTabsChangeAction<number> = (_, newValue) => {
        selectView(views[newValue].viewId || '');
    };

    const editView = (_: React.MouseEvent<HTMLButtonElement>, v_index: number, view: ViewItem) => {
        if (!page) return;
        tableEditorDialog.open({
            page,
            view_index: v_index
        });
    };
    return (
        <PageTabs
            value={current_index}
            isScrollable={isScrollable}
            onChange={handleChange}
            hideBorder={hideBorder}
            showScrollBar={showScrollBar}
        >
            {isLoading ? (
                <ViewsSkeleton />
            ) : (
                views.map((view, index) => (
                    <PageTab
                        icon={
                            page ? (
                                <IconButton
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        event.preventDefault();
                                        editView(event, index, view);
                                    }}
                                    sx={{ zIndex: 1000 }}
                                >
                                    <ArrowDropDownIcon
                                        color="secondary"
                                        fontSize="medium"
                                    />
                                </IconButton>
                            ) : view.icon && iconPosition ? (
                                view.icon
                            ) : (
                                ''
                            )
                        }
                        iconExist={!!page || !!iconPosition}
                        iconPosition={page ? 'end' : iconPosition}
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
                ))
            )}
        </PageTabs>
    );
}

export default memo(TableViews);
