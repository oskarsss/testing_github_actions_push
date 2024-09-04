import Avatar from '@mui/material/Avatar';
import TableEditorIcons from '@/@core/components/table/TableEditor/icons';
import Stack from '@mui/material/Stack';
import TableEditorComponents from '@/@core/components/table/TableEditor/TableEditorComponents';
import Tooltip from '@/@core/components/table/TableEditor/components/ReorderColumns/components/Tooltip';
import React from 'react';
import { useTheme } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function HeaderTitle() {
    const { t } = useAppTranslation();
    const { palette } = useTheme();
    return (
        <>
            <Avatar
                sx={{
                    bgcolor: palette.semantic.foreground.brand.secondary,
                    height : '50px',
                    width  : '50px'
                }}
                variant="circular"
            >
                <TableEditorIcons.ManageColumns />
            </Avatar>
            <Stack
                minWidth="250px"
                direction="column"
            >
                <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    gap="10px"
                >
                    <TableEditorComponents.Header.Title>
                        {t('core:table.table_editor.header.title')}
                    </TableEditorComponents.Header.Title>
                    <Tooltip />
                </Stack>
                <TableEditorComponents.Header.SubTitle>
                    {t('core:table.table_editor.header.sub_title')}
                </TableEditorComponents.Header.SubTitle>
            </Stack>
        </>
    );
}
