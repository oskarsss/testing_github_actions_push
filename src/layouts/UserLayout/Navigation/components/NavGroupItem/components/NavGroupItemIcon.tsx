import UserIcon from '@/layouts/UserLayout/components/UserIcon';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ReactNode } from 'react';

type Props = {
    isParent: boolean;
    icon: ({ isActive }: { isActive: boolean }) => ReactNode;
    isNavLinkActive: boolean;
};

export function NavGroupItemIcon({
    isParent,
    icon,
    isNavLinkActive
}: Props) {
    return (
        <ListItemIcon>
            <UserIcon
                icon={icon}
                iconProps={{
                    sx: {
                        fontSize: '0.875rem',
                        ...(!isParent ? { fontSize: '1.5rem' } : {}),
                        ...(isParent && icon({ isActive: false }) ? { fontSize: '0.875rem' } : {})
                    },
                    isActive: isNavLinkActive
                }}
            />
        </ListItemIcon>
    );
}
