import React from 'react';
import { Button, Tooltip } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useAddSearchDialog } from '../../dialogs/searches/AddSearch';

export default function CreateSearchButton() {
    const addSearchDialog = useAddSearchDialog();

    const createSearch = () => {
        addSearchDialog.open({});
    };
    return (
        <div>
            <Tooltip title="Create new search">
                <Button
                    variant="contained"
                    sx={{
                        padding : '4px',
                        width   : '24px',
                        height  : '24px',
                        minWidth: '24px !important',
                        display : 'flex'
                    }}
                    onClick={createSearch}
                >
                    <AddOutlinedIcon
                        sx={{
                            width : '16px',
                            height: '16px',
                            fill  : 'white'
                        }}
                        color="primary"
                    />
                </Button>
            </Tooltip>
        </div>
    );
}
