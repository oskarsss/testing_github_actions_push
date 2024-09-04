import { IconButton } from '@mui/material';
import React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VectorIcons from '@/@core/icons/vector_icons';

const SIZE = '18px';
const PADDING_ICON_BUTTON = '4px';

const Edit = ({ disabled = false }) => (
    <IconButton
        disabled={disabled}
        sx={{ padding: PADDING_ICON_BUTTON }}
    >
        <ModeEditIcon
            sx={{
                fontSize: SIZE
            }}
        />
    </IconButton>
);

const Delete = ({ disabled = false }) => (
    <IconButton
        disabled={disabled}
        sx={{ padding: PADDING_ICON_BUTTON }}
    >
        <VectorIcons.TrashIcon
            sx={{
                fontSize: SIZE,
                opacity : disabled ? 0.5 : 1,
                path    : {
                    fill: (theme) => theme.palette.colors.gray[600]
                }
            }}
        />
    </IconButton>
);

const Restore = ({ disabled = false }) => (
    <IconButton
        disabled={disabled}
        sx={{ padding: PADDING_ICON_BUTTON }}
    >
        <VectorIcons.RestoreIcon
            sx={{
                fontSize: SIZE,
                opacity : disabled ? 0.5 : 1,
                path    : {
                    fill: (theme) => theme.palette.colors.gray[600]
                }
            }}
        />
    </IconButton>
);

const ActionsSettingsTable = {
    Edit,
    Delete,
    Restore
};

export default ActionsSettingsTable;
