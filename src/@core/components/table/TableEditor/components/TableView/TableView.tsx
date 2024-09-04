import { useState } from 'react';
import TableEditorIcons from '@/@core/components/table/TableEditor/icons';
import Box from '@mui/material/Box';
import { Options } from '@/@core/ui-kits/basic/common-tabs/CommonTabs';
import Header from './components/Header';
import PageColumns from './components/PageColumns';
import PageHeaders from './components/PageHeaders';
import PageRowHeight from './components/PageRowHight/PageRowHeight';

function Icons(type: 'columns' | 'groups' | 'row_height') {
    return (
        <Box
            sx={{
                svg: {
                    path: {
                        fill: (theme) => theme.palette.semantic.text.primary
                    }
                }
            }}
        >
            {type === 'columns' && <TableEditorIcons.ViewsColumns />}
            {type === 'groups' && <TableEditorIcons.ViewsGroupName />}
            {type === 'row_height' && <TableEditorIcons.ViewsRowHeight />}
        </Box>
    );
}

const views: Options[] = [
    {
        label: 'core:table.table_editor.labels.columns',
        icon : Icons('columns'),
        value: 'columns',
        color: 'inherit'
    },
    {
        label: 'core:table.table_editor.labels.groups',
        icon : Icons('groups'),
        value: 'groups',
        color: 'inherit'
    },
    {
        label: 'core:table.table_editor.labels.row_height',
        icon : Icons('row_height'),
        value: 'row_height',
        color: 'inherit'
    }
];

export default function TableView() {
    const [viewId, setViewId] = useState(views[0].value);

    return (
        <>
            <Header
                views={views}
                viewId={viewId}
                setViewId={setViewId}
            />
            {viewId === views[0].value && <PageColumns />}
            {viewId === views[1].value && <PageHeaders />}

            {viewId === views[2].value && <PageRowHeight />}
        </>
    );
}
