// import SettlementsTypes from '@/services/settlements';
import SettlementsTypes from '@/store/accounting/settlements/types';
import LoadsTypes from '@/store/dispatch/loads/types';

// import { generateDriverPayItem } from './defaultValue';

type Props = {
    item: SettlementsTypes.RevenueTypes.Item;
    loaded_miles: number;
    empty_miles: number;
    broker_total_rate: number;
    categories: LoadsTypes.DriverPayItemCategory[];
};

// eslint-disable-next-line import/prefer-default-export
export const calculateDriverPayItems = ({
    item,
    broker_total_rate,
    empty_miles,
    loaded_miles,
    categories
}: Props) => {
    // const new_item: Drafts.DriverPayItemTypes = generateDriverPayItem();
    // find by category.revenue_item_type === item.type
    // new_item.amount_per_unit = item.amount;
    // const category_id = categories.find(
    //     (category) => category.revenue_item_type === item.type
    // )?.revenue_item_type;
    // new_item.category_id = category_id ?? '';
    // TODO: VADIM: figure out how to put revenue_type_id
    // under driver_pay_items.category_id
    // switch (item.type) {
    // case SettlementsTypes.RevenueTypes.ItemTypeEnum.PER_TOTAL_MILE:
    //     new_item.units = loaded_miles + empty_miles;
    //     break;
    // case SettlementsTypes.RevenueTypes.ItemTypeEnum.PER_LOADED_MILE:
    //     new_item.units = loaded_miles;
    //     break;
    // case SettlementsTypes.RevenueTypes.ItemTypeEnum.PER_EMPTY_MILE:
    //     new_item.units = empty_miles;
    //     break;
    // case SettlementsTypes.RevenueTypes.ItemTypeEnum.PERCENTAGE_FROM_LOAD:
    //     new_item.units = broker_total_rate;
    //     break;
    // default:
    //     new_item.units = 0;
    //     break;
    // }
    // new_item.total_amount = new_item.amount_per_unit * new_item.units;
    // return new_item;
};
