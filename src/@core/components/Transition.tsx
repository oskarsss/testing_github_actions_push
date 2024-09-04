import { forwardRef, ReactElement, Ref } from 'react';
import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

// eslint-disable-next-line import/prefer-default-export
export const Transition = forwardRef(
    (
        props: TransitionProps & {
            children: ReactElement;
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
