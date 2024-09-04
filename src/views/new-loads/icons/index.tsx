import { CSSProperties, ReactNode } from 'react';

export const ICON_COLOR = '#99A4B0';

type Props = {
    styles?: CSSProperties;
    width?: string;
    height?: string;
    viewBox?: string;
    children: ReactNode;
};

const CustomSvgIcon = ({
    styles,
    width,
    height,
    viewBox,
    children
}: Props) => (
    <svg
        style={styles}
        width={width || '24'}
        height={height || '24'}
        viewBox={viewBox || '0 0 24 24'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {children}
    </svg>
);

export default CustomSvgIcon;
