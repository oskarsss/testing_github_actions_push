/* eslint-disable import/no-anonymous-default-export */
import themeConfig from '@/configs/themeConfig';
import { Dialog as MUIDialog } from '@mui/material';
import { CSSProperties, PropsWithChildren } from 'react';
import { Transition } from '../../../components/Transition';

type DialogProps = PropsWithChildren<{
    open?: boolean;
    onClose?: () => void;
    onExited?: (dialogName: string) => void;
    name?: string;
    paperStyles?: CSSProperties;
}>;

function Dialog({
    name = '',
    onClose,
    onExited = () => {},
    children,
    open = false,
    paperStyles = {}
}: DialogProps) {
    return (
        <MUIDialog
            keepMounted
            open={open}
            TransitionComponent={Transition}
            TransitionProps={{
                timeout : themeConfig.dialogTransitionTimeout,
                onExited: () => onExited(name)
            }}
            id={name}
            onClose={onClose}
            sx={{
                '& .MuiDialog-container': {
                    display       : 'flex',
                    justifyContent: 'flex-end',
                    alignItems    : 'center'
                },
                '.MuiDialog-paper': {
                    maxWidth : '90vw',
                    maxHeight: '100%',
                    height   : '100%',
                    margin   : 0,
                    ...paperStyles
                }
            }}
        >
            {children}
        </MUIDialog>
    );
}

export default {
    Dialog
};
