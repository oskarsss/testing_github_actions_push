import { CircularProgress } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import styles from './VUIKAuthProcessing.module.scss';

type Props = {
    text: string;
    className?: string;
};

export default function AuthProcessing({
    text,
    className
}: Props) {
    return (
        <div className={clsx(styles.container, className)}>
            <CircularProgress size={25} />
            <span>{text}</span>
        </div>
    );
}
