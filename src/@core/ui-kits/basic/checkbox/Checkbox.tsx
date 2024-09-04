import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import { createSvgIcon } from '@mui/material';

const CheckedIcon = createSvgIcon(
    <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            width="18"
            height="18"
            rx="4"
            fill="currentColor"
        />
        <path
            d="M13.2001 5.84961L7.42505 11.6246L4.80005 8.99961"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>,
    'CheckedIcon'
);

const UncheckedIcon = createSvgIcon(
    <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="0.5"
            y="0.5"
            width="17"
            height="17"
            rx="3.5"
            stroke="#D0D5DD"
        />
    </svg>,
    'uncheckedIcon'
);

const IndeterminateIcon = createSvgIcon(
    <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            width="18"
            height="18"
            rx="4"
            fill="currentColor"
        />
        <path
            d="M5.32495 9H12.675"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>,
    'IndeterminateIcon'
);

const CHECKBOX_SIZE = {
    small : '14px',
    medium: '18px'
};

interface Props extends CheckboxProps {
    size?: 'small' | 'medium';
}

export default function Checkbox({
    size = 'medium',
    ...props
}: Props) {
    return (
        <MuiCheckbox
            {...props}
            color="primary"
            sx={{
                padding     : 0,
                borderRadius: '4px',
                transition  : 'box-shadow 0.1s ease-in-out',

                svg: {
                    width : CHECKBOX_SIZE[size],
                    height: CHECKBOX_SIZE[size],
                    rect  : {
                        stroke: ({ palette }) =>
                            props.checked || props.indeterminate
                                ? undefined
                                : palette.semantic.border.secondary
                    }
                },

                '&:hover': {
                    backgroundColor: 'transparent !important',
                    boxShadow      : ({ palette }) =>
                        props.checked || props.indeterminate
                            ? `0px 0px 0px 4px ${palette.colors.brand[palette.isLight ? 100 : 800]}`
                            : `0px 0px 0px 4px ${palette.colors.gray[palette.isLight ? 50 : 800]}`
                },
                ...(props.sx || {})
            }}
            checkedIcon={<CheckedIcon />}
            icon={<UncheckedIcon />}
            indeterminateIcon={<IndeterminateIcon />}
        />
    );
}
