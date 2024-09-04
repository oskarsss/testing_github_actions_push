import { AppPalette } from '@/@core/theme/palette';

const checked = (palette: AppPalette) => (
    <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g filter="url(#filter0_dd_275_14484)">
            <rect
                x="6"
                y="4"
                width="14"
                height="14"
                rx="4"
                fill={palette.semantic.foreground.brand.primary}
            />
            <rect
                x="6"
                y="4"
                width="14"
                height="14"
                rx="4"
                stroke={palette.semantic.foreground.brand.primary}
            />
        </g>
        <path
            d="M11.8742 13.5389L11.8746 13.5392C12.1528 13.8132 12.5979 13.8117 12.8744 13.536L12.8744 13.5359L17.939 8.48069L17.9395 8.48015C18.2172 8.20017 18.2172 7.74674 17.9395 7.46676C17.6613 7.18619 17.2097 7.18608 16.9313 7.46643C16.9312 7.46654 16.9311 7.46665 16.931 7.46676L12.3747 12.0065L10.0661 9.73476C9.78767 9.45477 9.33637 9.455 9.05825 9.73545C8.78058 10.0154 8.78058 10.4689 9.05825 10.7488L9.05824 10.7488L9.05918 10.7498L11.8742 13.5389Z"
            fill="white"
            stroke="white"
            strokeWidth="0.3"
        />
        <defs>
            <filter
                id="filter0_dd_275_14484"
                x="0.5"
                y="0.5"
                width="25"
                height="25"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_275_14484"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2.5" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.188235 0 0 0 0 0.192157 0 0 0 0 0.239216 0 0 0 0.08 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_275_14484"
                    result="effect2_dropShadow_275_14484"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_275_14484"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);

const unchecked = (palette: AppPalette) => (
    <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g filter="url(#filter0_dd_275_14494)">
            <rect
                x="6"
                y="4"
                width="14"
                height="14"
                rx="4"
                fill={palette.semantic.foreground.secondary}
            />
            <rect
                x="6"
                y="4"
                width="14"
                height="14"
                rx="4"
                stroke={palette.semantic.foreground.secondary}
            />
        </g>
        <path
            d="M11.8742 13.5389L11.8746 13.5392C12.1528 13.8132 12.5979 13.8117 12.8744 13.536L12.8744 13.5359L17.939 8.48069L17.9395 8.48015C18.2172 8.20017 18.2172 7.74674 17.9395 7.46676C17.6613 7.18619 17.2097 7.18608 16.9313 7.46643C16.9312 7.46654 16.9311 7.46665 16.931 7.46676L12.3747 12.0065L10.0661 9.73476C9.78767 9.45477 9.33637 9.455 9.05825 9.73545C8.78058 10.0154 8.78058 10.4689 9.05825 10.7488L9.05824 10.7488L9.05918 10.7498L11.8742 13.5389Z"
            fill={palette.semantic.foreground.secondary}
            stroke={palette.semantic.foreground.secondary}
            strokeWidth="0.3"
        />
        <defs>
            <filter
                id="filter0_dd_275_14494"
                x="0.5"
                y="0.5"
                width="25"
                height="25"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_275_14494"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2.5" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.235294 0 0 0 0 0.258824 0 0 0 0 0.341176 0 0 0 0.08 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_275_14494"
                    result="effect2_dropShadow_275_14494"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_275_14494"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);

const checkbox_icons = {
    checked,
    unchecked
};

export default checkbox_icons;
