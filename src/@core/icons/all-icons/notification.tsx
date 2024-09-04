import { createSvgIcon, useTheme } from '@mui/material';

const Notification = createSvgIcon(
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.54403 3.00007C9.59652 3.00011 9.6497 3.00015 9.70361 3.00015H14.2964C14.3503 3.00015 14.4035 3.00011 14.456 3.00007C15.4234 2.99939 16.1524 2.99888 16.8107 3.23501C17.3895 3.44262 17.9127 3.7809 18.3396 4.22355C18.8251 4.727 19.1237 5.392 19.5201 6.27448C19.5416 6.32235 19.5634 6.37087 19.5855 6.42003L21.9119 11.5898C21.97 11.7188 22 11.8587 22 12.0001V15.8387C22 16.3658 22 16.8206 21.9694 17.1952C21.9371 17.5905 21.8658 17.9837 21.673 18.3621C21.3854 18.9266 20.9265 19.3855 20.362 19.6732C19.9836 19.866 19.5904 19.9373 19.195 19.9696C18.8205 20.0002 18.3657 20.0002 17.8386 20.0001H6.16144C5.6343 20.0002 5.17954 20.0002 4.80497 19.9696C4.40963 19.9373 4.01641 19.866 3.63803 19.6732C3.07354 19.3855 2.6146 18.9266 2.32698 18.3621C2.13419 17.9837 2.06287 17.5905 2.03057 17.1952C1.99997 16.8206 1.99998 16.3658 2 15.8387L2 12.0001C2 11.8587 2.03002 11.7188 2.08808 11.5898L4.41447 6.42003C4.43659 6.37086 4.45838 6.32235 4.47989 6.27447C4.87626 5.392 5.17495 4.72699 5.66043 4.22355C6.08729 3.7809 6.61046 3.44262 7.1893 3.23501C7.84762 2.99888 8.57662 2.99939 9.54403 3.00007ZM9.70361 5.00014C8.50384 5.00014 8.1527 5.01422 7.86453 5.11758C7.57511 5.22138 7.31353 5.39052 7.1001 5.61185C6.88759 5.83222 6.73065 6.14666 6.23831 7.24076L4.54659 11.0001H6.67452C6.70252 11.0001 6.73028 11.0001 6.75782 11.0001C7.16471 10.9997 7.52347 10.9994 7.87191 11.083C8.17802 11.1565 8.47066 11.2777 8.73907 11.4422C9.04462 11.6295 9.29807 11.8834 9.58552 12.1714C9.60497 12.1909 9.62458 12.2105 9.64437 12.2303L9.76985 12.3558C10.1494 12.7353 10.2285 12.8053 10.3059 12.8528C10.3954 12.9076 10.4929 12.948 10.595 12.9725C10.6833 12.9937 10.7887 13.0001 11.3255 13.0001H12.6745C13.2113 13.0001 13.3167 12.9937 13.405 12.9725C13.5071 12.948 13.6046 12.9076 13.6941 12.8528C13.7715 12.8053 13.8506 12.7353 14.2302 12.3558L14.3556 12.2303C14.3754 12.2105 14.395 12.1909 14.4145 12.1714C14.7019 11.8834 14.9554 11.6295 15.2609 11.4422C15.5293 11.2777 15.822 11.1565 16.1281 11.083C16.4765 10.9994 16.8353 10.9997 17.2422 11.0001C17.2697 11.0001 17.2975 11.0001 17.3255 11.0001H19.4534L17.7617 7.24076C17.2693 6.14666 17.1124 5.83222 16.8999 5.61185C16.6865 5.39052 16.4249 5.22138 16.1355 5.11758C15.8473 5.01422 15.4962 5.00014 14.2964 5.00014H9.70361Z"
        />
    </svg>,
    'NotificationIcon'
);

