import Stack from '@mui/material/Stack';
import TableEditorIcons from '@/@core/components/table/TableEditor/icons';
import { Typography } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    pinnedColumnsAmount: number;
};

const PinnedColumns = ({ pinnedColumnsAmount }: Props) => {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
        >
            <TableEditorIcons.PinnedColumn />
            <Typography
                variant="subtitle1"
                fontSize="14px"
                fontWeight={500}
            >
                {t('core:table.table_editor.columns.pinned_columns', {
                    amount: pinnedColumnsAmount
                })}
            </Typography>
        </Stack>
    );
};

export default PinnedColumns;
