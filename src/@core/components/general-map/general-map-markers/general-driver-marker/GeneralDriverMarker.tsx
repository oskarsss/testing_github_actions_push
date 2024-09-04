/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import openNewWindow from '@/utils/open-new-window';
import { Typography, createSvgIcon } from '@mui/material';
import clsx from 'clsx';
import styles from './general-driver-marker.module.scss';

type Props = {
    driverSelfieThumbUrl: string;
    driverName: string;
    driverAvatarText: string;
    driverId: string;
    flyToPoint: () => void;
    isOnline: boolean;
};

const DriverIcon = createSvgIcon(
    <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4.95291 7.75417C5.08161 7.75449 5.20899 7.77997 5.32791 7.82917L6.04041 7.11667C5.73232 6.86843 5.34857 6.73307 4.95291 6.73307C4.55726 6.73307 4.17351 6.86843 3.86541 7.11667L4.57791 7.82917C4.6967 7.77955 4.82418 7.75406 4.95291 7.75417Z"
            fill="white"
        />
        <path
            d="M4.95291 1.25C4.59927 1.25165 4.25403 1.35792 3.96067 1.55542C3.66731 1.75292 3.43896 2.03282 3.30439 2.35987C3.16982 2.68691 3.13504 3.04646 3.20444 3.39323C3.27383 3.74 3.4443 4.05848 3.69437 4.30855C3.94443 4.55861 4.26291 4.72908 4.60968 4.79848C4.95645 4.86788 5.31601 4.8331 5.64305 4.69853C5.97009 4.56395 6.24999 4.3356 6.44749 4.04225C6.645 3.74889 6.75127 3.40364 6.75291 3.05C6.75181 2.57295 6.56182 2.11575 6.22449 1.77842C5.88716 1.4411 5.42997 1.2511 4.95291 1.25Z"
            fill="white"
        />
        <path
            d="M8.22792 6.15833C8.17507 5.87914 8.05172 5.6181 7.86958 5.4C7.71373 5.21164 7.51834 5.05988 7.29728 4.95547C7.07622 4.85105 6.83489 4.79656 6.59042 4.79583H3.28625C2.89719 4.79611 2.52049 4.93249 2.22141 5.18133C1.92234 5.43018 1.71975 5.77581 1.64875 6.15833L1.25708 8.24167C1.24572 8.3025 1.24805 8.3651 1.26391 8.42492C1.27976 8.48475 1.30875 8.54028 1.34875 8.5875C1.38793 8.63454 1.43698 8.67236 1.49244 8.69829C1.54789 8.72421 1.60837 8.7376 1.66958 8.7375H8.20708C8.26915 8.73863 8.33068 8.72589 8.38719 8.70019C8.44369 8.67449 8.49374 8.63649 8.53368 8.58896C8.57361 8.54144 8.60243 8.4856 8.61801 8.42551C8.63359 8.36542 8.63555 8.30261 8.62375 8.24167L8.22792 6.15833ZM6.69042 8.32917C6.65613 7.99466 6.52753 7.67676 6.31958 7.4125L5.63208 8.10417C5.6671 8.17106 5.68567 8.24533 5.68625 8.32084H5.26958C5.26958 8.26667 5.14042 8.17084 4.94042 8.17084C4.74042 8.17084 4.61125 8.26667 4.61125 8.32084H4.19458C4.19516 8.24533 4.21373 8.17106 4.24875 8.10417L3.55708 7.4125C3.35043 7.67712 3.22327 7.99503 3.19042 8.32917H2.77375C2.80796 7.77776 3.05113 7.26014 3.4537 6.88178C3.85626 6.50341 4.38795 6.29277 4.94042 6.29277C5.49289 6.29277 6.02457 6.50341 6.42714 6.88178C6.82971 7.26014 7.07287 7.77776 7.10708 8.32917H6.69042Z"
            fill="white"
        />
    </svg>,
    'DriverIcon'
);

export default function GeneralDriverMarker({
    driverAvatarText,
    driverName,
    driverSelfieThumbUrl,
    driverId,
    flyToPoint,
    isOnline
}: Props) {
    const onClick = () => {
        openNewWindow(`/drivers/${driverId}`);
    };

    return (
        <div
            className={styles.wrapper}
            onMouseEnter={(event) => event.stopPropagation()}
            onMouseMove={(event) => event.stopPropagation()}
        >
            {/* <img
                onClick={flyToPoint}
                height="35px"
                width="35px"
                src={image.src}
                alt=""
            /> */}
            <div
                className={`
                ${styles.icon}
                ${clsx({
            [styles.icon__online]: !isOnline
        })} `}
            >
                <DriverIcon onClick={flyToPoint} />
            </div>
            <div className={styles.popup}>
                <div className={styles.popup_content_wrapper}>
                    <div className={styles.popup_driver_avatar}>
                        {driverSelfieThumbUrl ? (
                            <img
                                className={styles.driver_image}
                                src={driverSelfieThumbUrl}
                                alt=""
                            />
                        ) : (
                            <p className={styles.driver_avatar_text}>{driverAvatarText}</p>
                        )}
                    </div>
                    <div
                        style={{
                            display : 'flex',
                            overflow: 'hidden'
                        }}
                    >
                        {/* <p className={styles.driver_name_text}>{driverName}</p>\ */}
                        <Typography
                            variant="body2"
                            sx={{
                                color       : '#000000',
                                overflow    : 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace  : 'nowrap',
                                flexGrow    : 1
                            }}
                        >
                            {driverName}
                        </Typography>
                    </div>
                    <div
                        onClick={onClick}
                        className={styles.icon_button}
                    >
                        <ChevronRightIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}
