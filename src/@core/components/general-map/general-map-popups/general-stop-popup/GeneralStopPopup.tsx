import React from 'react';
import { getMapLoadStopType } from '@/views/dispatch/orders/Details/sections/load-map/config';
import { LoadStopTypesEnum } from '@/models/loads/load-stop';
import styles from './general-stop-popup.module.scss';

type Props = {
    stopType: LoadStopTypesEnum;
    state: string;
    city: string;
};

export function GeneralStopPopup({
    city,
    state,
    stopType
}: Props) {
    const stopOption = getMapLoadStopType(stopType);

    return (
        <div className={styles.popup}>
            <div className={styles.popup__wrapper}>
                <div className={styles.popup_stopType}>{stopOption && stopOption.icon({})}</div>
                <div className={styles.popup__stopInformation}>
                    <div className={styles.popup__stopLabel}>{stopOption.label}</div>
                    <div className={styles.popup__stopLocation}>
                        {state}, {city}
                    </div>
                </div>
            </div>
        </div>
    );
}
