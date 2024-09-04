import { Wrapper } from '@/views/accounting/settlements/dialogs/edit-settlement/options';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { styled } from '@mui/material/styles';
import type { TFunction } from '@/@types/next-intl';
import { TruckModel_Type } from '@proto/models/model_truck';

const Span = styled('span')(({ color }) => ({
    width          : 20,
    height         : 20,
    backgroundColor: color,
    marginRight    : 6,
    marginLeft     : 6,
    display        : 'inline-block'
}));

export function type_options(t: TFunction) {
    return [
        {
            id   : '1',
            value: TruckModel_Type.OWNER_OPERATOR,
            label: () => (
                <Wrapper>
                    {TRUCK_TYPE_ICONS.owner_operator}
                    <span>{t('state_info:trucks.type.owner_operator')}</span>
                </Wrapper>
            )
        },
        {
            id   : '2',
            value: TruckModel_Type.OWNED,
            label: () => (
                <Wrapper>
                    {TRUCK_TYPE_ICONS.owned}
                    <span>{t('state_info:trucks.type.owned')}</span>
                </Wrapper>
            )
        },
        {
            id   : '3',
            value: TruckModel_Type.LEASED,
            label: () => (
                <Wrapper>
                    {TRUCK_TYPE_ICONS.leased}
                    <span>{t('state_info:trucks.type.leased')}</span>
                </Wrapper>
            )
        }
    ];
}

export function color_options(t: TFunction) {
    return [
        {
            id    : '1',
            name  : 'black',
            label : t('state_info:trucks.colors.black'),
            marker: () => <Span color="black" />
        },
        {
            id    : '2',
            name  : 'blue',
            label : t('state_info:trucks.colors.blue'),
            marker: () => <Span color="#4286af" />
        },
        {
            id    : '3',
            name  : 'white',
            label : t('state_info:trucks.colors.white'),
            marker: () => <Span color="white" />
        },
        {
            id    : '4',
            name  : 'brown',
            label : t('state_info:trucks.colors.brown'),
            marker: () => <Span color="brown" />
        },
        {
            id    : '5',
            name  : 'gray',
            label : t('state_info:trucks.colors.gray'),
            marker: () => <Span color="gray" />
        },
        {
            id    : '6',
            name  : 'maroon',
            label : t('state_info:trucks.colors.maroon'),
            marker: () => <Span color="black" />
        },
        {
            id    : '7',
            name  : 'green',
            label : t('state_info:trucks.colors.green'),
            marker: () => <Span color="green" />
        },
        {
            id    : '8',
            name  : 'beige',
            label : t('state_info:trucks.colors.beige'),
            marker: () => <Span color="beige" />
        },
        {
            id    : '9',
            name  : 'light_blue',
            label : t('state_info:trucks.colors.light_blue'),
            marker: () => <Span color="lightblue" />
        },
        {
            id    : '10',
            name  : 'purple',
            label : t('state_info:trucks.colors.purple'),
            marker: () => <Span color="purple" />
        },
        {
            id    : '11',
            name  : 'teal',
            label : t('state_info:trucks.colors.teal'),
            marker: () => <Span color="teal" />
        },
        {
            id    : '12',
            name  : 'orange',
            label : t('state_info:trucks.colors.orange'),
            marker: () => <Span color="orange" />
        },
        {
            id    : '13',
            name  : 'pink',
            label : t('state_info:trucks.colors.pink'),
            marker: () => <Span color="pink" />
        },
        {
            id    : '14',
            name  : 'yellow',
            label : t('state_info:trucks.colors.yellow'),
            marker: () => <Span color="#ffe766" />
        },
        {
            id    : '15',
            name  : 'red',
            label : t('state_info:trucks.colors.red'),
            marker: () => <Span color="red" />
        }
    ];
}
