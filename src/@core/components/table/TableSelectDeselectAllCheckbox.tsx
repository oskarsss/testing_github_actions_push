import { memo, useCallback, useMemo } from 'react';
import { Checkbox, Tooltip, Box } from '@mui/material';
import { TableActions } from '@/store/table/slice';
import { useAppDispatch } from '@/store/hooks';
import { useSelectedTableIds } from '@/store/table/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    tableName: string;
    idsList: string[];
};

function TableSelectDeselectAllCheckbox({
    tableName,
    idsList
}: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();
    const selectedTableIds = useSelectedTableIds(tableName);

    const hasSelectedIds = useMemo(
        () => idsList.some((id) => selectedTableIds.includes(id)),
        [idsList, selectedTableIds]
    );

    const totalSelected = selectedTableIds.length;

    const checked = useMemo(
        () => idsList.every((id) => selectedTableIds.includes(id)),
        [idsList, selectedTableIds]
    );

    const isIndeterminate = hasSelectedIds && totalSelected > 0 && !checked;

    const selectAll = useCallback(() => {
        dispatch(
            TableActions.CheckIds({
                tableName,
                idsList,
                rewrite: hasSelectedIds
            })
        );
    }, [hasSelectedIds, dispatch, idsList, tableName]);

    const deselectAll = useCallback(() => {
        dispatch(
            TableActions.ResetIds({
                tableName,
                idsList
            })
        );
    }, [dispatch, tableName, idsList]);

    const changeHandler = useCallback(() => {
        if (isIndeterminate || checked) {
            deselectAll();
        } else {
            selectAll();
        }
    }, [checked, isIndeterminate, deselectAll, selectAll]);

    const tooltipTitle =
        isIndeterminate || checked
            ? t('core:table.header.checkbox.deselect_all')
            : t('core:table.header.checkbox.select_all');

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
        >
            <Tooltip
                title={tooltipTitle}
                placement="top"
            >
                <Checkbox
                    checked={checked}
                    indeterminate={isIndeterminate}
                    onChange={changeHandler}
                />
            </Tooltip>
        </Box>
    );
}

export default memo(TableSelectDeselectAllCheckbox);
