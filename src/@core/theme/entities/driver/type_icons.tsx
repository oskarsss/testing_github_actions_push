import { createSvgIcon, useTheme } from '@mui/material';

export function CompanyDriverIcon() {
    const { palette } = useTheme();
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22 12C22 15.0134 20.6672 17.7154 18.5588 19.5488C16.8031 21.0756 14.5095 22 12 22C9.49052 22 7.19694 21.0756 5.44117 19.5488C3.33285 17.7154 2 15.0134 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                fill={palette.utility.icon.ocean.secondary}
            />
            <path
                d="M6 20.0007V17.8889C6 16.7222 7.2075 15.7422 9 15.1978C9 16.0163 9.20701 17.916 10.612 20.0441L10.6503 20.0416L11.25 16.3333L10.545 14.8711C11.01 14.8167 11.4975 14.7778 12 14.7778C12.5025 14.7778 12.99 14.8167 13.455 14.8711L12.75 16.3333L13.3497 20.0416L13.388 20.0441C14.793 17.916 15 16.0163 15 15.1978C16.8 15.7422 18 16.7222 18 17.8889V20.0007C16.3287 21.2561 14.2512 22 12 22C9.74879 22 7.67132 21.2561 6 20.0007Z"
                fill={palette.utility.icon.ocean.primary}
            />
            <path
                d="M15 10.1111C15 8.39222 13.6575 7 12 7C10.3425 7 9 8.39222 9 10.1111C9 11.83 10.3425 13.2222 12 13.2222C13.6575 13.2222 15 11.83 15 10.1111Z"
                fill={palette.utility.icon.ocean.primary}
            />
        </svg>
    );
}

