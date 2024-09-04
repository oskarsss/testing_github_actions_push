import React from 'react';

function BotIcon() {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="32"
                height="32"
                fill="url(#paint0_linear_5420_81338)"
            />
            <path
                d="M6.93201 11.2H14.2101L10.4173 17.5554H3.13922L6.93201 11.2Z"
                fill="url(#paint1_linear_5420_81338)"
            />
            <path
                d="M21.5907 11.2H28.8688L25.076 17.5554H17.7979L21.5907 11.2Z"
                fill="url(#paint2_linear_5420_81338)"
            />
            <path
                d="M17.8491 17.5043L14.21 11.2013L10.4173 17.5556L14.0563 23.8586L17.8491 17.5043Z"
                fill="url(#paint3_linear_5420_81338)"
            />
            <g filter="url(#filter0_i_5420_81338)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.37687 11.2002H6.75078L5.51649 13.2685L6.75076 11.2006L7.93442 13.2507L9.15813 11.2002H11.532L10.2949 13.2732H7.92774L6.70062 15.329L5.51367 13.2732L5.51367 13.2732H3.13977L4.37687 11.2002Z"
                    fill="white"
                    fillOpacity="0.01"
                />
            </g>
            <defs>
                <filter
                    id="filter0_i_5420_81338"
                    x="3.05279"
                    y="11.2002"
                    width="8.47925"
                    height="4.12891"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dx="-0.0869792" />
                    <feGaussianBlur stdDeviation="0.0434896" />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_5420_81338"
                    />
                </filter>
                <linearGradient
                    id="paint0_linear_5420_81338"
                    x1="16"
                    y1="0"
                    x2="16"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#0047BA" />
                    <stop
                        offset="1"
                        stopColor="#002585"
                    />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_5420_81338"
                    x1="15.4667"
                    y1="12.4"
                    x2="4.53055"
                    y2="13.3682"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="white" />
                    <stop
                        offset="1"
                        stopColor="white"
                        stopOpacity="0.79"
                    />
                </linearGradient>
                <linearGradient
                    id="paint2_linear_5420_81338"
                    x1="30.1254"
                    y1="12.4"
                    x2="19.4258"
                    y2="13.9922"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        stopColor="white"
                        stopOpacity="0.73"
                    />
                    <stop
                        offset="1"
                        stopColor="white"
                        stopOpacity="0.94"
                    />
                </linearGradient>
                <linearGradient
                    id="paint3_linear_5420_81338"
                    x1="10.5333"
                    y1="16.2667"
                    x2="16.8"
                    y2="20.6667"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        stopColor="white"
                        stopOpacity="0.83"
                    />
                    <stop
                        offset="1"
                        stopColor="white"
                        stopOpacity="0.87"
                    />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default BotIcon;
