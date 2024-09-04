// ** React Imports
import { ReactNode } from 'react';
import MuiDrawer from '@mui/material/SwipeableDrawer';
import { LayoutSettingsType } from '@/context/LayoutSettingsContext';
import clsx from 'clsx';
import styles from './VUIKNavDrawer.module.scss';

interface Props {
    children: ReactNode;
    navCollapsed: LayoutSettingsType['navCollapsed'];
}

export default function D({
    children,
    navCollapsed
}: Props) {
    return (
        <MuiDrawer
            classes={{
                root: clsx(styles.root, {
                    [styles.navCollapsed]: navCollapsed
                }),
                paper: clsx(styles.paper, {
                    [styles.navCollapsed]: navCollapsed
                })
            }}
            variant="permanent"
            onOpen={() => {}}
            onClose={() => {}}
            open={false}
        >
            {children}
        </MuiDrawer>
    );
}
