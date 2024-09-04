import { memo, MouseEvent, useMemo } from 'react';
import { useSelectedTableIds } from '@/store/table/hooks';
import { useAppDispatch } from '@/store/hooks';
import { TableActions } from '@/store/table/slice';
import { Checkbox, Stack } from '@mui/material';

type Props = {
    id: string;
    tableName: string;
};

function SelectDeselectTableItemsCheckbox({
    id,
    tableName
}: Props) {
    const selectedItemsIds = useSelectedTableIds(tableName);
    const dispatch = useAppDispatch();
    const isChecked = useMemo(() => selectedItemsIds.includes(id), [selectedItemsIds, id]);

    const onChange = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        if (!isChecked) {
            dispatch(TableActions.CheckId({ id, tableName }));
        } else {
            dispatch(TableActions.UncheckId({ id, tableName }));
        }
    };

    return (
        <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding="35px"
            height="100%"
            width="100%"
            onClick={onChange}
        >
            <Checkbox
                checked={isChecked}
                onClick={onChange}
            />
        </Stack>
    );
}

export default memo(SelectDeselectTableItemsCheckbox);