const Slider = createSvgIcon(
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.33301 5.66732C1.33301 4.37865 2.37768 3.33398 3.66634 3.33398C4.72335 3.33398 5.6162 4.03682 5.90305 5.00065H13.9997C14.3679 5.00065 14.6663 5.29913 14.6663 5.66732C14.6663 6.03551 14.3679 6.33398 13.9997 6.33398H5.90305C5.6162 7.29781 4.72335 8.00065 3.66634 8.00065C2.37768 8.00065 1.33301 6.95598 1.33301 5.66732ZM10.0963 9.66732C10.3832 8.70349 11.276 8.00065 12.333 8.00065C13.6217 8.00065 14.6663 9.04532 14.6663 10.334C14.6663 11.6226 13.6217 12.6673 12.333 12.6673C11.276 12.6673 10.3832 11.9645 10.0963 11.0007H1.99967C1.63148 11.0007 1.33301 10.7022 1.33301 10.334C1.33301 9.96579 1.63148 9.66732 1.99967 9.66732H10.0963Z"
        />
    </svg>,
    'Slider'
);

const EmptyState = () => {
    const { palette } = useTheme();

    return (
        <svg
            width="220"
            height="178"
            viewBox="0 0 220 178"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ zIndex: 1 }}
        >
            <circle
                cx="110"
                cy="88"
                r="80"
                fill={palette.semantic.foreground.secondary}
            />
            <circle
                cx="26"
                cy="28"
                r="8"
                fill={palette.semantic.foreground.secondary}
            />
            <circle
                cx="198"
                cy="134"
                r="6"
                fill={palette.semantic.foreground.secondary}
            />
            <circle
                cx="25"
                cy="146"
                r="10"
                fill={palette.semantic.foreground.secondary}
            />
            <circle
                cx="210"
                cy="54"
                r="10"
                fill={palette.semantic.foreground.secondary}
            />
            <circle
                cx="191"
                cy="19"
                r="7"
                fill={palette.semantic.foreground.secondary}
            />
            <g filter="url(#filter0_dd_12045_173512)">
                <path
                    d="M110 54.9529L116.912 52.0578L110.001 55.002V137.432L173.69 110.743V28.2767L174 28.1466L173.69 28.009V27.8705L173.53 27.9384L110.503 0L46 27.4765L46.3053 27.6076L46 109.74L110 137.383L110 54.9529Z"
                    fill={palette.semantic.foreground.six}
                />
                <path
                    d="M110 54.9529V137.383L46 109.739L46.3053 27.6074L110 54.9529Z"
                    fill="url(#paint0_linear_12045_173512)"
                />
                <path
                    d="M110.001 55.0026V137.433L173.69 110.744V27.8711L110.001 55.0026Z"
                    fill="url(#paint1_linear_12045_173512)"
                />
                <path
                    d="M110 54.9529L174 28.1466L110.503 0L46 27.4765L110 54.9529Z"
                    fill={palette.semantic.foreground.secondary}
                />
                <path
                    d="M70.126 17.1988L133.882 44.9494L134.461 65.1721L152.299 57.8116L151.76 37.4613L86.1177 10.3867L70.126 17.1988Z"
                    fill={palette.semantic.foreground.six}
                />
            </g>
            <g filter="url(#filter1_b_12045_173512)">
                <path
                    d="M82 132C82 116.536 94.536 104 110 104C125.464 104 138 116.536 138 132C138 147.464 125.464 160 110 160C94.536 160 82 147.464 82 132Z"
                    fill={palette.semantic.foreground.primary}
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M107.134 121.5C107.196 121.5 107.258 121.5 107.321 121.5H112.679C112.742 121.5 112.804 121.5 112.865 121.5C113.994 121.499 114.844 121.499 115.612 121.774C116.287 122.016 116.898 122.411 117.396 122.927C117.962 123.515 118.311 124.291 118.773 125.32C118.798 125.376 118.824 125.433 118.849 125.49L121.564 131.521C121.631 131.672 121.666 131.835 121.666 132V136.478C121.666 137.093 121.666 137.624 121.631 138.061C121.593 138.522 121.51 138.981 121.285 139.422C120.949 140.081 120.414 140.616 119.755 140.952C119.314 141.177 118.855 141.26 118.394 141.298C117.957 141.334 117.426 141.334 116.811 141.334H103.188C102.573 141.334 102.042 141.334 101.605 141.298C101.144 141.26 100.685 141.177 100.244 140.952C99.5855 140.616 99.05 140.081 98.7145 139.422C98.4896 138.981 98.4064 138.522 98.3687 138.061C98.333 137.624 98.333 137.093 98.333 136.478L98.333 132C98.333 131.835 98.368 131.672 98.4358 131.521L101.15 125.49C101.176 125.433 101.201 125.376 101.226 125.32C101.689 124.291 102.037 123.515 102.604 122.927C103.102 122.411 103.712 122.016 104.387 121.774C105.155 121.499 106.006 121.499 107.134 121.5ZM107.321 123.834C105.921 123.834 105.511 123.85 105.175 123.971C104.837 124.092 104.532 124.289 104.283 124.547C104.035 124.804 103.852 125.171 103.278 126.448L101.304 130.834H103.787C103.819 130.834 103.852 130.833 103.884 130.833C104.359 130.833 104.777 130.833 105.184 130.93C105.541 131.016 105.882 131.157 106.195 131.349C106.552 131.568 106.847 131.864 107.183 132.2C107.205 132.223 107.228 132.246 107.251 132.269L107.398 132.415C107.841 132.858 107.933 132.94 108.023 132.995C108.128 133.059 108.241 133.106 108.36 133.135C108.464 133.159 108.586 133.167 109.213 133.167H110.787C111.413 133.167 111.536 133.159 111.639 133.135C111.758 133.106 111.872 133.059 111.976 132.995C112.066 132.94 112.159 132.858 112.602 132.415L112.748 132.269C112.771 132.246 112.794 132.223 112.817 132.2C113.152 131.864 113.448 131.568 113.804 131.349C114.117 131.157 114.459 131.016 114.816 130.93C115.222 130.833 115.641 130.833 116.116 130.833C116.148 130.833 116.18 130.834 116.213 130.834H118.695L116.722 126.448C116.147 125.171 115.964 124.804 115.716 124.547C115.467 124.289 115.162 124.092 114.824 123.971C114.488 123.85 114.079 123.834 112.679 123.834H107.321Z"
                    fill={palette.semantic.foreground.white.secondary}
                />
                <circle
                    cx="118"
                    cy="123"
                    r="4"
                    fill={palette.semantic.foreground.white.secondary}
                    stroke={palette.semantic.foreground.primary}
                    strokeWidth="2"
                />
            </g>
            <defs>
                <filter
                    id="filter0_dd_12045_173512"
                    x="26"
                    y="0"
                    width="168"
                    height="177.434"
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
                        result="effect1_dropShadow_12045_173512"
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
                        result="effect1_dropShadow_12045_173512"
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
                        result="effect2_dropShadow_12045_173512"
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
                        in2="effect1_dropShadow_12045_173512"
                        result="effect2_dropShadow_12045_173512"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect2_dropShadow_12045_173512"
                        result="shape"
                    />
                </filter>
                <filter
                    id="filter1_b_12045_173512"
                    x="74"
                    y="96"
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
                        result="effect1_backgroundBlur_12045_173512"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_12045_173512"
                        result="shape"
                    />
                </filter>
                <linearGradient
                    id="paint0_linear_12045_173512"
                    x1="46"
                    y1="110.154"
                    x2="71.2754"
                    y2="41.7012"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={palette.semantic.foreground.secondary} />
                    <stop
                        offset="1"
                        stopColor={palette.semantic.foreground.six}
                    />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_12045_173512"
                    x1="110"
                    y1="56.616"
                    x2="182.166"
                    y2="70.9836"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={palette.semantic.foreground.secondary} />
                    <stop
                        offset="1"
                        stopColor={palette.semantic.foreground.six}
                    />
                </linearGradient>
            </defs>
        </svg>
    );
};

const NotificationIcons = {
    Slider,
    Notification,
    EmptyState
};

export default NotificationIcons;
