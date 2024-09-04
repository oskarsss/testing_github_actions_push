import {
    useTableEditorContext,
    useTableEditorQueryContext
} from '@/@core/components/table/TableEditor/context';
import { Button, Stack } from '@mui/material';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function ButtonGroup() {
    const { t } = useAppTranslation();
    const {
        selectedViewColumns,
        selectAllColumns,
        deselectAllColumns
    } = useTableEditorContext();

    const { columns } = useTableEditorQueryContext();

    const hasAllColumnsSelected = columns.length === selectedViewColumns.length;
    const hasSelectedColumns = selectedViewColumns.length > 0;

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            mt={3}
        >
            <Button
                variant="outlined"
                color="primary"
                disabled={hasAllColumnsSelected}
                onClick={selectAllColumns}
                aria-label="Select all"
            >
                {t('core:table.table_editor.columns.checkbox.select_all')}
            </Button>

            <Button
                variant="outlined"
                color="primary"
                disabled={!hasSelectedColumns}
                onClick={deselectAllColumns}
                aria-label="Deselect all"
            >
                {t('core:table.table_editor.columns.checkbox.deselect_all')}
            </Button>
        </Stack>
    );
}
