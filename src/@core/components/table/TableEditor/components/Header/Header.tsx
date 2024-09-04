import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import {
    useTableEditorContext,
    useTableEditorPropsContext,
    useTableEditorQueryContext
} from '@/@core/components/table/TableEditor/context';
import { useViewDialog } from '@/@core/components/table/TableEditor/menus/ViewMenus/ViewDialog';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { DialogContextConfirmDialog } from '@/utils/dialog-hook-fabric';
import HeaderTitle from '@/@core/components/table/TableEditor/components/Header/HeaderTitle';
import PagesGrpcService from '@/@grpcServices/services/pages.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import HeaderTabs from './HeaderTabs';

type Props = {
    confirmDialog: DialogContextConfirmDialog;
};

export default function HeaderComponent({ confirmDialog }: Props) {
    const { t } = useAppTranslation();
    const theme = useTheme();
    const [updateMultipleColumns] = PagesGrpcService.useUpdateColumnBatchMutation();
    const { selectedViewColumns } = useTableEditorContext();
    const viewDialog = useViewDialog();
    const {
        page,
        viewId,
        isDirty
    } = useTableEditorPropsContext();
    const { views } = useTableEditorQueryContext();

    useEffect(() => {
        if (isDirty) {
            confirmDialog.enable();
        } else {
            confirmDialog.disable();
        }
    }, [isDirty]);

    const openViewMenu = () => {
        viewDialog.open({
            mode: 'add',
            page
        });
    };

    const submitChanges = () => {
        updateMultipleColumns({
            page,
            viewId : views[viewId].viewId,
            columns: selectedViewColumns
        });
    };

    return (
        <Box
            sx={{
                borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`,
                width       : '100%'
            }}
        >
            <PageHeadersKit.Header
                style={{ padding: '0', height: 'min-content' }}
                topLeft={(
                    <>
                        <HeaderTitle />
                        <HeaderTabs />
                    </>
                )}
                topRight={(
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<AddIcon />}
                            onClick={openViewMenu}
                            sx={{
                                paddingX: '35px !important'
                            }}
                        >
                            {t('common:button.add')}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<SaveIcon />}
                            disabled={!isDirty}
                            onClick={submitChanges}
                            sx={{ width: 'max-content' }}
                        >
                            {t('core:table.table_editor.header.buttons.save_changes')}
                        </Button>
                    </>
                )}
            />
        </Box>
    );
}
