import UserIcon from '@/layouts/UserLayout/components/UserIcon';
import NavLinkStyled from '@/layouts/UserLayout/Navigation/components/NavLink/styled';
import { ReactNode } from 'react';

type Props = {
    parent: boolean;
    icon: ({ isActive }: { isActive: boolean }) => ReactNode;
    isNavLinkActive: boolean;
};

export default function NavLinkListItemIcon({
    parent,
    icon,
    isNavLinkActive
}: Props) {
    return (
        <NavLinkStyled.ListItemIcon isParent={parent}>
            <UserIcon
                icon={icon}
                iconProps={{
                    sx: {
                        fontSize: '0.875rem',
                        ...(!parent ? { fontSize: '1.5rem' } : {}),
                        ...(parent && icon({ isActive: false }) ? { fontSize: '0.875rem' } : {})
                    },
                    isActive: isNavLinkActive
                }}
            />
        </NavLinkStyled.ListItemIcon>
    );
}
