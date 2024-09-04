import { ViewItem } from '@/@core/components/table-views/TableViews';
import { IntlMessageKey } from '@/@types/next-intl';
import Trucks from './tabs/trucks/Trucks';
import Loads from './tabs/loads/Loads';
import Trailers from './tabs/trailers/Trailers';
import Drivers from './tabs/drivers/Drivers';
import { DriversSVGIcon, LoadsSVGIcon, TrailersSVGIcon, TrucksSVGIcon } from '../svg';

interface ViewOption extends Omit<ViewItem, 'name'> {
    name: IntlMessageKey;
    order: number;
    RenderComponent: React.FC;
}

export const views_options: ViewOption[] = [
    {
        viewId         : 'loads',
        order          : 0,
        name           : 'entity:loads',
        icon           : <LoadsSVGIcon />,
        RenderComponent: Loads
    },
    {
        viewId         : 'trucks',
        order          : 1,
        name           : 'entity:trucks',
        icon           : <TrucksSVGIcon />,
        RenderComponent: Trucks
    },
    {
        viewId         : 'trailers',
        order          : 2,
        name           : 'entity:trailers',
        icon           : <TrailersSVGIcon />,
        RenderComponent: Trailers
    },
    {
        viewId         : 'drivers',
        order          : 3,
        name           : 'entity:drivers',
        icon           : <DriversSVGIcon />,
        RenderComponent: Drivers
    }
];
