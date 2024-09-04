import React from 'react';
import { GetUsersReply_User } from '@proto/users';
import { Avatar, Stack, Typography } from '@mui/material';
import { getPublicURL } from '@/configs/storage';
import { Option } from '../ChipAutocomplete';

const UserOption: Option<GetUsersReply_User> = ({ option }) => {
    const fullName = `${option.firstName} ${option.lastName}`;
    const initials = (option.firstName[0] || '') + (option.lastName[0] || '');
    const url = getPublicURL(option.selfieThumbUrl);

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={2}
        >
            <Avatar
                sizes="8px"
                alt={fullName}
                sx={{
                    height  : '40px',
                    width   : '40px',
                    fontSize: '14px'
                }}
                src={url}
            >
                {initials}
            </Avatar>
            <Typography
                variant="body1"
                fontSize="14px"
            >
                {fullName}
            </Typography>
        </Stack>
    );
};

export default UserOption;
