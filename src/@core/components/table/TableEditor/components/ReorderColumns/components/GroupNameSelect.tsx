import { FormControl, IconButton, Input, MenuItem, Tooltip } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import {
    useTableEditorPropsContext,
    useTableEditorQueryContext
} from '@/@core/components/table/TableEditor/context';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import TableTypes from '@/@core/components/table/types';
import PagesGrpcService from '@/@grpcServices/services/pages.service';
import { PageModel_Page } from '@proto/models/model_page';

type Props = {
    onClickClose: () => void;
    onClickDone: () => void;
};

const EditColumnGroupName = ({
    onClickClose,
    onClickDone
}: Props) => (
    <Stack
        direction="row"
        sx={{
            position: 'absolute',
            top     : '2px',
            right   : '2px'
        }}
    >
        <IconButton
            onClick={onClickDone}
            sx={{
                fontSize: '14px !important',
                padding : '0 !important'
            }}
        >
            <Tooltip
                title="Save"
                placement="top-end"
            >
                <DoneIcon
                    sx={{ fontSize: '14px !important' }}
                    color="success"
                />
            </Tooltip>
        </IconButton>
        <IconButton
            onClick={onClickClose}
            sx={{
                fontSize: '14px !important',
                padding : '0 !important'
            }}
        >
            <Tooltip
                title="Cancel"
                placement="top-end"
            >
                <CloseIcon
                    sx={{ fontSize: '14px !important' }}
                    color="disabled"
                />
            </Tooltip>
        </IconButton>
        <IconButton
            onClick={onClickClose}
            sx={{
                fontSize: '14px !important',
                padding : '0 !important'
            }}
        >
            <Tooltip
                title="Delete"
                placement="top-end"
            >
                <DeleteIcon
                    sx={{ fontSize: '14px !important' }}
                    color="error"
                />
            </Tooltip>
        </IconButton>
    </Stack>
);

interface GroupNameSelectProps {
    col: TableTypes.Editor.ViewsColumn;

    handleChangeViewColumn: (
        changeType: TableTypes.Editor.ChangeType,
        column: TableTypes.Editor.ViewsColumn,
        value: string
    ) => void;
}

const SelectInputSX = {
    padding   : '0 0 0 10px !important',
    height    : '100% !important',
    display   : 'flex !important',
    alignItems: 'center !important'
};

export default function GroupNameSelect({
    col,
    handleChangeViewColumn
}: GroupNameSelectProps) {
    const theme = useTheme();
    const { headers } = useTableEditorQueryContext();
    const { page } = useTableEditorPropsContext();

    const [updateHeader] = PagesGrpcService.useUpdatePageHeaderMutation();

    const group_name_options = headers.map((header) => ({
        value: header.headerId,
        label: header.name
    }));

    const [groupNameValue, setGroupNameValue] = useState(col.headerId);
    const [editGroupNameValue, setEditGroupNameValue] = useState('');

    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (!isEditMode) {
            const foundHeader = group_name_options.find(
                (header) => header.value === groupNameValue
            );
            setEditGroupNameValue(foundHeader ? foundHeader.label : '');
        }
    }, [isEditMode]);

    const changeEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const onChangeGroupName = (e: SelectChangeEvent<unknown>) => {
        setGroupNameValue(e.target.value as string);
        handleChangeViewColumn('header', col, e.target.value as string);
    };

    const onClickDone = () => {
        const header = headers.find((header) => header.headerId === groupNameValue);
        if (!header) return;
        changeEditMode();
        updateHeader({
            page,
            headerId: groupNameValue,
            name    : editGroupNameValue,
            color   : header.color
        });
    };

    const onClickClose = () => {
        changeEditMode();
    };

    return (
        <FormControl fullWidth>
            {!isEditMode ? (
                <Select
                    sx={{
                        height               : '36px',
                        '&.MuiInputBase-root': {
                            alignItems  : 'center',
                            border      : `1px solid ${theme.palette.semantic.border.secondary}`,
                            borderRadius: '4px'
                        }
                    }}
                    IconComponent={() => null}
                    inputProps={{
                        sx: SelectInputSX
                    }}
                    disableUnderline
                    variant="standard"
                    size="small"
                    value={groupNameValue}
                    onChange={onChangeGroupName}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        changeEditMode();
                    }}
                >
                    {group_name_options.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            ) : (
                <Input
                    size="small"
                    disableUnderline
                    onChange={(e) => setEditGroupNameValue(e.target.value)}
                    value={editGroupNameValue}
                    sx={{
                        height               : '36px',
                        '&.MuiInputBase-root': {
                            alignItems  : 'center',
                            border      : `1px solid ${theme.palette.semantic.border.secondary}`,
                            borderRadius: '4px'
                        }
                    }}
                    inputProps={{
                        sx: SelectInputSX
                    }}
                    endAdornment={(
                        <EditColumnGroupName
                            onClickClose={onClickClose}
                            onClickDone={onClickDone}
                        />
                    )}
                    id="standard-basic"
                />
            )}
        </FormControl>
    );
}
