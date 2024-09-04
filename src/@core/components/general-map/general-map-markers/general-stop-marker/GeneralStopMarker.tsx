/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { LoadStopTypesEnum } from '@/models/loads/load-stop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// import CheckIcon from '@mui/icons-material/Check';
import { createSvgIcon } from '@mui/material';
import clsx from 'clsx';
import styles from './general-stop-marker.module.scss';

type Props = {
    sequence: number;
    stopType: LoadStopTypesEnum;

    // stopStatus: StopStatuses;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseEnter?: () => void;
    isCompleted: boolean;
    time: string;
    day: string;
    month: string;
    scheduledAt: {
        day: string;
        month: string;
        time: string;
    };
    isSelected: boolean;
};

// const TriangleIcon = createSvgIcon(
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="9"
//         height="9"
//         viewBox="0 0 9 9"
//         fill="none"
//     >
//         <path
//             d="M1.51962 0.963632C0.903776 0.963632 0.518873 1.6303 0.826795 2.16363L3.77128
// 7.26363C4.0792 7.79696 4.849 7.79697 5.15692
// 7.26363L8.10141 2.16363C8.40933 1.6303 8.02443 0.963632 7.40859 0.963632L1.51962 0.963632Z"
//             fill="currentColor"
//             stroke="white"
//         />
//     </svg>,
//     'TriangleIcon'
// );

// const CheckIcon = createSvgIcon(
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="15"
//         height="15"
//         viewBox="0 0 15 15"
//         fill="none"
//     >
//         <path
//             d="M2.5 7.88194L5.57692 10.9375L12.5 4.0625"
//             stroke="white"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         />
//     </svg>,
//     'CheckIcon'
// );
const DropOffTriangleIcon = createSvgIcon(
    <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.3109 3.72029L3.4453 7.41699C4.2041 8.73149 6.1013 8.73149 6.8602 7.41699L8.9946 3.72029C9.7534 2.40579 8.8048 0.762787 7.2871 0.762787H3.0184C1.5006 0.762787 0.552001 2.40579 1.3109 3.72029Z"
            fill="currentColor"
            stroke="#fff"
            strokeWidth="1.31441"
        />
    </svg>,
    'TriangleIcon'
);
const PickUpTriangleIcon = createSvgIcon(
    <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8.9938 5.52759L6.8594 1.83078C6.1005 0.516285 4.2034 0.516285 3.4445 1.83078L1.3101 5.52749C0.551304 6.84199 1.4998 8.48499 3.0176 8.48499H7.2863C8.804 8.48499 9.7526 6.84198 8.9938 5.52759Z"
            fill="currentColor"
            stroke="white"
            strokeWidth="1.31441"
        />
    </svg>,
    'TriangleIcon'
);

const CanceledIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
    >
        <path
            d="M3.75 3.75L11.25 11.25M11.25 3.75L3.75 11.25"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>,
    'CanceledIcon'
);

export function GeneralStopMarker({
    sequence,
    stopType,
    onClick,
    isCompleted,
    scheduledAt,
    day,
    month,
    time,
    isSelected,
    onMouseEnter
}: // stopStatus
Props) {
    const TriangleIcon =
        stopType === LoadStopTypesEnum.PICKUP ? PickUpTriangleIcon : DropOffTriangleIcon;
    return (
        <div
            onClick={onClick}
            onMouseEnter={(event) => {
                event.stopPropagation();
                onMouseEnter?.();
            }}
            onMouseMove={(event) => event.stopPropagation()}
            className={clsx(styles.wrapper, { [styles.wrapper__selected]: isSelected })}
        >
            <div className={clsx(styles.sequence, styles[stopType])}>
                {!isCompleted ? (
                    <span style={{ fontSize: '1.2rem' }}>{sequence}</span>
                ) : (
                    <CheckCircleIcon />
                )}
            </div>
            <div className={styles.stopCharacteristics}>
                <span className={styles.stopCharacteristics__time}>
                    {!isCompleted ? time : scheduledAt.time}
                </span>
                <span
                    className={`${styles.stopCharacteristics__day} ${clsx({
                        [styles.stopCharacteristics__day__pickup]:
                            stopType === LoadStopTypesEnum.PICKUP,
                        [styles.stopCharacteristics__day__dropoff]:
                            stopType === LoadStopTypesEnum.DROPOFF,
                        [styles.stopCharacteristics__day__pickup_dropoff]:
                            stopType === LoadStopTypesEnum.PICKUP_DROPOFF
                    })}`}
                >
                    {!isCompleted ? `${day} ${month}` : `${scheduledAt.day} ${scheduledAt.month}`}
                </span>
            </div>
            <div className={clsx(styles.arrow)}>
                <TriangleIcon htmlColor={isSelected ? '#00D4D4' : 'black'} />
                <div
                    className={clsx(styles.arrow_shadow, { [styles.arrow_selected]: isSelected })}
                />
            </div>
        </div>
    );
}
