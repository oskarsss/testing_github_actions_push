import { Button, IconButton, Stack, useTheme } from '@mui/material';
import { MouseEvent } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    useTableEditorContext,
    useTableEditorPropsContext,
    useTableEditorQueryContext
} from '@/@core/components/table/TableEditor/context';
import TableEditorComponents from '@/@core/components/table/TableEditor/TableEditorComponents';
import { useGroupNameMenu } from '@/@core/components/table/TableEditor/menus/GroupNameMenu/GroupNameMenu';
import AddIcon from '@mui/icons-material/Add';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getColorScheme } from '@/@core/components/table/TableHeadlineCell';
import TableTypes from '@/@core/components/table/types';
import PagesGrpcService from '@/@grpcServices/services/pages.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function PageHeaders() {
    const { t } = useAppTranslation();
    const groupNameMenu = useGroupNameMenu();
    const { selectedViewColumns } = useTableEditorContext();
    const { page } = useTableEditorPropsContext();
    const { headers } = useTableEditorQueryContext();
    const [deleteHeader] = PagesGrpcService.useDeletePageHeaderMutation();
    const { palette } = useTheme();
    const onClickDeleteGroup = (header: TableTypes.Header) => {
        deleteHeader({
            page,
            headerId: header.headerId
        });
    };
    const openGroupNameMenu = (event: MouseEvent<HTMLElement>, header?: TableTypes.Header) => {
        groupNameMenu.open({
            header,
            page
        })(event);
    };

    const colorSchema = getColorScheme(palette);

    return (
        <TableEditorComponents.PinnedPaper
            is_unpinned={false}
            sx={{
                marginTop      : '20px',
                overflow       : 'hidden',
                pr             : 0,
                pb             : 0,
                display        : 'flex',
                flexDirection  : 'column',
                gap            : '16px',
                backgroundColor: (theme) => theme.palette.semantic.foreground.white.primary
            }}
            elevation={0}
        >
            <Stack
                spacing={2}
                direction="row"
                paddingRight="16px"
            >
                <Stack flex="2 1 0">{t('core:table.table_editor.columns.group_name')}</Stack>
                <Stack flex="2 1 0">{t('core:table.table_editor.columns.controls')}</Stack>

                <Stack flex="1 1 0">
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={openGroupNameMenu}
                        sx={{ width: 'max-content', height: 'min-content' }}
                    >
                        {t('common:button.add')}
                    </Button>
                </Stack>
            </Stack>
            <PerfectScrollbar
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false
                }}
                style={{ width: '100%', paddingRight: '16px' }}
            >
                {headers.map((header) => (
                    <Stack
                        key={header.headerId}
                        spacing={2}
                        direction="row"
                        marginBottom="4px"
                    >
                        <Stack
                            flex="2 1 0"
                            justifyContent="center"
                        >
                            <TableEditorComponents.ItemStack
                                px={2}
                                spacing={2}
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{
                                    backgroundColor: (theme) =>
                                        colorSchema[header.color]?.[theme.palette.mode],
                                    color: (theme) =>
                                        colorSchema[header.color]?.[`text_${theme.palette.mode}`]
                                }}
                            >
                                {header.name}
                            </TableEditorComponents.ItemStack>
                        </Stack>
                        <Stack
                            flex="2 1 0"
                            justifyContent="center"
                        >
                            <TableEditorComponents.GroupItemStack>
                                {t('core:table.table_editor.columns.used_in', {
                                    count:
                                        selectedViewColumns &&
                                        selectedViewColumns.filter(
                                            (column) => column.headerId === header.headerId
                                        ).length
                                })}
                            </TableEditorComponents.GroupItemStack>
                        </Stack>
                        <Stack
                            flex="1 1 0"
                            spacing={1}
                            direction="row"
                        >
                            <TableEditorComponents.GroupItemStack>
                                <IconButton
                                    size="medium"
                                    onClick={(event) => openGroupNameMenu(event, header)}
                                >
                                    <ModeEditIcon
                                        fontSize="medium"
                                        sx={{ color: '#99A4B0' }}
                                    />
                                </IconButton>
                            </TableEditorComponents.GroupItemStack>

                            <TableEditorComponents.GroupItemStack>
                                <IconButton
                                    size="medium"
                                    onClick={() => onClickDeleteGroup(header)}
                                >
                                    <DeleteIcon
                                        fontSize="medium"
                                        sx={{ color: '#99A4B0' }}
                                    />
                                </IconButton>
                            </TableEditorComponents.GroupItemStack>
                        </Stack>
                    </Stack>
                ))}
            </PerfectScrollbar>
        </TableEditorComponents.PinnedPaper>
    );
}
