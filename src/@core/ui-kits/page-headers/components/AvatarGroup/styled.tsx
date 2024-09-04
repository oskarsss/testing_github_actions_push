import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import AvatarGroupMui from '@mui/material/AvatarGroup';
import React, { ComponentProps } from 'react';

type StyledBadgeOnlineType = {
    isOnline: boolean;
};

export const BadgeOnline = styled(Badge, {
    shouldForwardProp(propName) {
        return propName !== 'isOnline';
    }
})<StyledBadgeOnlineType>(({
    theme,
    isOnline
}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: isOnline ? '#44b700' : '#D0D5DD',
        color          : isOnline ? '#44b700' : '#D0D5DD',
        boxShadow      : `0 0 0 2px ${theme.palette.semantic.background.white}`,
        '&::after'     : {
            position    : 'absolute',
            top         : 0,
            left        : 0,
            width       : '100%',
            height      : '100%',
            borderRadius: '50%',
            animation   : isOnline ? 'ripple 1.2s infinite ease-in-out' : 'none',
            border      : '1px solid currentColor',
            content     : '""'
        }
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity  : 1
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity  : 0
        }
    }
}));

interface BadgeOnlineContainerProps {
    children: React.ReactNode;
    props?: ComponentProps<typeof Badge>;
    isOnline: boolean;
}

export const BadgeOnlineContainer = ({
    children,
    isOnline,
    props
}: BadgeOnlineContainerProps) => (
    <BadgeOnline
        isOnline={isOnline}
        overlap="circular"
        anchorOrigin={{
            vertical  : 'bottom',
            horizontal: 'right'
        }}
        variant="dot"
        {...props}
    >
        {children}
    </BadgeOnline>
);

export const AvatarGroup = styled(AvatarGroupMui)(() => ({
    cursor             : 'pointer',
    '& .MuiAvatar-root': {
        transition: 'transform 0.3s',

        '&:hover': {
            transform: 'translateY(-5px)'
        }
    }
}));
