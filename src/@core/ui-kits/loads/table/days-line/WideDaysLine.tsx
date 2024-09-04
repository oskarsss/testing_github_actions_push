import { Collapse, Typography } from '@mui/material';
import React, { memo } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import clsx from 'clsx';
import styles from './VUIKDaysLine.module.scss';

type Props = {
    primaryDate: string;
    secondaryDate: string;
    collapseIn: boolean;
    countItems?: number;
    text: string;
    isToday?: boolean;
};

export const WideDaysLine = memo(
    ({
        primaryDate,
        secondaryDate,
        collapseIn,
        countItems,
        text,
        isToday
    }: Props) => (
        <Collapse
            in={collapseIn}
            className={styles.wideCollapse}
        >
            <div
                className={clsx(styles.wideWrapper, {
                    [styles.wideWrapperToday]: isToday
                })}
            >
                <VectorIcons.CalendarAndLineIcon />
                <Typography
                    fontSize="12px"
                    fontWeight={500}
                    lineHeight={1.5}
                    color={(theme) => theme.palette.semantic.text.primary}
                >
                    {primaryDate}
                    <Typography
                        fontSize="inherit"
                        fontWeight="inherit"
                        lineHeight="inherit"
                        component="span"
                        color={(theme) => theme.palette.semantic.text.secondary}
                    >
                        {` • ${secondaryDate}`}
                    </Typography>
                </Typography>

                {!!countItems && (
                    <Typography
                        fontSize="12px"
                        fontWeight={500}
                        lineHeight={1.5}
                        ml="auto"
                        color={(theme) => theme.palette.semantic.text.disabled}
                    >
                        {`${countItems} ${text}`.toLowerCase()}
                    </Typography>
                )}
            </div>
        </Collapse>
    )
);
