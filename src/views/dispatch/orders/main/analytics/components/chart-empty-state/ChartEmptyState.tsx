import VectorIcons from '@/@core/icons/vector_icons';

import React, { ComponentProps } from 'react';
import { useTheme } from '@mui/material/styles';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import styles from './OrdersChartEmptyState.module.scss';

type PropsIcon = ComponentProps<typeof VectorIcons.ChartBar>;

type Data = {
    active_loads: {
        title: IntlMessageKey;
        subTitle: IntlMessageKey;
        icon: (props: PropsIcon) => JSX.Element;
    };
    brokers: {
        title: IntlMessageKey;
        subTitle: IntlMessageKey;
        icon: (props: PropsIcon) => JSX.Element;
    };
};

const data: Data = {
    active_loads: {
        title   : 'loads:analytics.active_loads.empty_state.title',
        subTitle: 'loads:analytics.active_loads.empty_state.sub_title',
        icon    : (props: PropsIcon) => <VectorIcons.ChartPie {...props} />
    },
    brokers: {
        title   : 'loads:analytics.clients.empty_state.title',
        subTitle: 'loads:analytics.clients.empty_state.sub_title',
        icon    : (props: PropsIcon) => <VectorIcons.ChartBar {...props} />
    }
};

type Props = {
    type: 'active_loads' | 'brokers';
};

export default function ChartEmptyState({ type }: Props) {
    const theme = useTheme();
    const { t } = useAppTranslation();
    return (
        <div className={styles.container}>
            {data[type].icon({
                light: theme.palette.mode === 'light',
                style: {
                    marginBottom: '8px'
                }
            })}
            <p className={styles.title}>{t(data[type].title)}</p>
            <p
                className={styles.subtitle}
                style={{ textAlign: 'center' }}
            >
                {t(data[type].subTitle)}
            </p>
        </div>
    );
}
