import { useTheme } from '@mui/material';

const DropOff = () => {
    const theme = useTheme();
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                opacity="0.3"
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                fill={theme.palette.semantic.foreground.brand.primary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 7C12.5523 7 13 7.44772 13 8V13.5858L14.2929 12.2929C14.6834 11.9024 15.3166 11.9024 15.7071 12.2929C16.0976 12.6834 16.0976 13.3166 15.7071 13.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L8.29289 13.7071C7.90237 13.3166 7.90237 12.6834 8.29289 12.2929C8.68342 11.9024 9.31658 11.9024 9.70711 12.2929L11 13.5858V8C11 7.44772 11.4477 7 12 7Z"
                fill={theme.palette.semantic.foreground.brand.primary}
            />
        </svg>
    );
};

const PickUp = () => {
    const theme = useTheme();
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                opacity="0.3"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                fill={theme.palette.semantic.foreground.brand.primary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.7071 10.2929L12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L8.29289 10.2929C7.90237 10.6834 7.90237 11.3166 8.29289 11.7071C8.68342 12.0976 9.31658 12.0976 9.70711 11.7071L11 10.4142V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V10.4142L14.2929 11.7071C14.6834 12.0976 15.3166 12.0976 15.7071 11.7071C16.0976 11.3166 16.0976 10.6834 15.7071 10.2929Z"
                fill={theme.palette.semantic.foreground.brand.primary}
            />
        </svg>
    );
};

const SplitIcons = {
    DropOff,
    PickUp
};

export default SplitIcons;
