import { Button, createSvgIcon } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    onClick: () => void;
    disabled?: boolean;
};

const SearchIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
    >
        <path
            d="M11.615 11.0941L14.5 14M13.1667 7.33333C13.1667 10.2789 10.7789 12.6667 7.83333 12.6667C4.88781 12.6667 2.5 10.2789 2.5 7.33333C2.5 4.38781 4.88781 2 7.83333 2C10.7789 2 13.1667 4.38781 13.1667 7.33333Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>,
    'SearchIcon'
);

function SearchButton({
    onClick,
    disabled = false
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Button
            disabled={disabled}
            sx={{
                textTransform: 'capitalize'
            }}
            startIcon={<SearchIcon />}
            variant="contained"
            onClick={onClick}
        >
            {t('common:button.search')}
        </Button>
    );
}

export default SearchButton;
