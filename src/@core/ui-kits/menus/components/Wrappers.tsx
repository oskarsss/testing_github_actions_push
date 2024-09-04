/* eslint-disable import/no-anonymous-default-export */
import { Menu } from '@mui/material';
import { MenuRequiredProps } from '@/utils/menu-hook-fabric';

type BaseMenuProps = MenuRequiredProps;

function MenuWrapper({
    anchorEl,
    anchorPosition,
    onClose,
    keepMounted = true,
    open,
    children,
    name,
    sx
}: BaseMenuProps) {
    return (
        <Menu
            sx={sx}
            MenuListProps={{
                sx: {
                    padding: 0
                }
            }}
            keepMounted={keepMounted}
            anchorEl={anchorEl}
            TransitionProps={{ timeout: 100 }}
            open={open}
            onClose={(e: { type: string; key: string }) => {
                if (e.type === 'keydown' && e.key === 'Tab') return;
                onClose();
            }}
            id={`${name}-menu`}
            anchorReference="anchorPosition"
            anchorPosition={anchorPosition}
        >
            {children}
        </Menu>
    );
}

function MenuOptionsWrapper({
    sx,
    ...props
}: BaseMenuProps) {
    return (
        <MenuWrapper
            {...props}
            sx={{
                ...(sx || {}),
                '& .MuiPaper-root': {
                    borderRadius   : '8px',
                    border         : (theme) => `1px solid ${theme.palette.semantic.border.primary}`,
                    backgroundColor: (theme) => theme.palette.semantic.foreground.white.primary,
                    ...((sx as any)?.['& .MuiPaper-root'] || {})
                }
            }}
        />
    );
}

export default {
    /**
     * ### Vektor Menus Components
     * MenuWrapper component. Its a Menu component.
     * #### Props:
     * - `anchorEl` is required
     * - `anchorPosition` is required
     * - `onClose` is required
     * - `keepMounted` is true by default
     * - `open` is required
     * - `name` is required
     *
     * #### Description:
     * This component use by default menuHookFabric.
     */
    MenuWrapper,

    /**
     * ### Vektor Menus Components
     * MenuOptionsWrapper component. Its a Menu component.
     * has styles - border, borderRadius, backgroundColor
     * #### Props:
     * - `anchorEl` is required
     * - `anchorPosition` is required
     * - `onClose` is required
     * - `keepMounted` is true by default
     * - `open` is required
     * - `name` is required
     *
     * #### Description:
     * This component use by default menuHookFabric.
     */
    MenuOptionsWrapper
};
