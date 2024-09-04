import { Stack, useTheme, Typography, Fade } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Svg = () => (
    <svg
        width="220"
        height="160"
        viewBox="0 0 220 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            cx="110"
            cy="80"
            r="80"
            fill="#E1E4E8"
        />
        <circle
            cx="26"
            cy="20"
            r="8"
            fill="#E1E4E8"
        />
        <circle
            cx="198"
            cy="126"
            r="6"
            fill="#E1E4E8"
        />
        <circle
            cx="25"
            cy="138"
            r="10"
            fill="#E1E4E8"
        />
        <circle
            cx="210"
            cy="46"
            r="10"
            fill="#E1E4E8"
        />
        <circle
            cx="191"
            cy="11"
            r="7"
            fill="#E1E4E8"
        />
        <g filter="url(#filter0_dd_6228_69476)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M113.486 16C96.7495 16 81.9448 24.2701 72.9354 36.9466C69.9934 36.2528 66.9253 35.8857 63.7714 35.8857C41.8063 35.8857 24 53.692 24 75.6571C24 97.6223 41.8063 115.429 63.7714 115.429H163.2C182.42 115.429 198 99.8481 198 80.6286C198 61.4091 182.42 45.8286 163.2 45.8286C161.835 45.8286 160.488 45.9072 159.164 46.0601C151.546 28.3784 133.961 16 113.486 16Z"
                fill="#F9FAFB"
            />
            <circle
                cx="63.7714"
                cy="75.6581"
                r="39.7714"
                fill="url(#paint0_linear_6228_69476)"
            />
            <circle
                cx="113.486"
                cy="65.7143"
                r="49.7143"
                fill="url(#paint1_linear_6228_69476)"
            />
            <circle
                cx="163.2"
                cy="80.6281"
                r="34.8"
                fill="url(#paint2_linear_6228_69476)"
            />
        </g>
        <g filter="url(#filter1_b_6228_69476)">
            <path
                d="M82 112C82 96.536 94.536 84 110 84C125.464 84 138 96.536 138 112C138 127.464 125.464 140 110 140C94.536 140 82 127.464 82 112Z"
                fill="#6B7789"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M110 125.335C117.364 125.335 123.333 119.365 123.333 112.001C123.333 104.638 117.364 98.668 110 98.668C102.636 98.668 96.6665 104.638 96.6665 112.001C96.6665 119.365 102.636 125.335 110 125.335ZM104.667 110.668C103.93 110.668 103.333 111.265 103.333 112.001C103.333 112.738 103.93 113.335 104.667 113.335H115.333C116.07 113.335 116.667 112.738 116.667 112.001C116.667 111.265 116.07 110.668 115.333 110.668H104.667Z"
                fill="white"
            />
        </g>
        <defs>
            <filter
                id="filter0_dd_6228_69476"
                x="4"
                y="16"
                width="214"
                height="139.43"
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
                <feMorphology
                    radius="4"
                    operator="erode"
                    in="SourceAlpha"
                    result="effect1_dropShadow_6228_69476"
                />
                <feOffset dy="8" />
                <feGaussianBlur stdDeviation="4" />
                <feComposite
                    in2="hardAlpha"
                    operator="out"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_6228_69476"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feMorphology
                    radius="4"
                    operator="erode"
                    in="SourceAlpha"
                    result="effect2_dropShadow_6228_69476"
                />
                <feOffset dy="20" />
                <feGaussianBlur stdDeviation="12" />
                <feComposite
                    in2="hardAlpha"
                    operator="out"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.08 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_6228_69476"
                    result="effect2_dropShadow_6228_69476"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_6228_69476"
                    result="shape"
                />
            </filter>
            <filter
                id="filter1_b_6228_69476"
                x="74"
                y="76"
                width="72"
                height="72"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                />
                <feGaussianBlur
                    in="BackgroundImageFix"
                    stdDeviation="4"
                />
                <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_6228_69476"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_6228_69476"
                    result="shape"
                />
            </filter>
            <linearGradient
                id="paint0_linear_6228_69476"
                x1="33.2326"
                y1="49.3806"
                x2="103.543"
                y2="115.43"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#D0D5DD" />
                <stop
                    offset="0.350715"
                    stopColor="white"
                    stopOpacity="0"
                />
            </linearGradient>
            <linearGradient
                id="paint1_linear_6228_69476"
                x1="75.3123"
                y1="32.8673"
                x2="163.2"
                y2="115.428"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#D0D5DD" />
                <stop
                    offset="0.350715"
                    stopColor="white"
                    stopOpacity="0"
                />
            </linearGradient>
            <linearGradient
                id="paint2_linear_6228_69476"
                x1="136.478"
                y1="57.6353"
                x2="198"
                y2="115.428"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#D0D5DD" />
                <stop
                    offset="0.350715"
                    stopColor="white"
                    stopOpacity="0"
                />
            </linearGradient>
        </defs>
    </svg>
);

function ClearedDocument() {
    const theme = useTheme();
    const { t } = useAppTranslation('core');
    return (
        <Fade in>
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                flex="1 1 100%"
                spacing={2}
                height="100%"
                sx={{
                    borderRadius: '15px',
                    border      : `2px dashed ${
                        theme.palette.mode === 'light' ? '#d6d6d7' : 'rgba(231, 227, 252, 0.22)'
                    }`
                }}
            >
                <Svg />
                <Typography
                    variant="body1"
                    fontSize="20px"
                    fontWeight={600}
                    textAlign="center"
                    sx={{
                        textWrap: 'pretty'
                    }}
                >
                    {t('documents.empty_state.clear_document')}
                </Typography>
            </Stack>
        </Fade>
    );
}

export default ClearedDocument;