export function LeaseDriverIcon() {
    const { palette } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M18.3 1.5H5.7C3.3804 1.5 1.5 3.3804 1.5 5.7V18.3C1.5 20.2574 2.83908 21.9021 4.65116 22.368C4.98641 22.4542 5.33785 22.5 5.7 22.5H18.3C18.6621 22.5 19.0136 22.4542 19.3488 22.368C21.1609 21.9021 22.5 20.2575 22.5 18.3V5.7C22.5 3.3804 20.6196 1.5 18.3 1.5Z"
                fill={palette.utility.icon.violet.secondary}
            />
            <path
                d="M8.8502 16.5904C6.9602 17.142 5.7002 18.1663 5.7002 19.3482V22.5H8.8502V16.5904Z"
                fill={palette.utility.icon.violet.primary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.9002 16.3867V22.5H14.0898V16.3867C12.5658 16.1319 11.412 16.1317 9.9002 16.3867ZM11.4754 17.7479H12.5254V18.7962H11.4754V17.7479ZM11.4754 19.8444H12.5254V20.8927H11.4754V19.8444Z"
                fill={palette.utility.icon.violet.primary}
            />
            <path
                d="M15.1502 22.5V16.5904C17.0402 17.142 18.3002 18.1663 18.3002 19.3482V22.5H15.1502Z"
                fill={palette.utility.icon.violet.primary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.42847 9.75278H15.5877C15.6129 9.6887 15.6402 9.61271 15.6672 9.52621L15.6714 9.51255C15.7659 9.21033 15.8506 8.93893 15.8506 8.38597C15.8506 8.10546 15.6686 7.86943 15.4274 7.68243C15.1831 7.49332 14.8496 7.33153 14.4782 7.19951C13.7341 6.93511 12.7958 6.77612 12.0006 6.77612C11.2054 6.77612 10.267 6.93511 9.52292 7.19951C9.15157 7.33153 8.81802 7.49332 8.57372 7.68243C8.33257 7.86943 8.15057 8.10546 8.15057 8.38597C8.15057 8.89936 8.23632 9.16971 8.32452 9.44811C8.33292 9.47403 8.34097 9.49994 8.34937 9.52586C8.37632 9.61271 8.40327 9.68835 8.42847 9.75278ZM10.6006 8.7022C10.6006 8.50889 10.7574 8.352 10.9506 8.352H13.0506C13.2438 8.352 13.4006 8.50889 13.4006 8.7022C13.4006 8.89551 13.2438 9.05239 13.0506 9.05239H10.9506C10.7574 9.05239 10.6006 8.89551 10.6006 8.7022Z"
                fill={palette.utility.icon.violet.primary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.15856 10.5971C8.17627 10.5138 8.2602 10.4532 8.35799 10.4532H15.643C15.7411 10.4532 15.8247 10.5138 15.8424 10.5971L15.8443 10.6076C15.8451 10.6125 15.8459 10.6188 15.847 10.6265C15.8485 10.6416 15.8501 10.6623 15.8505 10.6871C15.8509 10.7368 15.8458 10.8051 15.8251 10.8853C15.7831 11.0478 15.6784 11.2541 15.4389 11.4544C14.9638 11.8522 13.9875 12.2042 12.0005 12.2042C10.0135 12.2042 9.03713 11.8522 8.56204 11.4544C8.32257 11.2541 8.21785 11.0478 8.17589 10.8853C8.1551 10.8051 8.15009 10.7368 8.15048 10.6871C8.15086 10.6623 8.1524 10.6416 8.15394 10.6265C8.1551 10.6188 8.15587 10.6125 8.15664 10.6076L8.15856 10.5971Z"
                fill={palette.utility.icon.violet.primary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.86384 12.099C8.86734 12.1025 8.87119 12.106 8.87469 12.1091C9.30659 12.507 10.1942 12.7293 12.0005 12.7293C13.8069 12.7293 14.6945 12.507 15.1264 12.1091C15.1299 12.106 15.1337 12.1025 15.1372 12.099C14.9906 13.7036 13.6424 14.6099 12.0005 14.6099C10.3587 14.6099 9.01049 13.7036 8.86384 12.099Z"
                fill={palette.utility.icon.violet.primary}
            />
        </svg>
    );
}

export function OwnerOperatorIcon() {
    const { palette } = useTheme();
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.92154 2.57125C11.2077 1.80958 12.7923 1.80958 14.0785 2.57125L18.9215 5.43932C20.2077 6.20099 21 7.6086 21 9.13192V14.8681C21 16.3914 20.2077 17.799 18.9215 18.5607L14.0785 21.4288C12.7923 22.1904 11.2077 22.1904 9.92154 21.4288L5.07846 18.5607C3.7923 17.799 3 16.3914 3 14.8681V9.13192C3 7.6086 3.7923 6.20099 5.07846 5.43932L9.92154 2.57125Z"
                fill={palette.utility.icon.pink.secondary}
            />
            <path
                d="M11.9966 22C11.2801 21.9994 10.5636 21.809 9.92154 21.4288L7 19.6986V19.6048C7 18.0701 9.25 16.8144 12 16.8144C14.75 16.8144 17 18.0701 17 19.6048V19.6986L14.0785 21.4288C13.4344 21.8102 12.7154 22.0006 11.9966 22Z"
                fill={palette.utility.icon.pink.primary}
            />
            <path
                d="M14.5 12.6288V11.9312H9.5V12.6288C9.5 14.1635 10.625 15.4192 12 15.4192C13.375 15.4192 14.5 14.1635 14.5 12.6288Z"
                fill={palette.utility.icon.pink.primary}
            />
            <path
                d="M15.75 9.14077C15.75 8.72221 16 8.44316 16.375 8.44316C16.75 8.44316 17 8.79197 17 9.14077V9.83837C17 10.6057 16.4375 11.2336 15.75 11.2336H8.25C7.5625 11.2336 7 10.6057 7 9.83837V9.14077C7 8.72221 7.25 8.44316 7.625 8.44316C8 8.44316 8.25 8.72221 8.25 9.14077V9.83837H9.1875L10.0625 7.74556C10.125 7.60604 10.1875 7.46652 10.3125 7.327C10.625 6.9782 11.125 6.90844 11.5625 7.11772L12 7.327L12.4375 7.18748C12.875 6.9782 13.375 7.04796 13.6875 7.39676C13.8125 7.46652 13.875 7.60604 13.9375 7.74556L14.8125 9.83837H15.75V9.14077Z"
                fill={palette.utility.icon.pink.primary}
            />
        </svg>
    );
}

export function DefaultDriverIcon() {
    const { palette } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
        >
            <g clipPath="url(#clip0_5356_170780)">
                <path
                    d="M21.5 11C21.5 14.164 20.1005 17.0012 17.8868 18.9263C16.0432 20.5294 13.635 21.5 11 21.5C8.36505 21.5 5.95678 20.5294 4.11322 18.9263C1.89949 17.0012 0.5 14.164 0.5 11C0.5 5.20101 5.20101 0.5 11 0.5C16.799 0.5 21.5 5.20101 21.5 11Z"
                    fill={palette.utility.icon.blue_dark.secondary}
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.11504 13C6.3949 13 5 14.6221 5 16.6225V19.9775C5 21.0916 5.78121 22 6.73913 22H15.2609C16.2188 22 17 21.0916 17 19.9775V16.6225C17 14.6221 15.6051 13 13.885 13H8.11504Z"
                    fill={palette.utility.icon.blue_dark.primary}
                />
                <mask
                    id="mask0_5356_170780"
                    maskUnits="userSpaceOnUse"
                    x="5"
                    y="16"
                    width="12"
                    height="6"
                >
                    <path
                        d="M16.4987 16H5.71191V21.6631H16.4987V16Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask0_5356_170780)">
                    <mask
                        id="mask1_5356_170780"
                        maskUnits="userSpaceOnUse"
                        x="5"
                        y="16"
                        width="12"
                        height="11"
                    >
                        <path
                            d="M11.1052 16L5.79883 21.3064L11.1052 26.6127L16.4115 21.3064L11.1052 16Z"
                            fill="white"
                        />
                    </mask>
                    <g mask="url(#mask1_5356_170780)">
                        <path
                            d="M8.45234 18.6532C6.99505 20.1105 6.99505 22.5023 8.45234 23.9596C9.90958 25.4168 12.3014 25.4168 13.7587 23.9596C15.216 22.5023 15.216 20.1105 13.7587 18.6532C12.3014 17.1959 9.90958 17.1959 8.45234 18.6532ZM12.7996 18.9905L11.8321 19.958C11.3784 19.7142 10.8327 19.7142 10.379 19.958L9.41149 18.9905C10.4122 18.2581 11.7989 18.2581 12.7996 18.9905ZM10.6391 21.7728C10.382 21.5156 10.382 21.0972 10.6391 20.84C10.8963 20.5828 11.3147 20.5828 11.5719 20.84C11.8291 21.0972 11.8291 21.5156 11.5719 21.7728C11.3147 22.0299 10.8963 22.0299 10.6391 21.7728ZM8.78961 19.6123L9.75709 20.5798C9.51329 21.0335 9.51329 21.5792 9.75709 22.0329L8.78961 23.0004C8.05724 21.9997 8.05724 20.613 8.78961 19.6123ZM9.41149 23.6223L10.379 22.6548C10.8327 22.8986 11.3784 22.8986 11.8321 22.6548L12.7996 23.6223C11.7989 24.3547 10.4122 24.3547 9.41149 23.6223ZM13.4214 23.0004L12.4539 22.0329C12.6977 21.5793 12.6977 21.0335 12.4538 20.5797L13.4213 19.6122C14.1538 20.613 14.1538 21.9997 13.4214 23.0004Z"
                            fill={palette.utility.icon.blue_dark.secondary}
                        />
                        <path
                            d="M11.2611 21.4618C11.3469 21.376 11.3469 21.2368 11.2611 21.1509C11.1752 21.0651 11.036 21.0651 10.9502 21.1509C10.8643 21.2368 10.8643 21.376 10.9502 21.4618C11.036 21.5477 11.1752 21.5477 11.2611 21.4618Z"
                            fill={palette.utility.icon.blue_dark.secondary}
                        />
                    </g>
                </g>
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.1055 6C9.33385 6 7.89062 7.44323 7.89062 9.21496C7.89062 10.9867 9.33385 12.43 11.1055 12.43C12.8773 12.43 14.3205 10.9867 14.3205 9.21496C14.3205 7.44323 12.8773 6 11.1055 6Z"
                    fill={palette.utility.icon.blue_dark.primary}
                />
            </g>
            <defs>
                <clipPath id="clip0_5356_170780">
                    <rect
                        x="0.5"
                        y="0.5"
                        width="21"
                        height="21"
                        rx="10.5"
                        fill="white"
                    />
                </clipPath>
            </defs>
        </svg>
    );
}

export const DriverAvatarIcon = createSvgIcon(
    <svg
        width="128"
        height="128"
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <rect
            width="128"
            height="128"
            fill="url(#pattern0)"
        />
        <defs>
            <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
            >
                <use
                    xlinkHref="#image0_1_2"
                    transform="scale(0.0078125)"
                />
            </pattern>
            <image
                id="image0_1_2"
                width="128"
                height="128"
                xlinkHref="data:image/jpeg;base64,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"
            />
        </defs>
    </svg>,
    'DriverAvatarIcon'
);
