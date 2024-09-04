/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TrailerIcon } from '@/@core/icons/custom-nav-icons/icons';
import openNewWindow from '@/utils/open-new-window';
import image from './trailer_icon.png';
import styles from './general-trailer-marker.module.scss';

type Props = {
    trailerId: string;
    trailerReferenceId: string;
    flyToPoint: () => void;
};

export default function GeneralTrailerMarker({
    trailerId,
    trailerReferenceId,
    flyToPoint
}: Props) {
    const onClick = () => {
        openNewWindow(`/trailers/${trailerId}`);
    };
    return (
        <div className={styles.wrapper}>
            <img
                onClick={flyToPoint}
                height="35px"
                width="35px"
                src={image.src}
                alt=""
            />
            <div
                className={styles.popup}
                id="truck-marker-popup-window"
            >
                <div className={styles.popup_content_wrapper}>
                    <div className={styles.popup_truck_info}>
                        <div className={styles.popup_driver_avatar}>{TrailerIcon()}</div>
                        <p className={styles.driver_name_text}>#{trailerReferenceId}</p>
                    </div>
                    <div
                        onClick={onClick}
                        className={styles.icon_button}
                        id="truck-marker-icon-button"
                    >
                        <ChevronRightIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}
