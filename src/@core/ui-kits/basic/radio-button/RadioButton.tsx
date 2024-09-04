import Radio, { RadioProps } from '@mui/material/Radio';
import { createSvgIcon } from '@mui/material';

const CheckedIcon = createSvgIcon(
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
            fill="#0A43E1"
        />
        <path
            d="M5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8Z"
            fill="white"
        />
    </svg>,
    'CheckedIcon'
);

const UncheckedIcon = createSvgIcon(
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8Z"
            stroke="#E1E4E8"
        />
    </svg>,
    'UncheckedIcon'
);

type Props = Omit<RadioProps, 'checkedIcon' | 'icon'>;
export default function RadioButton(props: Props) {
    return (
        <Radio
            {...props}
            checkedIcon={<CheckedIcon sx={{ width: 'inherit', height: 'inherit' }} />}
            icon={<UncheckedIcon sx={{ width: 'inherit', height: 'inherit' }} />}
        />
    );
}
