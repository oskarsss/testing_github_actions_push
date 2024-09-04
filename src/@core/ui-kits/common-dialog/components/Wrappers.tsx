/* eslint-disable import/no-anonymous-default-export */
import { Dialog as MuiDialog, IconButton, DialogProps as MuiDialogProps } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { PropsWithChildren } from 'react';

type DialogWrapperProps = PropsWithChildren<{
    maxWidth?: string;
    open: boolean;
    name?: string;
    onClose: () => void;
    onExited?: (dialogKey: string) => void;
    padding?: string;
    paddingBottom?: string;
    keepMounted?: boolean;
    DialogProps?: Omit<
        MuiDialogProps,
        'open' | 'onClose' | 'keepMounted' | 'disableRestoreFocus' | 'children'
    >;
    paperStyle?: React.CSSProperties;
    turnOffCloseButton?: boolean;
}>;

export function DialogWrapper({
    children,
    maxWidth = '450px',
    open,
    onClose,
    onExited = () => {},
    name = '',
    padding = '20px',
    paddingBottom = '0px',
    keepMounted = true,
    DialogProps = {},
    paperStyle = {},
    turnOffCloseButton = false
}: DialogWrapperProps) {
    return (
        <MuiDialog
            {...DialogProps}
            keepMounted={keepMounted}
            open={open}
            id={`${name}-dialog-wrapper`}
            onClose={onClose}
            disableRestoreFocus
            sx={{
                height          : '100%',
                '.MuiPaper-root': {
                    maxWidth,
                    width        : '100%',
                    padding,
                    paddingBottom: `calc(${padding} + ${paddingBottom})`,
                    ...paperStyle
                },
                ...DialogProps?.sx
            }}
            TransitionProps={{
                timeout : 150,
                onExited: () => onExited(name),
                ...DialogProps?.TransitionProps
            }}
        >
            {!turnOffCloseButton && (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{ position: 'absolute', top: 12, right: 8, padding: '4px' }}
                >
                    <CloseOutlinedIcon />
                </IconButton>
            )}
            {children}
        </MuiDialog>
    );
}

export default {
    /**
 * ### Vektor Dialogs Components
 * Dialog Wrapper component.
 * #### Props:
 * - `maxWidth`(optional) - is 450px by default
 * - `padding`(optional) - is 20px by default
 * - `paddingBottom`(optional) - is 0px by default
 * - `keepMounted`(optional) - is true by default
 * - `DialogProps`(optional) - is {} by default
 * - `paperStyle`(optional) - is {} by default
 * - `turnOffCloseButton`(optional) - is false by default
 * - `open` - is required
 * - `onClose`- is required
 * - `name` - is required
 *
 *
 * #### Description:
 * This component use by default dialogHookFabric.
 *
 * You can set turnOffCloseButton to true if you
 * want to turn off close button form dialog and other props to customize dialog.
 *
 * #### Customize example with hook fabric:
 * @example
   export const useDialog = hookFabric(CompanyDialog, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="700px"
        turnOffCloseButton
        // You can pass any props to DialogWrapper
        {...props} // <- this is important
    />
    ));
 */
    DialogWrapper
};
