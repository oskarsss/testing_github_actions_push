import VectorIcons from '@/@core/icons/vector_icons';
import LoadsTypes from '@/store/dispatch/loads/types';
import { IntlMessageKey } from '@/@types/next-intl';

type Filters = keyof Pick<
    LoadsTypes.Loads.SearchOptions,
    'late_dropoffs' | 'late_pickups' | 'gps_inactive'
>;

export type Card = {
    id: number;
    title: IntlMessageKey;
    icon: () => JSX.Element;
    field: Filters;
};

// eslint-disable-next-line import/prefer-default-export
export const cards: Card[] = [
    {
        id   : 1,
        title: 'loads:analytics.performance.titles.late_pickup',
        icon : () => <VectorIcons.LoadIcons.LatePickup />,
        field: 'late_pickups'
    },
    {
        id   : 2,
        title: 'loads:analytics.performance.titles.late_dropoff',
        icon : () => <VectorIcons.LoadIcons.LateDropOff />,
        field: 'late_dropoffs'
    },
    {
        id   : 3,
        title: 'loads:analytics.performance.titles.gps_inactive',
        icon : () => <VectorIcons.LoadIcons.GpsInactive />,
        field: 'gps_inactive'
    }
];
