import Avatar from '@mui/material/Avatar';
import getInitials from '@/utils/get-initials';
import React from 'react';
import { UserTypeWithOnline } from '@/@core/components/notes/types';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

type Props = {
    driver: UserTypeWithOnline;
};

export default function StickyDriversItem({ driver }: Props) {
    const { url } = usePrivateFileUrl(driver?.selfieThumbUrl || '');

    return (
        <Badge
            variant="filled"
            backgroundColor={() => 'transparent'}
            textColor={(theme) => theme.palette.semantic.text.primary}
            text={driver.fullName}
            sx={{ pl: 0 }}
            icon={(
                <Avatar
                    src={url}
                    sx={{
                        width     : '16px',
                        height    : '16px',
                        fontSize  : '8px',
                        flexShrink: 0
                    }}
                    alt={driver.fullName}
                >
                    {getInitials(driver.fullName).slice(0, 2)}
                </Avatar>
            )}
        />
    );
}
