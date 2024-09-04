import VectorIcons from '@/@core/icons/vector_icons';

const props_icon = {
    size : 32,
    style: {
        fill    : '#BDC7D2',
        fontSize: 32
    }
};

type Props = {
    type: string;
};

export default function Icons({ type }: Props) {
    switch (type) {
    case 'fuel':
        return <VectorIcons.NavIcons.Gasoline {...props_icon} />;
    case 'tolls':
        return <VectorIcons.NavIcons.Tolls {...props_icon} />;
    case 'trucks':
        return <VectorIcons.NavIcons.EmptyTruck {...props_icon} />;
    case 'drivers':
        return <VectorIcons.NavIcons.Driver {...props_icon} />;
    case 'trailers':
        return <VectorIcons.NavIcons.Trailer {...props_icon} />;
    case 'orders':
        return <VectorIcons.NavIcons.Order {...props_icon} />;
    case 'brokers':
        return <VectorIcons.NavIcons.BrokersIcon {...props_icon} />;
    case 'customers':
        return <VectorIcons.NavIcons.CustomersIcon {...props_icon} />;

    default:
        return null;
    }
}
