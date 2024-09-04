import { IconWrapper } from '@/views/map/styled_components';
import VectorIcons from '@/@core/icons/vector_icons';

export const TrucksSVGIcon = () => (
    <IconWrapper>
        <VectorIcons.NavIcons.EmptyTruck
            style={{ fill: '', marginRight: 6 }}
            size={25}
        />
    </IconWrapper>
);

export const TrailersSVGIcon = ({ fill = '' }: { fill?: string }) => (
    <IconWrapper>
        <VectorIcons.NavIcons.Trailer
            style={{ fill, marginRight: 6 }}
            size={25}
        />
    </IconWrapper>
);

export const DriversSVGIcon = () => (
    <IconWrapper>
        <VectorIcons.NavIcons.Driver style={{ fill: '', marginRight: 6 }} />
    </IconWrapper>
);

export const LoadsSVGIcon = ({ fill = '' }: { fill?: string }) => (
    <IconWrapper>
        <VectorIcons.CubeIcon
            style={{
                color      : fill,
                marginRight: 6,
                width      : 30,
                height     : 30
            }}
        />
    </IconWrapper>
);

export const SortIconSvg = () => (
    <IconWrapper>
        <VectorIcons.Sorting />
    </IconWrapper>
);

export const PrePassIconSvg = () => (
    <IconWrapper>
        <VectorIcons.FullDialogIcons.Route size={19} />
    </IconWrapper>
);
