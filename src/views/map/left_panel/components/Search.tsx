import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchField } from '@/views/map/styled_components';
import { ChangeEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    searchValue: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({
    searchValue,
    handleChange
}: Props) {
    const { t } = useAppTranslation();
    return (
        <SearchField
            autoComplete="off"
            variant="standard"
            size="small"
            value={searchValue}
            onChange={handleChange}
            InputProps={{
                disableUnderline: true,
                startAdornment  : (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                )
            }}
            placeholder={t('fields:search.placeholder')}
        />
    );
}
