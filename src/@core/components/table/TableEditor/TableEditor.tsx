import Header from '@/@core/components/table/TableEditor/components/Header/Header';
import TableView from '@/@core/components/table/TableEditor/components/TableView/TableView';
import ReorderColumns from '@/@core/components/table/TableEditor/components/ReorderColumns/ReorderColumns';
import TableEditorProvider from '@/@core/components/table/TableEditor/context';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import TableEditorComponents from '@/@core/components/table/TableEditor/TableEditorComponents';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { Fade } from '@mui/material';
import { PageModel_Page } from '@proto/models/model_page';

type Props = {
    page: keyof typeof PageModel_Page;
    view_index: number;
};

export const useTableEditorDialog = hookFabric(TableEditor, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        DialogProps={{
            sx: {
                '& .MuiDialog-container': {
                    position      : 'relative',
                    display       : 'flex',
                    justifyContent: 'center',
                    alignItems    : 'center'
                },
                '.MuiIconButton-root.MuiIconButton-sizeMedium[aria-label="close"]': {
                    top: '8px !important'
                }
            }
        }}
        paperStyle={{
            overflow     : 'hidden',
            width        : '100%',
            maxWidth     : 'min(1500px, 90vw)',
            maxHeight    : 'min(1000px, 90vh)',
            height       : '100%',
            margin       : 0,
            padding      : undefined,
            paddingBottom: undefined
        }}
    />
));

export default function TableEditor({
    page,
    view_index
}: Props) {
    const dialog = useTableEditorDialog(true);
    return (
        <TableEditorProvider
            page={page}
            view_index={view_index}
        >
            <Fade in>
                <TableEditorComponents.Container>
                    <Header confirmDialog={dialog.confirmDialog} />
                    <TableEditorComponents.Wrapper.Content>
                        <TableEditorComponents.Wrapper.TableView>
                            <TableView />
                        </TableEditorComponents.Wrapper.TableView>
                        <TableEditorComponents.Wrapper.Columns>
                            <ReorderColumns />
                        </TableEditorComponents.Wrapper.Columns>
                    </TableEditorComponents.Wrapper.Content>
                </TableEditorComponents.Container>
            </Fade>
        </TableEditorProvider>
    );
}
