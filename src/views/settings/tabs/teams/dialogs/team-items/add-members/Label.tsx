import React from 'react';
import { GetUsersReply_User } from '@proto/users';
import { Avatar, Stack, Typography } from '@mui/material';
import { getPublicURL } from '@/configs/storage';
import { Label } from '../ChipAutocomplete';

const UserLabel: Label<GetUsersReply_User> = ({ option }) => {
    const fullName = `${option.firstName} ${option.lastName}`;
    const initials = (option.firstName[0] || '') + (option.lastName[0] || '');
    const url = getPublicURL(option.selfieThumbUrl);

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={1}
        >
            <Avatar
                sizes="8px"
                alt={fullName}
                sx={{
                    height  : '16px',
                    width   : '16px',
                    fontSize: '10px'
                }}
                src={url}
            >
                {initials}
            </Avatar>
            <Typography
                variant="body1"
                color="initial"
                fontSize="12px"
            >
                {fullName}
            </Typography>
        </Stack>
    );
};
export default UserLabel;
