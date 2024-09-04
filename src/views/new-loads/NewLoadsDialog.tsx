/* eslint-disable react/jsx-props-no-spreading */
import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, PropsWithChildren, ReactElement, Ref } from 'react';
import themeConfig from '@/configs/themeConfig';

type Props = PropsWithChildren<{
    open?: boolean;
    onClose?: () => void;
    onExited?: (dialogName: string) => void;
    name?: string;
}>;

export const Transition = forwardRef(
    (
        props: TransitionProps & {
            children: ReactElement<any, any>;
        },
        ref: Ref<unknown>
    ) => (
        <Slide
            direction="left"
            ref={ref}
            {...props}
            mountOnEnter
            unmountOnExit={false}
        >
            {props.children}
        </Slide>
    )
);

const NewLoadsDialog = ({
    name = '',
    onClose,
    onExited = () => {},
    children,
    open = false
}: Props) => (
    <Dialog
        keepMounted
        open={open}
        TransitionComponent={Transition}
        TransitionProps={{
            timeout : themeConfig.dialogTransitionTimeout,
            onExited: () => onExited(name)
        }}
        onClose={onClose}
        sx={{
            '& .MuiDialog-container': {
                display       : 'flex',
                justifyContent: 'flex-end',
                alignItems    : 'center'
            },
            '.MuiPaper-root': {
                maxWidth    : '90%',
                maxHeight   : '100%',
                height      : '100%',
                margin      : 0,
                padding     : 0,
                overflow    : 'hidden',
                minWidth    : '90%',
                borderRadius: '24px 0 0 24px'
            }
        }}
    >
        {children}
    </Dialog>
);

export default NewLoadsDialog;
