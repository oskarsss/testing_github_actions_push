import moment from 'moment-timezone';
import { GetTrucksAvailabilityReply_TruckAvailability } from '@proto/trucks_availability';
import { TruckType } from '@/models/fleet/trucks/truck-type';
import { IntlMessageKey } from '@/@types/next-intl';

type ListDateType = {
    id: number;
    name: IntlMessageKey;
    date: moment.Moment | null;
};

export const listDate: ListDateType[] = [
    {
        id  : 0,
        name: 'common:all',
        date: null
    },
    {
        id  : 1,
        name: 'common:days.today',
        date: moment()
    },
    {
        id  : 2,
        name: 'common:days.tomorrow',
        date: moment().add(1, 'days')
    }
];

export interface filterTruckI extends GetTrucksAvailabilityReply_TruckAvailability {
    truck_type: TruckType;
    truck_reference_id: string;
    trailer_type_id: string;
    driver_id: string;
    empty_at: string | null;
}
