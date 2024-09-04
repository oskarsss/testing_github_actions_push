import { CSSProperties } from 'react';
import { useTheme } from '@mui/material';
import SvgIcon from './index';

type Props = {
    styles?: CSSProperties;
};

const Step3Icon = ({ styles }: Props) => {
    const theme = useTheme();

    return (
        <SvgIcon
            styles={{ ...styles }}
            width="32"
            height="32"
            viewBox="0 0 32 32"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.0013 6.66667C18.5285 6.66667 17.3346 7.86057 17.3346 9.33333V22.6667C17.3346 25.6122 14.9468 28 12.0013 28C9.05578 28 6.66797 25.6122 6.66797 22.6667V8H9.33464V22.6667C9.33464 24.1394 10.5285 25.3333 12.0013 25.3333C13.4741 25.3333 14.668 24.1394 14.668 22.6667V9.33333C14.668 6.38781 17.0558 4 20.0013 4C22.9468 4 25.3346 6.38781 25.3346 9.33333V22.6667H22.668V9.33333C22.668 7.86057 21.4741 6.66667 20.0013 6.66667Z"
                fill={theme.palette.semantic.foreground.brand.secondary}
            />
            <path
                d="M9.15264 4.641C8.63814 3.75899 7.36374 3.75899 6.84923 4.641L4.50395 8.66149C3.98544 9.55036 4.6266 10.6666 5.65565 10.6666H10.3462C11.3753 10.6666 12.0164 9.55036 11.4979 8.66149L9.15264 4.641Z"
                fill={theme.palette.semantic.foreground.brand.primary}
            />
            <path
                d="M20.0009 24C20.0009 21.7909 21.7918 20 24.0009 20C26.2101 20 28.0009 21.7909 28.0009 24C28.0009 26.2091 26.2101 28 24.0009 28C21.7918 28 20.0009 26.2091 20.0009 24Z"
                fill={theme.palette.semantic.foreground.brand.primary}
            />
        </SvgIcon>
    );
};

export default Step3Icon;
