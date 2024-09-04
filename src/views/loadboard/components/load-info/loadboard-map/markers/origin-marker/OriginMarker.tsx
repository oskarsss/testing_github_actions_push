/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from 'clsx';
import React from 'react';
import styles from './origin-marker.module.scss';

type Props = {
    onClick: () => void;
};

function OriginMarker({ onClick }: Props) {
    return (
        <div
            onClick={onClick}
            onMouseMove={(event) => event.stopPropagation()}
            className={clsx(styles.wrapper)}
        >
            <div className={styles.innerWrapper}>
                <div className={styles.content} />
            </div>
        </div>
    );
}

export default OriginMarker;
